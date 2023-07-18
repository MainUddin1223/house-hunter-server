import Joi from 'joi';
const listHouseValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'The name is required.',
    'string.empty': 'The name field cannot be empty.'
  }),
  address: Joi.string().required().messages({
    'any.required': 'The address is required.',
    'string.empty': 'The address field cannot be empty.'
  }),
  city: Joi.string().required().messages({
    'any.required': 'The city is required.',
    'string.empty': 'The city field cannot be empty.'
  }),
  bedrooms: Joi.number().required().messages({
    'any.required': 'The number of bedrooms is required.',
    'number.base': 'The number of bedrooms must be a valid number.'
  }),
  bathrooms: Joi.number().required().messages({
    'any.required': 'The number of bathrooms is required.',
    'number.base': 'The number of bathrooms must be a valid number.'
  }),
  roomSize: Joi.number().required().messages({
    'any.required': 'The room size is required.',
    'number.base': 'The room size must be a valid number.'
  }),
  picture: Joi.string().required().messages({
    'any.required': 'The picture is required.',
    'string.empty': 'The picture field cannot be empty.'
  }),
  rent: Joi.number().required().messages({
    'any.required': 'The rent amount is required.',
    'number.base': 'The rent amount must be a valid number.'
  }),
  description: Joi.string().required().messages({
    'any.required': 'The description is required.',
    'string.empty': 'The description field cannot be empty.'
  }),
  phoneNumber: Joi.string().required().pattern(/^(\+88)[0-9]{11}$/).messages({
    'any.required': 'The phone number is required.',
    'string.pattern.base': 'The phone number must be 14 digits and start with +880.'
  })
});
const listHouseValidator = (req, res, next) => {
  const {
    error
  } = listHouseValidationSchema.validate(req.body);
  if (error) {
    next(error);
  }
  next();
};
const updateHouseValidationSchema = Joi.object({
  name: Joi.string().optional().allow('').messages({
    'string.base': 'The name must be a string.'
  }),
  address: Joi.string().optional().allow('').messages({
    'string.base': 'The address must be a string.'
  }),
  city: Joi.string().optional().allow('').messages({
    'string.base': 'The city must be a string.'
  }),
  bedrooms: Joi.number().optional().messages({
    'number.base': 'The number of bedrooms must be a valid number.'
  }),
  bathrooms: Joi.number().optional().messages({
    'number.base': 'The number of bathrooms must be a valid number.'
  }),
  roomSize: Joi.number().optional().messages({
    'number.base': 'The room size must be a valid number.'
  }),
  picture: Joi.string().optional().allow('').messages({
    'string.base': 'The picture must be a string.'
  }),
  rent: Joi.number().optional().messages({
    'number.base': 'The rent amount must be a valid number.'
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'The description must be a string.'
  }),
  phoneNumber: Joi.string().optional().pattern(/^(\+88)[0-9]{11}$/).messages({
    'string.pattern.base': 'The phone number must be 14 digits and start with +880.'
  })
});
const updateHouseValidator = (req, res, next) => {
  const {
    error
  } = updateHouseValidationSchema.validate(req.body);
  if (error) {
    next(error);
  }
  next();
};
export { listHouseValidator, updateHouseValidator };