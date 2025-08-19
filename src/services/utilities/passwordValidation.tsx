export function passwordValidation(str: any) {
  let containsSpecialCharacters = false;
  let containsLowerCase = false;
  let containsUpperCase = false;
  let containsNumber = false;
  let isValid = false;

  const specialChars = /[`!@#$%^&*()_+\-={};':"|,.<>?~]/;
  const upperCaseLetter = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
  const lowerCaseLetter = /[abcdefghijklmnopqrstuvwxyz]/;
  const validNumber = /[1234567890]/;

  // Check if string contains special characters
  containsSpecialCharacters = specialChars.test(str);
  containsLowerCase = lowerCaseLetter.test(str);
  containsUpperCase = upperCaseLetter.test(str);
  containsNumber = validNumber.test(str);

  if (
    containsSpecialCharacters &&
    containsLowerCase &&
    containsUpperCase &&
    containsNumber &&
    str.length > 8
  ) {
    isValid = true;
  }
  return isValid;
}
