import { NextFunction, Request, Response } from 'express'

import { logger } from '../../utils'
import { fetchBankruptOfficers, generateQuery } from '../../service'
import { BankruptOfficerSearchFilters } from '../../types'

export const getSearchPage = (_: Request, res: Response, next: NextFunction): void => {
  try {
    res.render('bankrupt')
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

export const postSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      forename1 = '',
      surname = '',
      dateOfBirth = '',
      postcode = ''
    } = req.body

    const filters: BankruptOfficerSearchFilters = {
      forename1,
      surname,
      dateOfBirth,
      postcode
    }

    const results = await fetchBankruptOfficers(generateQuery(filters))

    const {
      itemsPerPage = 0,
      startIndex = 0,
      totalResults = 0,
      items = []
    } = results.data

    logger.info(results.data?.items as unknown as string)

    res.render('bankrupt', { itemsPerPage, startIndex, totalResults, items, searched: true })
  } catch (err) {
    logger.error(err)
    next(err)
  }
}
