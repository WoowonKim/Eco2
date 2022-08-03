export const nameLengthValidation = (value) => {
  if (value.length < 3 || value.length > 8) {
    return true;
  }
  return false;
};

export const passwordValidationCheck = (value) => {
  const passwordRegex =
    /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return !passwordRegex.test(value);
};
