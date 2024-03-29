import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { BadosService } from 'private-api-sdk-node/dist/services/bankrupt-officer';
import { getSearchPage, postSearchPage } from "../../src/controller";
import { userSession } from '../../src/utils';

import {
  BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS,
  BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS,
  mockPostResponse,
  mockSearchQuery,
  PAGINATION_RESULTS,
  mockSearchQueryFromDOB,
  mockSearchQueryToDOB,
  mockSearchQueryDOBNoOfficer,
  mockSearchQueryDOBRanges,
  mockSearchQueryInvalidChars,
  mockSearchQueryInvalidToAndFromDob,
  mockSearchQueryToDobBeforeFrom,
  mockSearchQueryNonExistantToDob,
  mockSearchQueryNonExistantFromDob,
  mockSearchQueryFutureFromDate,
  mockSearchQueryFutureToDate,
  mockSearchQueryInvalidDDFromDob,
  mockSearchQueryInvalidMMFromDob,
  mockSearchQueryInvalidYYYYFromDob,
  mockSearchQueryInvalidDDToDob,
  mockSearchQueryInvalidMMToDob,
  mockSearchQueryInvalidYYYYToDob
} from '../__mocks__/utils.mock';

import { getSessionRequest } from '../__mocks__/session.mock';
import { logger } from '../../src/utils';
import { ValidationResult } from '../../src/controller/bankrupt/ValidationResult';
import { ValidationError } from '../../src/controller/bankrupt/ValidationError';
import { INVALID_CHARACTER_ERROR_MESSAGE } from '../../src/config';
import { generateFiltersFromBody } from '../../src/controller/bankrupt/bankrupt.controller';
import { BankruptOfficerSearchResults } from '../../src/types';
import Resource from '@companieshouse/api-sdk-node/dist/services/resource';

chai.use(sinonChai);

const mockResponse = () => {
  const res = { render: {}, status: {} };
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  return res as Response;
};
const req = {} as Request;
let res: Response;
let nextFunctionSpy: NextFunction;

