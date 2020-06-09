import joi from "joi-browser";

const schema = {
    email: joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password1: joi.string().required().min(8).label("Password"),
    password2:joi.any().valid(joi.ref('password1')).required().options({ language: { any: { allowOnly: 'must match password' } } }).label('password confirmation'),
    username: joi.string().required().min(4).label("User Name"),
    first_name: joi.string().required().min(4).label("First Name"),
    last_name: joi.string().required().min(4).label("Last Name")
};

export const validate = (user) => {
    const options = { abortEarly: false };
    const { error } = joi.validate(user, schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

export const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };