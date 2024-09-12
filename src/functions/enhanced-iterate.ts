import { Ternary } from "../types/ternary";

type IterateConfig<TAcc> = {
  reverse?: boolean;
  initialAccumulator?: TAcc;
};

type CallbackResult<TReturn, TAcc> = undefined extends TAcc
  ? Ternary<
      unknown,
      TReturn,
      {
        result?: never;
        accumulator?: never;
        shouldStop?: boolean;
      },
      {
        accumulator?: never;
        result: TReturn;
        shouldStop?: boolean;
      }
    >
  : Ternary<
      unknown,
      TReturn,
      {
        result?: never;
        accumulator: TAcc;
        shouldStop?: boolean;
      },
      {
        result: TReturn;
        accumulator: TAcc;
        shouldStop?: boolean;
      }
    >;

type Result<TReturn, TAcc> = Ternary<
  unknown,
  TReturn,
  Ternary<unknown, TAcc, void, TAcc>,
  Ternary<
    unknown,
    TAcc,
    TReturn,
    {
      result: TReturn;
      accumulator: TAcc;
    }
  >
>;

type Callback<TItem, TReturn, TAcc> = unknown extends TAcc
  ? (item: TItem, index: number) => CallbackResult<TReturn, undefined>
  : (
      item: TItem,
      index: number,
      accumulator: TAcc
    ) => CallbackResult<TReturn, TAcc>;

export const enhancedIterate = <
  TItem,
  TReturn,
  TConfig extends IterateConfig<unknown>,
  R = Result<TReturn, TConfig["initialAccumulator"]>
>(
  array: TItem[],
  callback: Callback<TItem, TReturn, TConfig["initialAccumulator"]>,
  config: TConfig
): R => {
  const { reverse = false, initialAccumulator } = config;
  const resultArray: (TReturn | undefined)[] = [];
  let accumulator = initialAccumulator;

  const length = array.length;
  let index = reverse ? length - 1 : 0;
  const step = reverse ? -1 : 1;

  while (index >= 0 && index < length) {
    const item = array[index];
    const cbResult = callback(item, index, accumulator);

    const { result, accumulator: newAccumulator, shouldStop } = cbResult ?? {};

    if ("result" in cbResult) {
      resultArray.push(result);
    }

    if ("initialAccumulator" in config) {
      accumulator = newAccumulator;
    }

    if (shouldStop) {
      break;
    }

    index += step;
  }

  if (accumulator !== undefined && resultArray.length > 0) {
    return { result: resultArray, accumulator } as R;
  } else if (accumulator !== undefined) {
    return accumulator as R;
  } else if (resultArray.length > 0) {
    return resultArray as R;
  }
  throw new Error("Unexpected error occurred");
};
