import * as yup from 'yup'
import validator from 'validator'

const isURL = (url: string, host?: string) => {
  return yup.object({
    url: yup
      .string()
      .trim()
      .required()
      .test('is-url', value => testURL(value, host))
  }).isValidSync({ url })
}

const testURL = (value: string, host?: string) => {
  try {
    const url = new URL(value)

    if (url.host === (host || window.location.host)) {
      return false
    }

    return validator.isURL(value, {
      protocols: ['http', 'https']
    })
  } catch (_) {
    return false
  }
}

export default isURL