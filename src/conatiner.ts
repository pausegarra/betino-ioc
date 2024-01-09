type RegisterOptions = {
  loadDependencies?: boolean;
  isInstance?: boolean;
}

export class Container {
  dependencies = new Map<string, any>();

  register<T>(token: string, constructor: any, options?: RegisterOptions) {
    let instance;
    if (options?.isInstance) {
      instance = constructor;
    } else {
      instance = options?.loadDependencies ? this.inject(constructor) : new constructor();
    }
    this.dependencies.set(token, instance);
  }

  resolve<T>(token: string): T {
    const dependecy: T | undefined = this.dependencies.get(token);
    if (!dependecy) {
      throw new Error(`Dependency ${token} not found`);
    }
    return dependecy;
  }

  inject<T>(clazz: { new(...args: any[]): T; }): T {
    const tokensForrInjection: string[] = Reflect.getMetadata('inject', clazz);
    const injections = tokensForrInjection.map((token) => token ? this.resolve(token) : undefined);
    return new clazz(...injections);
  }
}