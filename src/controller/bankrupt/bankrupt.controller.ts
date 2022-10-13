import { NextFunction, Request, Response } from 'express';

import { logger, formattingOfficersInfo, userSession } from '../../utils';
import { fetchBankruptOfficers, fetchBankruptOfficer } from '../../service';
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery, FullBankruptOfficer } from '../../types';
import { bankruptOfficer } from 'controller';
import { off } from 'process';

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
    const { forename1 = '', surname = '', postcode = ''} = req.body;

    // Deal with fragmented date of birth
    const dateOfBirth = 
      (req.body["dob-dd"] && req.body["dob-mm"] && req.body["dob-yyyy"]) ?
        `${req.body["dob-yyyy"]}-${req.body["dob-mm"]}-${req.body["dob-dd"]}` : '';

    // Set post query data
    const filters: BankruptOfficerSearchFilters = { forename1, surname, dateOfBirth, postcode};
    const body: BankruptOfficerSearchQuery = { startIndex: 0, itemsPerPage: 10, filters};

 
    

    const results = await fetchBankruptOfficers(req.session, body);
    const bankruptOfficers: any[] = []; 
    
    logger.info("pulled in" );
    // Not found officers has to be rendered anyway with an empty list 
    if(results.httpStatusCode === 404  || results.httpStatusCode === 200){
      const userEmail = userSession.getLoggedInUserEmail(req.session);
      const { itemsPerPage = 0, startIndex = 0, totalResults = 0, items = [] } = results.resource || {};
      for (const item in items){
        items[item];
        const bankruptOfficerObj = await fetchBankruptOfficer(req.session, items[item].ephemeralKey);
        const officer = (bankruptOfficerObj.resource) ? formattingOfficersInfo([bankruptOfficerObj.resource])[0] : {};
        // officersList.push(JSON.stringify(bankruptOfficerObj.resource?.debtorDischargeDate));
        // let officerIndv;
        // const officer: FullBankruptOfficer = (bankruptOfficerObj.resource) ? formattingOfficersInfo([bankruptOfficerObj.resource])[0] : officerIndv;
        
        bankruptOfficers.push(bankruptOfficerObj);
        logger.info("office lists : " + JSON.stringify(bankruptOfficerObj));
        logger.info("PLAIN OLD items lists : " + JSON.stringify(items));
 
      }
      logger.info("office lists2 : " + JSON.stringify(bankruptOfficers));
      logger.info("items : " + JSON.stringify(items));
      return res.render('bankrupt', { itemsPerPage, startIndex, totalResults, items: formattingOfficersInfo(items), bankruptOfficers: bankruptOfficers ,  searched: true, userEmail });
    } else {
      return res.status(results.httpStatusCode).render('error-pages/500');
    } 

  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};


// for (const item in items){
      //   items[item];
      //   const bankruptOfficerObj = await fetchBankruptOfficer(req.session, items[item].ephemeralKey);
      //   // const officer = (bankruptOfficerObj.resource) ? formattingOfficersInfo([bankruptOfficerObj.resource])[0] : {};
      //   officersList.push(JSON.stringify(bankruptOfficerObj.resource?.debtorDischargeDate));
          
      // //   const officer = (bankruptOfficer.resource) ? formattingOfficersInfo([bankruptOfficer.resource])[0] : {};
      // //   officersList.push.apply(officer);
      //   logger.info("office lists : " + officersList);
      // }
      // const officer = (bankruptOfficer.resource) ? formattingOfficersInfo([bankruptOfficer.resource])[0] : {};
        
      // officersList.push(bankruptOfficer)
    //}