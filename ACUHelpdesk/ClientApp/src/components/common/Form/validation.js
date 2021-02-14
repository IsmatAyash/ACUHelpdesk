import Joi from "joi";

export const validate = (formData, schema) => {
  const options = { abortEarly: false, allowUnknown: true };
  const { error } = schema.validate(formData, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export const validateProperty = (name, value, schema) => {
  const obj = { [name]: value };
  const skima = Joi.object({ [name]: schema.extract(name) });
  const { error } = skima.validate(obj);
  return error ? error.details[0].message : null;
};
