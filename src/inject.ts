export function Inject(token: string) {
  return function(target: any, propertyKey: string | symbol | undefined, index: number) {
    const existingInjectionsIndexes = Reflect.getMetadata('inject', target) || [];
    existingInjectionsIndexes[index] = token;
    Reflect.defineMetadata('inject', existingInjectionsIndexes, target);
  };
}