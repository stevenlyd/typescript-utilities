export type PickAndRequireLoose<T, K extends string> = {
  [P in Extract<K, keyof T>]-?: T[P];
} & Omit<T, K>;
