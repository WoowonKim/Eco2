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

export const emailValidationCheck = (value) => {
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return !emailRegex.test(value);
};
