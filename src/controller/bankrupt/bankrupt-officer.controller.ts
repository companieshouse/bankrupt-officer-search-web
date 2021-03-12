import { Request, Response, NextFunction } from 'express';
import { fetchBankruptOfficer } from '../../service';
import { logger, formattingOfficersInfo } from '../../utils';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bankruptOfficer = await fetchBankruptOfficer(req.params?.id);
      
    if (!bankruptOfficer.error) {
      officer = (bankruptOfficer.data) ? formattingOfficersInfo([bankruptOfficer.data])[0] : {};
      return res.render('bankrupt_officer', { bankruptOfficer: officer } );
    } else if( bankruptOfficer.status === 500) {
      return res.status(bankruptOfficer.status).render('error-pages/500');
    } else {
      return res.status(bankruptOfficer.status).render('error-pages/404-link-expired');
    }

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};
