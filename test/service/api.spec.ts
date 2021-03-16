import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { 
  EPHEMERALKEY,
  mockSearchQuery,
  mockGetResponse,
  errorStatusCode,
  mockPostResponse,
} from "../__mocks__/utils.mock";

import {
  getSessionRequest
} from "../__mocks__/session.mock";

import {
  createOAuthApiClient,
  fetchBankruptOfficer,
  fetchBankruptOfficers
} from "../../src/service/api/api.service";

import { logger } from "../../src/utils";
import { BadosService } from 'private-api-sdk-node/dist/services/bankrupt-officer';
import PrivateApiClient from 'private-api-sdk-node/dist/client';

chai.use(sinonChai);

describe('ApiService Test suite', () => {
  beforeEach(done => {
    sinon.reset();
    sinon.restore();
    sinon.stub(logger, 'error').returns();
    done();
  });

  afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  describe('fetchBankruptOfficer()', () => {
    it('should return the response object with the correct fields', async () => {
      const stubRequest = sinon.stub(BadosService.prototype, 'getBankruptOfficer').resolves(mockGetResponse[200]);

      const results = await fetchBankruptOfficer(getSessionRequest(), EPHEMERALKEY);
      
      expect(stubRequest).to.have.been.calledOnce;
      expect(results.httpStatusCode).to.equal(200);
      expect(results.resource).to.be.not.undefined;
    });
  
    errorStatusCode.forEach( httpStatus => {
      it(`should return the error object with the ${httpStatus} in httpStatusCode field`, async () => {
        const stubRequest = sinon.stub(BadosService.prototype, 'getBankruptOfficer').rejects(mockGetResponse[httpStatus]);

        const results = await fetchBankruptOfficer(getSessionRequest(), EPHEMERALKEY);

        expect(stubRequest).to.have.been.calledOnce;
        expect(results.httpStatusCode).equal(httpStatus);
        expect(results.resource).to.be.undefined;
      });
    });
  });

  describe('fetchBankruptOfficers()', () => {
    it('should return the response object with the correct fields', async () => {
      const stubRequest = sinon.stub(BadosService.prototype, 'getBankruptOfficers').resolves(mockPostResponse[200]);

      const results = await fetchBankruptOfficers(getSessionRequest(), mockSearchQuery);
      
      expect(stubRequest).to.have.been.calledOnce;
      expect(results.httpStatusCode).to.equal(200);
      expect(results.resource).to.be.not.undefined;
    });
  
    errorStatusCode.forEach( httpStatus => {
      it(`should return the error object with the ${httpStatus} in httpStatusCode field`, async () => {
        const stubRequest = sinon.stub(BadosService.prototype, 'getBankruptOfficers').rejects(mockPostResponse[httpStatus]);

        const results = await fetchBankruptOfficers(getSessionRequest(), mockSearchQuery);

        expect(stubRequest).to.have.been.calledOnce;
        expect(results.httpStatusCode).equal(httpStatus);
        expect(results.resource).to.be.undefined;
      });
    });
  });

  describe('createOAuthApiClient', () => {
    it('check instance of PrivateApiClient', () => {
      const client = createOAuthApiClient(getSessionRequest());
      expect(client).instanceOf(PrivateApiClient);
      expect(client.badosService).instanceOf(BadosService);
      expect(client.badosService).is.not.null;
    });
  });
  
});