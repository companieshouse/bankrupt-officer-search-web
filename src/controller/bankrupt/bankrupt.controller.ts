import { NextFunction, Request, Response } from 'express'

import { generateAddress, logger } from '../../utils'
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

    logger.info(results.data?.items as unknown as string)

    const bankruptOfficersSearchItems = results.data?.items.map((item) => {
      const {
        ephemeralKey = '',
        forename1 = '',
        forename2 = '',
        surname = '',
        dateOfBirth = '',
        addressLine1 = '',
        addressLine2 = '',
        addressLine3 = '',
        town = '',
        county = '',
        postcode = ''
      } = item

      const address = generateAddress([addressLine1, addressLine2, addressLine3, town, county, postcode])

      return {
        ephemeralKey,
        forename1,
        forename2,
        surname,
        dateOfBirth,
        address
      }
    })

    res.render('bankrupt', { bankruptOfficersSearchItems })
  } catch (err) {
    logger.error(err)
    next(err)
  }
}
