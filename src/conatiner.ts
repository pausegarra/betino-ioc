type RegisterOptions = {
  loadDependencies?: boolean;
  isInstance?: boolean;
}

export class Container {
  static dependencies = new Map<string, any>();

  static register<T>(token: string, constructor: any, { loadDependencies = false, isInstance = false }: RegisterOptions = {}) {
    let instance;
    if (isInstance) {
      instance = constructor;
    } else {
      instance = loadDependencies ? this.inject(constructor) : new constructor();
    }
    this.dependencies.set(token, instance);
  }

  static resolve<T>(token: string): T {
    const dependecy: T | undefined = this.dependencies.get(token);
    if (!dependecy) {
      throw new Error(`Dependency ${token} not found`);
    }
    return dependecy;
  }

  static inject<T>(clazz: { new(...args: any[]): T; }): T {
    const tokensForrInjection: string[] = Reflect.getMetadata('inject', clazz);
    const injections = tokensForrInjection.map((token) => token ? this.resolve(token) : undefined);
    return new clazz(...injections);
  }
}