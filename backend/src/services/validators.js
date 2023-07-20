const Joi = require("joi");

// Schema for register user
const userSchema = Joi.object({
  username: Joi.string().min(5).max(30).required().messages({
    "any.required": "Username is required",
    "string.min": "Username must contain min 5 characters",
    "string.max": "Username must contain max 30 characters",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .max(255)
    .required()
    .messages({
      "any.required": "Email is required",
      "string.max": "Email must contain max 255 characters",
      "string.email": "Email must be in a valid form",
    }),
  password: Joi.string().min(7).max(30).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must contain min 7 characters",
    "string.max": "Password must contain max 30 characters",
  }),
});

// Validator for register user
const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  const { error } = userSchema.validate(
    {
      username,
      email,
      password,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

// Schema for Edit Profile
const editProfileSchema = Joi.object({
  username: Joi.string().min(5).max(30).messages({
    "any.required": "Username is required",
    "string.min": "Username must contain min 5 characters",
    "string.max": "Username must contain max 30 characters",
  }),
});

// Validator for Edit Profile
const validateEditProfile = (req, res, next) => {
  const { username } = req.body;

  const { error } = editProfileSchema.validate(
    {
      username,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

// Schema for Edit user
const editUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .max(255)
    .required()
    .messages({
      "any.required": "Email is required",
      "string.max": "Email must contain max 255 characters",
      "string.email": "Email must be in a valid form",
    }),
});

// Validator for Edit user
const validateEditUser = (req, res, next) => {
  const { email } = req.body;

  const { error } = editUserSchema.validate(
    {
      email,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
  validateEditProfile,
  validateEditUser,
};
