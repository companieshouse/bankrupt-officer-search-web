import { NextFunction, Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { authentication } from "../../src/controller";
import { SCOTTISH_BANKRUPT_OFFICER } from "../../src/config";
import { getSessionRequest } from "../__mocks__/session.mock";
import { FAKE_URL } from "../__mocks__/utils.mock";

chai.use(sinonChai);

const redirectSpy = sinon.spy();

const nextFunctionSpy: NextFunction = sinon.spy();
const res: Response = {} as Response;
res.redirect = redirectSpy;

describe('AuthenticationController test suite', () => {

  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });

  it("should call next() if the path is correct", () => {
    const req: Request = { path: SCOTTISH_BANKRUPT_OFFICER } as Request;
    req.session = getSessionRequest();

    authentication(req, res, nextFunctionSpy);
    expect(nextFunctionSpy).to.have.been.calledOnce;
  });

  it("should call res.redirect if the session is undefined", () => {
    const req: Request = FAKE_URL as Request;
    req.session = undefined;

    authentication(req, res, nextFunctionSpy);
    expect(nextFunctionSpy).not.have.been.called;
    expect(redirectSpy).to.have.been.calledWith(`/signin?return_to=${SCOTTISH_BANKRUPT_OFFICER}`);
  });

  it('should catch the error and call next(err)', async () => {
    const resThrowsToBeCatched = { redirect: sinon.stub().throws() } as unknown as Response;
    const req: Request = FAKE_URL as Request;
    req.session = undefined;
    
    authentication(req, resThrowsToBeCatched, nextFunctionSpy);  
    expect(nextFunctionSpy).to.have.been.calledOnce;
  });
});
