export type ReplaceKey<
  T extends Record<string, any>,
  M extends Record<string, string>
> = {
  [K in keyof T as K extends M[keyof M]
    ? {
        [P in keyof M]: M[P] extends K ? P : never;
      }[keyof M]
    : K]: T[K];
};
