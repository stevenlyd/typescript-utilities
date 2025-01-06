import { CheckOptional } from "./check-optional";
import { OptionalKeys } from "./optional-keys";

export type StrictOptional<TObject extends object, TProps extends object, TKeys extends OptionalKeys<TObject> = OptionalKeys<TObject>> = {
    [K in keyof TProps]: K extends keyof TObject ? K extends TKeys ? CheckOptional<TObject, K> extends true ? Exclude<TObject[K], undefined> : TObject[K] : TObject[K] : never
} & TObject