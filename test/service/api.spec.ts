import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { 
  EPHEMERALKEY,
  statusCode,
  mockSearchQuery,
  mockApiClient,
  mockGetResponse,
  mockFullBankruptOfficer,
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
    // it('should return the response object with the correct fields', async () => {
    //   const stubRequest = sinon.stub(mockApiClient, "badosService");
    //   // set the call
    //   const results = await mockApiClient.badosService.getBankruptOfficer(EPHEMERALKEY);
    //   // check results
    //   expect(stubRequest).to.have.been.calledOnce;
    //   expect(results.httpStatusCode).to.equal(200);
      // expect(results.resource.caseType).to.equal(mockFullBankruptOfficer.caseType);
    // });
  
    // it('should return the error object with the correct fields', async () => {
    //   const stubRequest = sinon.stub(axios, 'get').rejects(mockAxiosResponse.client_error);
    //   const results = await fetchBankruptOfficer(EPHEMERALKEY);

    //   expect(stubRequest).to.have.been.calledOnce;
    //   expect(results.data).to.be.undefined;
    //   expect(results.error).to.deep.equal(mockAxiosResponse.client_error.error);
    //   expect(results.status).equal(statusCode.client_error);
    // });
  
    // it('should catch any error and call next function', async () => {
    //   const stubRequest = sinon.stub(axios, 'get').throws();
    //   const results = await fetchBankruptOfficer(EPHEMERALKEY);

    //   expect(stubRequest).to.have.been.calledOnce;
    //   expect(results.data).to.be.undefined;
    //   expect(results.error).to.deep.equal(mockAxiosResponse.server_error.error);
    //   expect(results.status).equal(statusCode.server_error);
    // });
  });

  // describe('fetchBankruptOfficers()', () => {
  //   it('should return the response object with the correct fields', async () => {
  //     const stubRequest = sinon.stub(axios, 'post').resolves(mockAxiosResponse.ok);
  //     const results = await fetchBankruptOfficers(mockSearchQuery);

  //     expect(stubRequest).to.have.been.calledOnce;
  //     expect(results.error).to.be.undefined;
  //     expect(results.data).equal(mockAxiosResponse.ok.data);
  //     expect(results.status).equal(statusCode.ok);
  //   });
    
  //   it('should return the error object with the correct fields', async () => {
  //     const stubRequest = sinon.stub(axios, 'post').rejects(mockAxiosResponse.client_error);
  //     const results = await fetchBankruptOfficers(mockSearchQuery);
  
  //     expect(stubRequest).to.have.been.calledOnce;
  //     expect(results.data).to.be.undefined;
  //     expect(results.error).to.deep.equal(mockAxiosResponse.client_error.error);
  //     expect(results.status).equal(statusCode.client_error);
  //   });
    
  //   it('should catch any error and call next function', async () => {
  //     const stubRequest = sinon.stub(axios, 'post').throws();
  //     const results = await fetchBankruptOfficers(mockSearchQuery);
  
  //     expect(stubRequest).to.have.been.calledOnce;
  //     expect(results.data).to.be.undefined;
  //     expect(results.error).to.deep.equal(mockAxiosResponse.server_error.error);
  //     expect(results.status).equal(statusCode.server_error);
  //   });
  // });

  // describe('createOAuthApiClient()', () => {
  //   it('should return the private API client', () => {

  //   });
  // });
  
});