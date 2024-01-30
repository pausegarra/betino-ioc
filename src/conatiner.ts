type RegisterOptions = {
  loadDependencies?: boolean;
  isInstance?: boolean;
};

export class Container {
  private static instance: Container = new Container();
  private dependencies = new Map<string, any>();

  private constructor() {} // Constructor privado para prevenir instancias directas

  static register<T>(token: string, constructor: any, options?: RegisterOptions) {
    Container.instance.registerInstance(token, constructor, options);
  }

  static resolve<T>(token: string): T {
    return Container.instance.resolveInstance(token);
  }

  // Métodos privados para manejar la instancia interna
  private registerInstance<T>(token: string, constructor: any, options?: RegisterOptions) {
    let instance;
    if (options?.isInstance) {
      instance = constructor;
    } else {
      instance = options?.loadDependencies ? this.inject(constructor) : new constructor();
    }
    this.dependencies.set(token, instance);
  }

  private resolveInstance<T>(token: string): T {
    const dependency: T | undefined = this.dependencies.get(token);
    if (!dependency) {
      throw new Error(`Dependency ${token} not found`);
    }
    return dependency;
  }

  private inject<T>(clazz: { new(...args: any[]): T; }): T {
    const tokensForInjection: string[] = Reflect.getMetadata('inject', clazz);
    const injections = tokensForInjection.map((token) => token ? this.resolveInstance(token) : undefined);
    return new clazz(...injections);
  }
}

export const container = Container; // Exportar la clase Container en lugar de una instancia
