import { NextFunction, Request, Response } from 'express';

import { logger, formattingOfficersInfo, userSession, buildPaginationData } from '../../utils';
import { fetchBankruptOfficers } from '../../service';
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery } from '../../types';
import { RESULTS_PER_PAGE } from '../../config';

export const getSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.query.page) {
      // Search has already been done, get filters from cache, fetch the correct page and render
      const filters: BankruptOfficerSearchFilters | undefined = req.session?.getExtraData("bados-filters");
      if (filters) {
        return await renderSearchResultsPage(req, res, filters);
      }
    } 
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
    const { forename1 = '', surname = '', postcode = '' } = req.body;

    // Deal with fragmented date of birth
    const dateOfBirth = 
      (req.body["dob-dd"] && req.body["dob-mm"] && req.body["dob-yyyy"]) ?
        `${req.body["dob-yyyy"]}-${req.body["dob-mm"]}-${req.body["dob-dd"]}` : '';

    // Set post query data
    const filters: BankruptOfficerSearchFilters = { forename1, surname, dateOfBirth, postcode };
    req.session?.setExtraData("bados-filters", filters);
    return await renderSearchResultsPage(req, res, filters);
  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};

const renderSearchResultsPage = async (req: Request, res: Response, filters: BankruptOfficerSearchFilters) => {
  const body: BankruptOfficerSearchQuery = { startIndex: req.query.page ? Number(req.query.page) - 1 : 0, itemsPerPage: RESULTS_PER_PAGE, filters};
  //const results = await fetchBankruptOfficers(req.session, body);
  const results = testData;
  results.resource.startIndex = req.query.page ? Number(req.query.page) - 1 : 0;
  // Not found officers has to be rendered anyway with an empty list 
  if(results.httpStatusCode === 404  || results.httpStatusCode === 200){
    const userEmail = userSession.getLoggedInUserEmail(req.session);
    const paginationData = buildPaginationData(results);
    const { itemsPerPage = 0, startIndex = 0, totalResults = 0, items = [] } = results.resource || {};
    return res.render('bankrupt', { pagination: paginationData, itemsPerPage, startIndex, totalResults, items: formattingOfficersInfo(items), searched: true, userEmail });
  } else {
    return res.status(results.httpStatusCode).render('error-pages/500');
  } 
}

const testData = {"httpStatusCode":200,"resource":{"itemsPerPage":10,"startIndex":0,"totalResults":40,"items":[{"ephemeralKey":"BC13AB4C5AED334CE05400144FFBDD12","forename1":"DROPLUMINOUS","forename2":"TIGERCLEVER","surname":"PLAYERLUMINOUS","addressLine1":"HIGH AVENUE","town":"LUCIEN","county":"KENT","postcode":"KX3 3FR","dateOfBirth":"1955-04-15"},{"ephemeralKey":"BC13AB4C5AEE334CE05400144FFBDD12","forename1":"TALONHAZEL","forename2":"TIGERPEWTER","surname":"WOLFDEW","addressLine1":"FRIARS COURT","town":"BALDOCK","postcode":"AB0 2IH","dateOfBirth":"1995-08-26"},{"ephemeralKey":"BC13AB4C5AEF334CE05400144FFBDD12","forename1":"HORSEQUIVER","surname":"RACERCHISEL","addressLine1":"FRIARS PARK","postcode":"AR2 7PR"},{"ephemeralKey":"BC13AB4C5AF0334CE05400144FFBDD12","forename1":"SLICERVOLCANO","surname":"SPURBALLISTIC","addressLine1":"WOOD STREET","town":"CAMPDEN","postcode":"SH0 3GY","dateOfBirth":"1977-11-22"},{"ephemeralKey":"BC13AB4C5AF1334CE05400144FFBDD12","forename1":"FLAMEMETAL","surname":"ANTLERSPONGE","addressLine1":"CHURCH WALK","town":"CAMPDEN","postcode":"VT0 3UH","dateOfBirth":"1955-05-10"},{"ephemeralKey":"BC13AB4C5AF2334CE05400144FFBDD12","forename1":"STALKERHOLLOW","surname":"GRASPWELL","addressLine1":"CHURCH WALK","town":"BUFFALO CITY","county":"BEDFORDSHIRE","postcode":"NM4 2FA","dateOfBirth":"1978-12-29"},{"ephemeralKey":"BC13AB4C5AF3334CE05400144FFBDD12","forename1":"GOATBRANCH","surname":"GRINSHARP","addressLine1":"WOOD CLOSE","town":"CIENEGA SPRINGS","county":"WARWICKSHIRE","postcode":"NJ6 6JO","dateOfBirth":"1945-09-20"},{"ephemeralKey":"BC13AB4C5AF4334CE05400144FFBDD12","forename1":"HOOFOASIS","forename2":"SAGEPITCH","surname":"KNIGHTLIGHTNING","addressLine1":"HILL CRESCENT","town":"RANSOM CANYON","postcode":"YB3 0KB","dateOfBirth":"1990-11-21"},{"ephemeralKey":"BC13AB4C5AF5334CE05400144FFBDD12","forename1":"GLAZERPRAIRIE","surname":"SALMONFOAM","addressLine1":"HILL CLOSE","town":"NEWSTEAD","postcode":"KK2 4BS","dateOfBirth":"1996-06-05"},{"ephemeralKey":"BC13AB4C5AF6334CE05400144FFBDD12","forename1":"PIPERFIRE","forename2":"WOLVERINENETTLE","surname":"EATERBLACK","addressLine1":"DICKINSON CRESCENT","town":"BALDOCK","county":"BERKSHIRE","postcode":"OP2 8FU","dateOfBirth":"1971-09-11"}]}}
