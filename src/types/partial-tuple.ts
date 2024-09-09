export type PartialTuple<T extends unknown[]> = T extends [
  infer First,
  ...infer Rest
]
  ? [] | [First, ...PartialTuple<Rest>] | PartialTuple<Rest>
  : [];
