import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { authentication } from "../../src/controller";
import { SCOTTISH_BANKRUPT_OFFICER } from "../../src/config";
import { 
  getSessionRequestWithPermission,
  getSessionRequestWithNoPermission
} from "../__mocks__/session.mock";
import { FAKE_URL } from '../__mocks__/utils.mock';

chai.use(sinonChai);

const mockResponse = () => {
  const res = { render : {}, status : {}, redirect : {}};
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  res.redirect = sinon.stub().returns(res);
  return res as Response;
};
let res: Response = {} as Response;
let nextFunctionSpy: NextFunction;

describe('AuthenticationController test suite', () => {

  beforeEach(done => {
    sinon.reset();
    sinon.restore();

    res = mockResponse();
    nextFunctionSpy = sinon.spy();

    done();
  });

  afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  it("should call next() if the path is correct", () => {
    const req: Request = { path: SCOTTISH_BANKRUPT_OFFICER } as Request;
    req.session = getSessionRequestWithPermission();

    authentication(req, res, nextFunctionSpy);
    expect(nextFunctionSpy).to.have.been.calledOnce;
    expect(res.redirect).not.have.been.called;
    expect(res.status).not.have.been.called;
    expect(res.render).not.have.been.called;
  });

  it("should return user authenticated but not authorized with error page 404", () => {
    const req: Request = { path: SCOTTISH_BANKRUPT_OFFICER } as Request;
    req.session = getSessionRequestWithNoPermission();

    authentication(req, res, nextFunctionSpy); 

    expect(nextFunctionSpy).not.have.been.called;
    expect(res.redirect).not.have.been.called;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.render).to.have.been.calledWith('error-pages/404');
  });

  it("should call res.redirect if the session is undefined", () => {
    const req: Request = { 
      session:  undefined,
      path: SCOTTISH_BANKRUPT_OFFICER } as Request;

    authentication(req, res, nextFunctionSpy);

    expect(nextFunctionSpy).not.have.been.called;
    expect(res.redirect).to.have.been.calledWith(`/signin?return_to=${SCOTTISH_BANKRUPT_OFFICER}`);
  });

  it('should catch the error and call next(err)', async () => {
    const resThrowsToBeCatched = { redirect: sinon.stub().throws() } as unknown as Response;
    const req: Request = FAKE_URL as Request;
    req.session = undefined;
    
    authentication(req, resThrowsToBeCatched, nextFunctionSpy);  
    expect(nextFunctionSpy).to.have.been.calledOnce;
  });
});
