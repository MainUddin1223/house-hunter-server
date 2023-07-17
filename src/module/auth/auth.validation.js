import Joi from 'joi';

const registerValidationSchema = Joi.object({
    fullName:Joi.string()
    .required()
    .messages({
        'string.pattern.base': 'Please enter a valid name',
        'any.required': 'Name is required',
    })
    ,
    email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  role: Joi.string()
    .valid('owner','renter')
    .required()
    .messages({
      'any.required': 'role field is required',
      'any.only':
        'role field must be one of "owner", "renter"',
    }),
    password: Joi.string().min(8).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
      }),
    phoneNumber:Joi.string()
      .required()
      .messages({
          'string.pattern.base': 'Please enter a valid phone number',
          'any.required': 'Phone number is required',
      })
})

const loginValidatonSchema=Joi.object({
    email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
      }),
})

const loginApiValidator = async (
    req,
    res,
    next
  ) => {
    const { error } = await loginValidatonSchema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
  
const registerApiValidator = async (
    req,
    res,
    next
  ) => {
    const { error } = await registerValidationSchema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
  

export {registerApiValidator}