import axios from 'axios'
import createError from 'http-errors'
import { logger } from '../../utils'
import { ORACLE_QUERY_API_URL, ORACLE_QUERY_API_ENDPOINT } from '../../config'

const query = {
  startIndex: 0,
  itemsPerPage: 10,
  filters: {}
}

// Set timeout!!!!!
export const getBankruptOfficers = async (filter) => {
  try {
    const queryURL = `${ORACLE_QUERY_API_URL}${ORACLE_QUERY_API_ENDPOINT}`
    return await axios.post(queryURL, query.filters = filter)
  } catch (err) {
    logger.error(err)
    throw createError(err)
  }
}
