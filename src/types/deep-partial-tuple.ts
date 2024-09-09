import { NestedArray } from "./nested-array";

export type DeepPartialTuple<T extends NestedArray<unknown>> = T extends [
  infer First,
  ...infer Rest
]
  ?
      | []
      | [
          First extends NestedArray<unknown>[]
            ? DeepPartialTuple<First>
            : First,
          ...DeepPartialTuple<Rest>
        ]
      | DeepPartialTuple<Rest>
  : [];
