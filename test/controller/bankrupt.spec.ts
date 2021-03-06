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
  mockSearchQuery
} from '../__mocks__/utils.mock';

import { getSessionRequest } from '../__mocks__/session.mock';
import { logger } from '../../src/utils';

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

    it("should renders the bankrupt officer search page", async () => {
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');

      await getSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { userEmail: "test@testemail.com" });
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
      req.body = mockSearchQuery;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, userEmail: "test@testemail.com"  });
    });

    it("should renders the bankrupt officer search page with the list of officers considering the DAB", async () => {
      req.body = mockSearchQuery;
      req.body["dob-dd"] = 1; req.body["dob-mm"] = 11; req.body["dob-yyyy"] = 1989;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200]);

      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');
      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { searched: true, ...BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS, userEmail: "test@testemail.com" });
    });

    it("should renders the bankrupt officer search page with not officers", async () => {
      req.body = mockSearchQuery;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[404]);
      sinon.stub(userSession, "getLoggedInUserEmail").returns('test@testemail.com');

      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.render).to.have.been.calledOnceWithExactly('bankrupt', { searched: true, ...BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS, userEmail: "test@testemail.com" });
    });

    it('should return none data with status code 500 and render error-pages/500 page', async () => {
      req.body = mockSearchQuery;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[500]);

      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.status).to.have.been.calledOnceWithExactly(500);
      expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
    });

    it('should return none data with status code 401 and render error-pages/500 page', async () => {
      req.body = mockSearchQuery;
      sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[401]);

      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).not.called;
      expect(res.status).to.have.been.calledOnceWithExactly(401);
      expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
    });

    it('should catch the error on postSearchPage function and call the next middleware', async () => {
      req.session = undefined;
      await postSearchPage(req, res, nextFunctionSpy);

      expect(nextFunctionSpy).to.have.been.calledOnce;
      expect(res.status).not.called;
      expect(res.render).not.called;
    });
  });
});
