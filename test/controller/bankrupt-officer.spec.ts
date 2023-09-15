import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { BadosService } from 'private-api-sdk-node/dist/services/bankrupt-officer';
import { bankruptOfficer } from "../../src/controller";
import { logger } from '../../src/utils';

import { 
  mockGetResponse,
  mockFullBankruptOfficer,
  EPHEMERALKEY,
} from '../__mocks__/utils.mock';

import { 
  getSessionRequest
} from '../__mocks__/session.mock';
import { FullBankruptOfficer } from '../../src/types';
import Resource from '@companieshouse/api-sdk-node/dist/services/resource';

chai.use(sinonChai);

const nextFunctionSpy: NextFunction = sinon.spy();
const mockResponse = () => {
  const res = { render : {}, status : {}};
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  return res as Response;
};
const req = { session: getSessionRequest() } as Request;
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
    sinon.stub(BadosService.prototype, 'getBankruptOfficer').resolves(mockGetResponse[200] as Resource<FullBankruptOfficer>);

    await bankruptOfficer(req, res, nextFunctionSpy);
    expect(nextFunctionSpy).not.called;
    expect(res.render).to.have.been.calledOnceWithExactly('bankrupt_officer', { bankruptOfficer: mockFullBankruptOfficer });
  });


  it('should return bankruptOfficer with no data object and render a blank bankrupt_officer page', async () => {
    sinon.stub(BadosService.prototype, 'getBankruptOfficer').resolves({ httpStatusCode: 200, resource: undefined },);
    req['params'] = { id: EPHEMERALKEY + 0 };
    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.render).to.have.been.calledOnceWithExactly('bankrupt_officer', { bankruptOfficer: {} });
  });

  it('should return bankruptOfficer with status code 500 and render error-pages/500 page', async () => {
    sinon.stub(BadosService.prototype, 'getBankruptOfficer').resolves(mockGetResponse[500] as Resource<FullBankruptOfficer>);

    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledOnceWithExactly(500);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
  });

  it('should return bankruptOfficer with status code 404 and render error-pages/404-link-expired page', async () => {
    sinon.stub(BadosService.prototype, 'getBankruptOfficer').resolves(mockGetResponse[404] as Resource<FullBankruptOfficer>);

    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.called;
    expect(res.status).to.have.been.calledOnceWithExactly(404);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/404-link-expired');
  });

  it('should catch the error on bankruptOfficer function and call the next middleware', async () => {
    req.session = undefined;
    await bankruptOfficer(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).to.have.been.calledOnce;
    expect(res.status).not.called;
    expect(res.render).not.called;
  });

});