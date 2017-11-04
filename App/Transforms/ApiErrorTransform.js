// @flow

/**
 * Created by jazalizil on 01/05/2017.
 */

type ResponseType = {
  ok :boolean,
  status :number,
  data :{
    message :string
  } | string
}

export type ErrorType = {
  message :string,
  status :number,
  ok :boolean,
}

export default (response :ResponseType) :ErrorType => {
  let error = { status: response.status, message: response.data, ok: false }

  if (response.data) {
    error.message = response.data.message
  }
  console.log({message: 'Error transform', response})
  return error
}
