enum MapDirection {
  forward = "forward",
  backward = "backward",
}

const renameKeys = <TObj extends Record<string, unknown>>(
  obj: TObj,
  mapper: Partial<Record<string, keyof TObj>>,
  direction?: MapDirection | undefined
) => {
  const effectiveDirection = direction || MapDirection.backward;

  if (effectiveDirection === MapDirection.forward) {
    return Object.keys(obj).reduce((acc, key) => {
      return { ...acc, [mapper[key] || key]: obj[key] };
    }, {});
  }

  const reversedMapper = Object.keys(mapper).reduce(
    (acc: Partial<Record<keyof TObj, string>>, key) => {
      const newKey = mapper[key];
      if (newKey) {
        return { ...acc, [newKey]: key };
      }
      throw new Error(`Invalid mapper key: ${key}`);
    },
    {}
  );

  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [reversedMapper[key] || key]: obj[key] };
  }, {});
};
