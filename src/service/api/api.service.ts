import axios, { AxiosResponse } from 'axios'
import createError from 'http-errors'
import { logger } from '../../utils'
import { ORACLE_QUERY_API_URL, ORACLE_QUERY_API_ENDPOINT } from '../../config'
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery, BankruptOfficerSearchResults } from '../../types'

export const fetchBankruptOfficer = async (ephemeralKey: string): Promise<AxiosResponse<any>> => {
  try {
    const queryURL = `${ORACLE_QUERY_API_URL}${ORACLE_QUERY_API_ENDPOINT}/${ephemeralKey}`
    return await axios.get(queryURL)
  } catch (err) {
    logger.error(err)
    throw createError(err)
  }
}

export const fetchBankruptOfficers = async (query: BankruptOfficerSearchQuery): Promise<AxiosResponse<BankruptOfficerSearchResults>> => {
  try {
    const queryURL = `${ORACLE_QUERY_API_URL}${ORACLE_QUERY_API_ENDPOINT}`
    return await axios.post<BankruptOfficerSearchResults>(queryURL, query)
  } catch (err) {
    logger.error(err)
    throw createError(err)
  }
}

export const generateQuery = (filters: BankruptOfficerSearchFilters): BankruptOfficerSearchQuery => {
  return {
    startIndex: 0,
    itemsPerPage: 10,
    filters
  }
}
