export const getUniqueString = (
  str: string,
  dictionary: Set<string>,
  callback: (pre: string) => string
) => {
  const internalCallback = (pre: string) => {
    const newStr = callback(pre);
    if (newStr === pre) {
      throw new Error("Infinite loop detected");
    }
    return newStr;
  };

  let newStr = str;

  while (dictionary.has(newStr)) {
    newStr = internalCallback(newStr);
  }

  return newStr;
};
