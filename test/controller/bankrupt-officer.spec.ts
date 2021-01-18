import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";
import axios from 'axios';

import { bankruptOfficer } from "../../src/controller";
import { logger, formattingOfficersInfo } from '../../src/utils';

import { 
  mockAxiosResponse,
  mockBankruptOfficer,
  statusCode
} from '../__mocks__/utils.mock';

chai.use(sinonChai);

const nextFunctionSpy: NextFunction = sinon.spy();
const mockResponse = () => {
  const res = { render : {}, status : {}};
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  return res as unknown as Response;
};
const req = { } as unknown as Request;
let res: Response;

describe('BankruptOfficerController test suite', () => {

  beforeEach(done => {
    sinon.reset();
    sinon.restore();
    
    res = mockResponse();
    sinon.stub(logger, 'error').returns();
    done();
  });
    
  afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  it('should return bankruptOfficer with data object and render bankrupt_officer page', async () => {
    sinon.stub(formattingOfficersInfo([]));
    sinon.stub(axios, 'get').resolves(mockAxiosResponse.ok);

    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.render).to.have.been.calledOnce;
    expect(res.render).to.have.been.calledWith('bankrupt_officer', { bankruptOfficer: mockBankruptOfficer });
  });

  it('should return bankruptOfficer with status code 500 and render error-pages/500 page', async () => {
    sinon.stub(axios, 'get').rejects(mockAxiosResponse.server_error);

    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledWith(statusCode.server_error);
    expect(res.render).to.have.been.calledWith('error-pages/500');
  });

  it('should return bankruptOfficer with status code 404 and render error-pages/404-link-expired page', async () => {
    sinon.stub(axios, 'get').rejects(mockAxiosResponse.client_error);

    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledWith(statusCode.client_error);
    expect(res.render).to.have.been.calledWith('error-pages/404-link-expired');
  });

});