import axios from "axios";
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { 
  EPHEMERALKEY,
  statusCode,
  mockAxiosResponse,
  mockSearchQuery
} from "../__mocks__/utils.mock";

import { 
  fetchBankruptOfficer,
  fetchBankruptOfficers,
  failedExecHttpRequest
} from "../../src/service/api/api.service";

import { logger } from "../../src/utils";

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
      // stub the call
      const stubRequest = sinon.stub(axios, 'get').resolves(mockAxiosResponse.ok);
      // set the call
      const results = await fetchBankruptOfficer(EPHEMERALKEY);
      // check results
      expect(stubRequest).to.have.been.calledOnce;
      expect(results.error).to.be.undefined;
      expect(results.data).equal(mockAxiosResponse.ok.data);
      expect(results.status).equal(statusCode.ok);
    });
  
    it('should return the error object with the correct fields', async () => {
      const stubRequest = sinon.stub(axios, 'get').rejects(mockAxiosResponse.client_error);
      const results = await fetchBankruptOfficer(EPHEMERALKEY);

      expect(stubRequest).to.have.been.calledOnce;
      expect(results.data).to.be.undefined;
      expect(results.error).to.deep.equal(mockAxiosResponse.client_error.error);
      expect(results.status).equal(statusCode.client_error);
    });
  
    it('should catch any error and call next function', async () => {
      const stubRequest = sinon.stub(axios, 'get').throws();
      const results = await fetchBankruptOfficer(EPHEMERALKEY);

      expect(stubRequest).to.have.been.calledOnce;
      expect(results.data).to.be.undefined;
      expect(results.error).to.deep.equal(mockAxiosResponse.server_error.error);
      expect(results.status).equal(statusCode.server_error);
    });
  });

  describe('fetchBankruptOfficers()', () => {
    it('should return the response object with the correct fields', async () => {
      const stubRequest = sinon.stub(axios, 'post').resolves(mockAxiosResponse.ok);
      const results = await fetchBankruptOfficers(mockSearchQuery);

      expect(stubRequest).to.have.been.calledOnce;
      expect(results.error).to.be.undefined;
      expect(results.data).equal(mockAxiosResponse.ok.data);
      expect(results.status).equal(statusCode.ok);
    });
    
    it('should return the error object with the correct fields', async () => {
      const stubRequest = sinon.stub(axios, 'post').rejects(mockAxiosResponse.client_error);
      const results = await fetchBankruptOfficers(mockSearchQuery);
  
      expect(stubRequest).to.have.been.calledOnce;
      expect(results.data).to.be.undefined;
      expect(results.error).to.deep.equal(mockAxiosResponse.client_error.error);
      expect(results.status).equal(statusCode.client_error);
    });
    
    it('should catch any error and call next function', async () => {
      const stubRequest = sinon.stub(axios, 'post').throws();
      const results = await fetchBankruptOfficers(mockSearchQuery);
  
      expect(stubRequest).to.have.been.calledOnce;
      expect(results.data).to.be.undefined;
      expect(results.error).to.deep.equal(mockAxiosResponse.server_error.error);
      expect(results.status).equal(statusCode.server_error);
    });
  });

  describe('failedExecHttpRequest()', () => {
    it('should return the error object with the correct fields', () => {
      const e = {    
        statusCode: statusCode.server_error,
        response: { body: "failed to execute http request" }};
      const results = failedExecHttpRequest(e, statusCode.server_error);

      expect(results.error).to.deep.equal(e.response.body);
      expect(results.status).equal(e.statusCode);
    });
  });
  
});