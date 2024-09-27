type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: Array<unknown>) => void ? never : K;
}[keyof T];
export type ConstructorType<T> = Pick<T, NonFunctionPropertyNames<T>>;
