export const emptyToUndefined = (val: unknown) => {
  if (val === "" || val === null) return undefined;

  if (typeof val === "string" && val.trim() === "") {
    return undefined;
  }

  return val;
};