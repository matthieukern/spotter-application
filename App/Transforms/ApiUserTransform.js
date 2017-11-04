// @flow
/**
 * Created by jazalizil on 01/05/2017.
 */
import { ErrorType } from './ApiErrorTransform'

type UserType = {
  name :string,
  email :string,
  password :string,
  phone :string,
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const validateEmail = (email :string) :boolean => {
  return EMAIL_REGEX.test(email)
}

const validate = (user :UserType) :UserType | ErrorType => {
  if (!validateEmail(user.email)) {
    return {
      ok: false,
      message: 'Email invalide'
    }
  }
  return {ok: true, ...user}
}

export default { validate }
