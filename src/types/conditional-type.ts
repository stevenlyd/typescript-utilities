export type ConditionalType<Condition, ExtendsType, TrueType, FalseType> =
  Condition extends ExtendsType ? TrueType : FalseType;
