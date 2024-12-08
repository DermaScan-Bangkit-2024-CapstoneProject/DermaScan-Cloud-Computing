import Joi from "joi";
import { ResponseError } from "../error/error.js";

// it is user Signup validation schema
const userSignUpValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(70).required(),
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().max(135).required(),
    phone: Joi.string().min(8).max(16).required(),
    city: Joi.string().min(3).max(100).required(),
    country: Joi.string().min(3).max(150).required(),
});

// it is User Login validation schema
const userLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(70).required(),
});
// it is User Update validation schema
const userUpdateValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    age: Joi.number().max(135),
    email: Joi.string().email(),
    phone: Joi.string().min(8).max(16),
    city: Joi.string().min(3).max(100),
    country: Joi.string().min(3).max(150),
});

//its for validation
const validate = (schema, request) => {
    const result = schema.validate(request);
    if (result.error) {
        throw new ResponseError(400, result.error.details[0].message);
    } else {
        const value = result.value;
        return value;
    }
};

// validate(userSignUpValidation, { email: "andi@gmail.com", password: "12345678" });
export { validate, userSignUpValidation, userLoginValidation, userUpdateValidation };
