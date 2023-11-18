export function isEmailValid(email: string) {
  const validationString = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
  return validationString.test(email);
}
