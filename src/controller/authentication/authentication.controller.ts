import { NextFunction, Request, Response } from 'express';
import { createLogger } from '@companieshouse/structured-logging-node';

import { APPLICATION_NAME, SCOTTISH_BANKRUPT_OFFICER } from '../../config';
import { userSession } from "../../utils";

const logger = createLogger(APPLICATION_NAME);

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const signedIn = userSession.checkUserSignedIn(req.session);

    if (!signedIn) {
      logger.info('User unauthorized, status_code=401, redirecting to sign in page');
      return res.redirect(`/signin?return_to=${SCOTTISH_BANKRUPT_OFFICER}`);
    } 
    
    logger.info(`User (${userSession.getUserId(req.session)}) is signed in`);
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
