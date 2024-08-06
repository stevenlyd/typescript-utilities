import { ExtractKeysOfType } from "./extract-keys-of-type";

export type ExtractEntriesOfType<T, L, P = string> = {
  [key in ExtractKeysOfType<T, L, P>]: T[key];
};
