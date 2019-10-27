const validate = (value, rules) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;

      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;

      case "maxLength":
        isValid = isValid && maxLengthValidator(value, rules[rule]);
        break;

      case "isRequired":
        isValid = isValid && requiredValidator(value);
        break;
      case "isNumber":
        isValid = isValid && numberValidator(value);
        break;
      case "phoneNumber":
        isValid = isValid && phoneNumberValidator(value);
        break;
      case "password":
        isValid = isValid && passwordValidator(value);
        break;

      default:
        isValid = true;
    }
  }

  return isValid;
};

/**
 * Email validation
 *
 * @param value
 * @return
 */
const emailValidator = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * maxLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const maxLengthValidator = (value, maxLength) => {
  return value.length <= maxLength;
};

/**
 * Check to confirm that feild is required
 *
 * @param  value
 * @return
 */
const requiredValidator = value => {
  return value.trim() !== "";
};

/**
 * Check to confirm if field is a number
 *
 * @param  value
 * @return
 */
const numberValidator = value => {
  return isNaN(value);
};
const phoneNumberValidator = inputtxt => {
  const regex = /^[0]\d{10}$/;
  return regex.test(inputtxt);
};
const passwordValidator = value => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$/;
  return regex.test(value);
};

export default validate;
