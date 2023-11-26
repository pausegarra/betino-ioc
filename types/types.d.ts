declare module '@betino/ioc' {
  export class Container {
    static dependencies: Map<string, any>;
    static register<T>(token: string, constructor: any, loadDependencies?: boolean): void;
    static resolve<T>(token: string): T;
    static inject<T>(clazz: { new(...args: any[]): T; }): T;
  }

  export function Inject(token: string): (target: any, propertyKey: string | symbol | undefined, index: number) => void;
}
