import { CheckOptional } from "./check-optional";

export type OptionalKeys<T> = {
    [K in keyof T]: CheckOptional<T, K> extends true ? K : never
}[keyof T]