import { Request, Response, NextFunction } from 'express';
import { fetchBankruptOfficer } from '../../service';
import { logger, formattingOfficersInfo } from '../../utils';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bankruptOfficer = await fetchBankruptOfficer(req.session, req.params?.id);

    if (bankruptOfficer.httpStatusCode === 200){
      const officer = (bankruptOfficer.resource) ? formattingOfficersInfo([bankruptOfficer.resource])[0] : {};
      return res.render('bankrupt_officer', { bankruptOfficer: officer });
    } else if( bankruptOfficer.httpStatusCode === 404) {
      return res.status(bankruptOfficer.httpStatusCode).render('error-pages/404-link-expired');
    } else {
      return res.status(bankruptOfficer.httpStatusCode).render('error-pages/500');
    }

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};
