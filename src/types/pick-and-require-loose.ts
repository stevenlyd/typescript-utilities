export type PickAndRequireLoose<T, K extends string> = {
  [P in Extract<K, keyof T>]-?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};
