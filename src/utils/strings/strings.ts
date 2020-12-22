/**
 * Utility function to add commas to strings or return an empty string for falsy values
 *
 * @param string
 */

const addComma = (string: string | undefined): string => {
  if ((typeof string === 'string' || typeof string === 'number') && string !== '') {
    return `${string}, `
  }
  return ''
}

/**
 * Utility function to strip a trailing comma or a trailing comma and space from strings
 *
 * @param string
 */

const stripComma = (string: string): string => {
  if (string.slice(-2) === ', ') {
    return string.slice(0, -2)
  } else if (string.slice(-1) === ',') {
    return string.slice(0, -1)
  } else {
    return string
  }
}

/**
 * Concatenates an address from an array
 *
 * @param address
 */

export const generateAddress = (addressArray: string[]): string => {
  const output = addressArray.reduce((accumulator, currentValue) => {
    return `${accumulator}${addComma(currentValue)}`
  }, '')
  return stripComma(output)
}
