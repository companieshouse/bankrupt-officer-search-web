import { NextFunction, Request, Response } from 'express'

import { logger } from '../../utils'
import { getBankruptOfficers } from '../../service'

// Get
export const getSearchPage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.render('bankrupt')
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

export const postSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filter = {
      forename1: req.body?.forename1 || '',
      surname: req.body?.surname || '',
      dateOfBirth: req.body?.dateOfBirth || '', // NOT YET DONE
      postcode: req.body?.postcode || ''
    }
    const bankruptOfficersSearch = await getBankruptOfficers(filter)

    logger.info(bankruptOfficersSearch.data?.items)

    res.render('bankrupt', { bankruptOfficersSearch: bankruptOfficersSearch.data?.items })
  } catch (err) {
    logger.error(err)
    next(err)
  }
}
