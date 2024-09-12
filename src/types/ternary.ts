export type Ternary<Condition, ExtendsType, TrueType, FalseType> =
  Condition extends ExtendsType ? TrueType : FalseType;
