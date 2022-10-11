import { NextFunction, Request, Response } from 'express';

import { logger, formattingOfficersInfo, userSession } from '../../utils';
import { fetchBankruptOfficers } from '../../service';
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery } from '../../types';

export const getSearchPage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const userEmail = userSession.getLoggedInUserEmail(req.session);
    res.render('bankrupt', { userEmail });
  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};

export const postSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get data from request body - dateOfBirth needs to be checked 
    const { forename1 = '', surname = '', alias = '', postcode = '' } = req.body;

    // Deal with fragmented date of birth
    const dateOfBirth = 
      (req.body["dob-dd"] && req.body["dob-mm"] && req.body["dob-yyyy"]) ?
        `${req.body["dob-yyyy"]}-${req.body["dob-mm"]}-${req.body["dob-dd"]}` : '';

    // Set post query data
    const filters: BankruptOfficerSearchFilters = { forename1, surname, alias, dateOfBirth, postcode };
    const body: BankruptOfficerSearchQuery = { startIndex: 0, itemsPerPage: 10, filters};

    const results = await fetchBankruptOfficers(req.session, body);
    // Not found officers has to be rendered anyway with an empty list 
    if(results.httpStatusCode === 404  || results.httpStatusCode === 200){
      const userEmail = userSession.getLoggedInUserEmail(req.session);
      const { itemsPerPage = 0, startIndex = 0, totalResults = 0, items = [] } = results.resource || {};
      return res.render('bankrupt', { itemsPerPage, startIndex, totalResults, items: formattingOfficersInfo(items), searched: true, userEmail });
    } else {
      return res.status(results.httpStatusCode).render('error-pages/500');
    } 

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};
