import { NextFunction, Request, Response } from 'express';
import { createLogger } from '@companieshouse/structured-logging-node';

import {
  APPLICATION_NAME,
  SCOTTISH_BANKRUPT_OFFICER
} from '../../config';

import {
  userSession
} from "../../utils";

const logger = createLogger(APPLICATION_NAME);

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const signedIn = userSession.checkUserSignedIn(req.session);

    if (!signedIn) {
      logger.info('User non authenticated, status_code=401, redirecting to sign in page');
      return res.redirect(`/signin?return_to=${SCOTTISH_BANKRUPT_OFFICER}`);
    } 

    if(userSession.checkPermission(req.session)){
      logger.info(`User (${userSession.getLoggedInUserEmail(req.session)}) is signed in`);
      next();
    } else {
      logger.info('User authenticated but non authorized (no permission), status_code=404');
      return res.status(404).render('error-pages/404');
    }
    
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
