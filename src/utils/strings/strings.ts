/**
 * Utility function to add commas to strings or return an empty string for falsy values
 *
 * @param string
 */

export const addComma = (string: string): string => {
  if (typeof string === 'string' && string !== '') {
    return `${string}, `
  }
  return ''
}

/**
 * Utility function to strip trailing commas from strings
 *
 * @param string
 */

export const stripComma = (string: string): string => {
  if (string.slice(-1) === ',') {
    return string.slice(0, -1)
  }
  return string
}
