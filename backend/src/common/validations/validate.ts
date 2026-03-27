export const validate = (schema: any) => (req, res, next) => {
  req.body = schema.parse(req.body);
  next();
};
