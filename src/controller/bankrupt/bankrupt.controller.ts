import { NextFunction, request, Request, Response } from 'express';

import { logger, formattingOfficersInfo, userSession } from '../../utils';
import { fetchBankruptOfficers } from '../../service';
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery } from '../../types';

export const getSearchPage = (req: Request, res: Response, next: NextFunction): void => {
  try {
      const userEmail = userSession.getLoggedInUserEmail(req.session);
      console.log(userEmail);
    res.render('bankrupt', { userEmail });
  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};

export const postSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userEmail = userSession.getLoggedInUserEmail(req.session);
    // Get data from request body - dateOfBirth needs to be checked 
    const { forename1 = '', surname = '', postcode = '' } = req.body;

    // Deal with fragmented date of birth
    const dateOfBirth = 
      (req.body["dob-dd"] && req.body["dob-mm"] && req.body["dob-yyyy"]) ?
        `${req.body["dob-yyyy"]}-${req.body["dob-mm"]}-${req.body["dob-dd"]}` : '';

    // Set post query data
    const filters: BankruptOfficerSearchFilters = { forename1, surname, dateOfBirth, postcode };
    const body: BankruptOfficerSearchQuery = { startIndex: 0, itemsPerPage: 10, filters};

    const results = await fetchBankruptOfficers(body);

    // Not found officers has to be rendered anyway with an empty list 
    if(!results.error || results.status === 404){
      const { itemsPerPage = 0, startIndex = 0, totalResults = 0, items = [] } = results.data || {};
      return res.render('bankrupt', { itemsPerPage, startIndex, totalResults, items: formattingOfficersInfo(items), searched: true , userEmail});
    } else {
        return res.status(results.status).render('error-pages/500', { userEmail });
    } 

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};
