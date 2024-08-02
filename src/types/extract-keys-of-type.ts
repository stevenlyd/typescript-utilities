export type ExtractKeysOfType<T, L, P = string> = {
  [K in keyof T]: T[K] extends L ? (K extends P ? K : never) : never;
}[keyof T];
