import validator from "validator";

export const isName = (name) => (
   validator.isAlpha(name.replace(/\s/g, "")) &&
   name.length >= 3 &&
   name.length <= 100
);

export const isPhone = (phone) => (
   validator.isNumeric(phone) && phone.length >= 8
)

export const isEmail = (email) => (
   validator.isEmail(email)
)

export const isPassword = (password) => (
   validator.isLength(password, { min: 8 })
)

export const arePasswordsMatching = (password, confirmPassword) => (
   password === confirmPassword
)