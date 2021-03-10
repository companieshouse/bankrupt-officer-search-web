import { Request, Response, NextFunction } from 'express';
import { fetchBankruptOfficer } from '../../service';
import { logger, formattingOfficersInfo, userSession} from '../../utils';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const bankruptOfficer = await fetchBankruptOfficer(req.params?.id);
      const userEmail = userSession.getLoggedInUserEmail(req.session);
      
      console.log(userSession.getLoggedInUserEmail(req.session));

      if (!bankruptOfficer.error) {
          const officer = (bankruptOfficer.data) ? formattingOfficersInfo([bankruptOfficer.data])[0] : {};
          return res.render('bankrupt_officer', { bankruptOfficer: officer , userEmail } );
    } else if( bankruptOfficer.status === 500) {
        return res.status(bankruptOfficer.status).render('error-pages/500', { userEmail });
    } else {
      return res.status(bankruptOfficer.status).render('error-pages/404-link-expired', { userEmail });
    }

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};
