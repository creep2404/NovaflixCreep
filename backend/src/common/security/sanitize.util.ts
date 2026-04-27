export const sanitizeObject = (obj: any): any => {
  if (typeof obj === "string") {
    return obj.trim().replace(/<[^>]*>?/gm, ""); // remove html tags
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = sanitizeObject(obj[key]);
    }
    return newObj;
  }

  return obj;
};