import { CheckOptional } from "./check-optional";

export type StrictOptional<TObject extends object, TProps extends object> = {
    [K in keyof TProps]: K extends keyof TObject ? CheckOptional<TObject, K> extends true ? Exclude<TObject[K], undefined> : TObject[K] : never
} & TObject