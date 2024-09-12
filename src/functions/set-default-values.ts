export const setDefaultValues = <TObject extends Record<string, unknown>>(
  obj: TObject,
  // should actually be DeepPartial
  defaultValues: Partial<TObject>
) => {
  const stack: {
    object: Record<string, unknown>;
    default: Record<string, unknown>;
  }[] = [{ object: obj, default: defaultValues }];

  while (stack.length > 0) {
    const { object: currObj, default: currDefault } = stack.pop() || {};

    if (currObj && currDefault) {
      Object.entries(currDefault).reduce((acc, [key, value]) => {
        if (acc[key] === undefined && value !== undefined) {
          // If the key is missing, assign default value directly
          acc[key] = value;
        } else if (
          acc[key] &&
          typeof acc[key] === "object" &&
          value &&
          typeof value === "object"
        ) {
          // If both the target value and default value are objects, we need to push them into the stack
          // for further processing
          stack.push({
            object: acc[key] as Record<string, unknown>,
            default: value as Record<string, unknown>,
          });
        }
        return acc;
      }, currObj);
    }
  }

  return obj;
};