describe("BankruptController test suite", () => {

  beforeEach(done => {
    sinon.reset();
    sinon.restore();

    res = mockResponse();
    req.session = getSessionRequest();

    nextFunctionSpy = sinon.spy();
    sinon.stub(logger, 'error').returns();
    done();
  });

  afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  describe("search page get", () => {

    it("should render the bankrupt officer search page", async () => {
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');

      await getSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', {filters: undefined, userEmail: "test@testemail.com" });
    });

    it('should catch any error and call next function', async () => {
      const resThrowsToBeCatched = { render: sinon.stub().throws() } as unknown as Response;

      await getSearchPage(req, resThrowsToBeCatched, nextFunctionSpy);

      expect(nextFunctionSpy).to.have.been.calledOnce;
      expect(res.status).not.called;
      expect(res.render).not.called;
    });
  });

  

  describe("search page post", () => {

    it("should renders the bankrupt officer search page with the list of officers", async () => {
      req.body = mockSearchQuery.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200] as Resource<BankruptOfficerSearchResults>);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, ...PAGINATION_RESULTS, userEmail: "test@testemail.com" });
    });
  
    it("should render the bankrupt officer search page with list of officers when DOB filters are used", async () => {
      req.body = mockSearchQueryDOBRanges.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200] as Resource<BankruptOfficerSearchResults>);

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, ...PAGINATION_RESULTS, userEmail: "test@testemail.com" });
    });


    it("should render the bankrupt officer search page from only FROM_DOB filters with the list of officers", async () => {
      req.body = mockSearchQueryFromDOB.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200] as Resource<BankruptOfficerSearchResults>);

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, ...PAGINATION_RESULTS, userEmail: "test@testemail.com" });
    });

    it("should render the bankrupt officer search page from only TO_DOB filters with the list of officers", async () => {
      req.body = mockSearchQueryToDOB.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200] as Resource<BankruptOfficerSearchResults>);

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, ...PAGINATION_RESULTS, userEmail: "test@testemail.com" });
    });

    it("should renders the bankrupt officer search page with no officers", async () => {
      req.body = mockSearchQuery.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');

      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS, pagination: undefined, userEmail: "test@testemail.com" });
    });


    it("should render the bankrupt officer search page with no results when no officers have dob requested in filter", async () => {
      req.body = mockSearchQueryDOBNoOfficer.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');

      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWith('bankrupt', { filters, searched: true, ...BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS, pagination: undefined, userEmail: "test@testemail.com" });
    });

    it("should render the bankrupt officer search page with errors if the text fields contain invalid characters", async () => {
      req.body = mockSearchQueryInvalidChars.filters;
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('surname', INVALID_CHARACTER_ERROR_MESSAGE)]);

      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, validationResult, userEmail: "test@testemail.com" });
    });

    it("should renders the bankrupt officer search page with errors when no filters are used", async () => {
      req.body = '';
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('noInfo', 'Enter a Date Of Birth or Last Name')]);
      await postSearchPage(req, res, nextFunctionSpy);
      
      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { filters, whereTo: "noInfo", validationResult, userEmail: "test@testemail.com" });
    });


    it("should render the bankrupt officer search page with errors when invalid date fromDob DD filters are used", async () => {
      req.body = mockSearchQueryInvalidDDFromDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidFromDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, whereTo: "invalidFromDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when invalid date fromDob MM filters are used", async () => {
      req.body = mockSearchQueryInvalidMMFromDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidFromDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, whereTo: "invalidFromDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when invalid date fromDob YYYY filters are used", async () => {
      req.body = mockSearchQueryInvalidYYYYFromDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidFromDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, whereTo: "invalidFromDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when invalid toDob DD filters are used", async () => {
      req.body = mockSearchQueryInvalidDDToDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);
      
      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when invalid toDob MM filters are used", async () => {
      req.body = mockSearchQueryInvalidMMToDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when invalid toDob YYYY filters are used", async () => {
      req.body = mockSearchQueryInvalidYYYYToDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });
    

    it("should render the bankrupt officer search page with errors when invalid toDob and fromDob filters are used", async () => {
      req.body = mockSearchQueryInvalidToAndFromDob.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([
        new ValidationError('invalidFromDob', 'Enter a valid date'),
        new ValidationError('invalidToDob', 'Enter a valid date'),
      ]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, whereTo: "invalidFromDob" , toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when toDob is before fromDob", async () => {
      req.body = mockSearchQueryToDobBeforeFrom.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });


    it("should render the bankrupt officer search page with errors when fromDob date is from the future", async () => {
      req.body = mockSearchQueryFutureFromDate.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidFromDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, whereTo: "invalidFromDob", validationResult, userEmail: "test@testemail.com"});
    });

    it("should render the bankrupt officer search page with errors when toDob date is from the future", async () => {
      req.body = mockSearchQueryFutureToDate.filters;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
      await postSearchPage(req, res, nextFunctionSpy);

      const filters = generateFiltersFromBody(req);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", { filters, toDobError: "invalidToDob", validationResult, userEmail: "test@testemail.com"});
    });

  });

  it("should render the bankrupt officer search page with errors when non existant from date used", async () => {
    req.body = mockSearchQueryNonExistantFromDob.filters;
    sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
    sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
    const validationResult = new ValidationResult([new ValidationError('invalidFromDob', 'Enter a valid date')]);
    await postSearchPage(req, res, nextFunctionSpy);

    const filters = generateFiltersFromBody(req);
    expect(nextFunctionSpy).not.called;
    expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", {
      whereTo: "invalidFromDob",
      validationResult,
      userEmail: "test@testemail.com",
      filters
    });
  });


  it("should render the bankrupt officer search page with errors when non existant to date used", async () => {
    req.body = mockSearchQueryNonExistantToDob.filters;
    sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
    sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
    const validationResult = new ValidationResult([new ValidationError('invalidToDob', 'Enter a valid date')]);
    await postSearchPage(req, res, nextFunctionSpy);

    const filters = generateFiltersFromBody(req);
    expect(nextFunctionSpy).not.called;
    expect(res.render).to.have.been.calledOnceWithExactly("bankrupt", {
      toDobError: "invalidToDob",
      validationResult,
      userEmail: "test@testemail.com",
      filters
    });
  });


  it('should return none data with status code 500 and render error-pages/500 page', async () => {
    req.body = mockSearchQuery.filters;
    sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[500]);

    await postSearchPage(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledOnceWithExactly(500);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
  });

  it('should return none data with status code 401 and render error-pages/500 page', async () => {
    req.body = mockSearchQuery.filters;
    sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[401]);

    await postSearchPage(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledOnceWithExactly(401);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
  });

  it('should catch the error on postSearchPage function and call the next middleware', async () => {
    req.session = undefined;
    req.body = mockSearchQuery.filters;
    await postSearchPage(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).to.have.been.calledOnce;
    expect(res.status).not.called;
    expect(res.render).not.called;
  });
});