import { CheckOptional } from "./check-optional";

export type GetRequired<T> = {
    [P in keyof T as CheckOptional<T, P> extends true ? never : P]: T[P]
}