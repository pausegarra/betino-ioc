import 'reflect-metadata'
import { Container, Inject } from './src';

class MyClass {
  constructor(@Inject('ForInjection') public testProp: string) {}
}

class ForInjection {}

Container.register('ForInjection', ForInjection)
Container.register('MyClass', MyClass, true)
console.log('Dependencies',Container.dependencies)

const classInstance: MyClass = Container.resolve('MyClass')
console.log('Instance', classInstance)