import { Request, Response, NextFunction } from 'express'
import { fetchBankruptOfficer } from '../../service'
import { logger } from '../../utils'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bankruptOfficer = await fetchBankruptOfficer(req.params.id)

    logger.info(bankruptOfficer.data as unknown as string)

    if (bankruptOfficer.status === 404) {
      return res.status(404).render('error-pages/404-link-expired')
    }

    res.render('bankrupt_officer', { bankruptOfficer: bankruptOfficer.data })
  } catch (err) {
    next(err)
  }
}
