/** Must match the server rule in server/src/controllers/auth/signup.js. */
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const passwordRule = (value: string) =>
  PASSWORD_REGEX.test(value)
    ? null
    : 'Use 6–20 characters with uppercase, lowercase and a number.';
