export type StrictReplaceKey<
  T extends Record<string, any>,
  M extends Record<string, keyof T>
> = {
  [K in keyof T as K extends M[keyof M]
    ? {
        [P in keyof M]: M[P] extends K ? P : never;
      }[keyof M]
    : K]: T[K];
};
