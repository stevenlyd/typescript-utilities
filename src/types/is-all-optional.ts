type IsAllOptional<T> = Record<string, never> extends T ? true : false;
