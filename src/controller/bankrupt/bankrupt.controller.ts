import { NextFunction, Request, Response } from 'express';

import { logger, formattingOfficersInfo, userSession, buildPaginationData } from '../../utils';
import { fetchBankruptOfficers } from '../../service';
import { BankruptOfficerSearchFilters, BankruptOfficerSearchQuery, BankruptOfficerSearchSessionExtraData } from '../../types';
import { BANKRUPT_OFFICER_SEARCH_SESSION, RESULTS_PER_PAGE, SCOTTISH_BANKRUPT_OFFICER } from '../../config';
import { ValidationResult } from './ValidationResult';
import { ValidationError } from './ValidationError';
import { validateTextFields } from '../../validation/index';

import { isValidDate, fromDobInvalid, toDobInvalid} from '../../utils/validation/validation';

export const getSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sessionExtraData: undefined | BankruptOfficerSearchSessionExtraData = req.session?.getExtraData(BANKRUPT_OFFICER_SEARCH_SESSION);
    if (req.query?.page && sessionExtraData?.filters) {
      return await renderSearchResultsPage(req, res, sessionExtraData.filters);
    } 
    const userEmail = userSession.getLoggedInUserEmail(req.session);
    res.render('bankrupt', { userEmail, filters: sessionExtraData?.filters });
  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};

export const postSearchPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  try {
    const filters: BankruptOfficerSearchFilters = generateFiltersFromBody(req);
    
    let sessionExtraData: undefined | BankruptOfficerSearchSessionExtraData = req.session?.getExtraData(BANKRUPT_OFFICER_SEARCH_SESSION);
    sessionExtraData = {...sessionExtraData, filters};
    req.session?.setExtraData(BANKRUPT_OFFICER_SEARCH_SESSION, sessionExtraData);
 
    let validationErrors: ValidationError[] = [];

    validationErrors = validationErrors.concat(validateTextFields(filters));

    const userEmail = userSession.getLoggedInUserEmail(req.session);

    let toDobError: undefined | string = undefined;
    let whereTo: undefined | string = undefined;

    if(isValidDate(filters.fromDateOfBirth) === false && isValidDate(filters.toDateOfBirth) === false){
      validationErrors.push(new ValidationError('invalidFromDob', 'Enter a valid date'));
      validationErrors.push(new ValidationError('invalidToDob', 'Enter a valid date'));
      const validationResult = new ValidationResult(validationErrors);

      return res.render('bankrupt', { filters, userEmail, validationResult, whereTo: "invalidFromDob", toDobError: "invalidToDob"});
    } else if(fromDobInvalid(filters.fromDateOfBirth)){
      validationErrors.push(new ValidationError('invalidFromDob', 'Enter a valid date'));
      whereTo = "invalidFromDob";
    }

    if(toDobInvalid(filters.toDateOfBirth,filters.fromDateOfBirth)){
      validationErrors.push(new ValidationError('invalidToDob', 'Enter a valid date'));
      toDobError = "invalidToDob";
    }
    
    if (filters.fromDateOfBirth === '' && filters.toDateOfBirth === '' && filters.surname === '') {
      validationErrors.push(new ValidationError('noInfo', 'Enter a Date Of Birth or Last Name'));
      whereTo = "noInfo";
    }

    if (validationErrors.length > 0) {
      const validationResult = new ValidationResult(validationErrors);
      const templateVariables = {
        filters,
        userEmail,
        validationResult,
        ...(whereTo && { whereTo }),
        ...(toDobError && { toDobError })
      };
      return res.render('bankrupt', templateVariables);
    }

    return await renderSearchResultsPage(req, res, filters);
  } catch (err) {
    logger.error(`${err}`);
    next(err);
  }
};

const renderSearchResultsPage = async (req: Request, res: Response, filters: BankruptOfficerSearchFilters) => {
  const body: BankruptOfficerSearchQuery = { startIndex: req.query?.page ? Number(req.query.page) - 1 : 0, itemsPerPage: RESULTS_PER_PAGE, filters};

  const results = await fetchBankruptOfficers(req.session, body);
  // Not found officers has to be rendered anyway with an empty list 
  if(results.httpStatusCode === 404  || results.httpStatusCode === 200){
    const userEmail = userSession.getLoggedInUserEmail(req.session);
    const { itemsPerPage = 0, startIndex = 0, totalResults = 0, items = [] } = results.resource || {};
    let paginationData;
    if (totalResults > 0 && itemsPerPage > 0) {
      const numOfPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
      paginationData = buildPaginationData(startIndex + 1, numOfPages, SCOTTISH_BANKRUPT_OFFICER);
    }
    return res.render('bankrupt', { filters, pagination: paginationData, itemsPerPage, startIndex, totalResults, items: formattingOfficersInfo(items), searched: true, userEmail });
  } else {
    return res.status(results.httpStatusCode).render('error-pages/500');
  } 
};

export const generateFiltersFromBody = (req: Request): BankruptOfficerSearchFilters => {
  // Get data from request body - dateOfBirth needs to be checked 
  const { forename1 = '', surname = '', alias = '', postcode = '' } = req.body;

  // Deal with fragmented date of birth
  const fromDateOfBirth = (req.body["from-dob-dd"] || req.body["from-dob-mm"] || req.body["from-dob-yyyy"]) ?
    `${req.body["from-dob-yyyy"]}-${req.body["from-dob-mm"]}-${req.body["from-dob-dd"]}` : '';
  
  const toDateOfBirth = 
    (req.body["to-dob-dd"] || req.body["to-dob-mm"] || req.body["to-dob-yyyy"]) ?
      `${req.body["to-dob-yyyy"]}-${req.body["to-dob-mm"]}-${req.body["to-dob-dd"]}` : '';

  // Set post query data
  const filters: BankruptOfficerSearchFilters = { forename1, surname, alias, fromDateOfBirth, toDateOfBirth, postcode };
  return filters;
};
