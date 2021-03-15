const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
  .is().min(10)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

export function validatePassword(password: string): string[] {
  return schema.validate(password, {list: true});
}
