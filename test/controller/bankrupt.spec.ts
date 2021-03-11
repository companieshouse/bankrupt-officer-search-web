import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";
import axios from 'axios';

import { getSearchPage, postSearchPage } from "../../src/controller";
import { logger } from '../../src/utils';
import { userSession } from '../../src/utils';

import { 
  BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS,
  BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS,
  mockSearchQuery,
  mockAxiosResponse, 
  statusCode 
} from '../__mocks__/utils.mock';

chai.use(sinonChai);

const mockResponse = () => {
  const res = { render : {}, status : {}};
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  return res as unknown as Response;
};
const req = { } as unknown as Request;
let res: Response;
let nextFunctionSpy: NextFunction;

describe("BankruptController test suite", () => {

  beforeEach( done => {
    sinon.reset();
    sinon.restore();

    res = mockResponse();
    nextFunctionSpy = sinon.spy();

    sinon.stub(logger, 'error').returns();
    done();
  });
        
  afterEach( done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  describe("search page get", () => {

    it("should renders the bankrupt officer search page", async () => {
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test');

      await getSearchPage(req, res, nextFunctionSpy);
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnce;
      expect(res.render).to.have.been.calledWith('bankrupt', { userEmail: "test" });  
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
      sinon.stub(axios, 'post').resolves(mockAxiosResponse.data_results);
      req.body = mockSearchQuery;

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test');
      await postSearchPage(req, res, nextFunctionSpy);
      
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnce;
      expect(res.render).to.have.been.calledWith('bankrupt', {searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, userEmail: "test" });
    });

    it("should renders the bankrupt officer search page with not officers", async () => {
      sinon.stub(axios, 'post').resolves(mockAxiosResponse.no_data);
      req.body = mockSearchQuery;

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test');
      await postSearchPage(req, res, nextFunctionSpy);
        
      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnce;
      expect(res.render).to.have.been.calledWith('bankrupt', {searched: true, ...BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS, userEmail: "test" });
    });

    it('should return none data with status code 500 and render error-pages/500 page', async () => {
      sinon.stub(axios, 'post').rejects(mockAxiosResponse.server_error);
      req.body = mockSearchQuery;

      await postSearchPage(req, res, nextFunctionSpy);
    
      expect(nextFunctionSpy).not.called;
      expect(res.status).to.have.been.calledWith(statusCode.server_error);
      expect(res.render).to.have.been.calledWith('error-pages/500');
    });
  });
});
