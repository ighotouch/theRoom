const Joi = require("joi");

export const registrationRequestSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  lastName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
})

export const loginRequestSchema = Joi.object({
  
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
  })
