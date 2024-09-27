type Append<S extends string, T extends string> = `${S}-${T}`;

type GetUniqueString<
  TPath extends string,
  TUsed extends string[]
> = TPath extends TUsed[number]
  ? Append<TPath, "1"> extends TUsed[number]
    ? GetUniqueString<Append<TPath, "1">, TUsed>
    : Append<TPath, "1">
  : TPath;

export type Deduplicate<
  TArray extends readonly string[],
  TGlobal extends string[] = []
> = TArray extends [infer Head, ...infer Tail]
  ? Head extends string
    ? [
        GetUniqueString<Head, TGlobal>,
        ...(Tail extends string[]
          ? Deduplicate<Tail, [...TGlobal, GetUniqueString<Head, TGlobal>]>
          : [])
      ]
    : []
  : [];
