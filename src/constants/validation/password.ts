const zxcvbn = require('zxcvbn');

export const passwordMinLength = 8;

export const passwordPatternRule = {
  pattern: new RegExp(`^(?=.*[a-z])(?=.*[0-9]).{${passwordMinLength},}$`),
  message:
    "Please choose a strong password (at least 8 characters long including a lowercase letter and a number)",
};

export const strongPasswordRule = () => ({
  validator(rule, value) {
    if (value && value.length > 0 && zxcvbn(value).score < 2) {
      return Promise.reject("Please choose a strong password (at least 8 characters, lowercase letter and a number without using), plus avoid common passwords");
    }
    return Promise.resolve();
  }
});
