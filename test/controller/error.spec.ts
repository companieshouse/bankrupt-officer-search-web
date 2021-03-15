import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { 
  notFoundErrorHandler, 
  serverErrorHandler 
} from "../../src/controller";

chai.use(sinonChai);

const mockResponse = () => {
  const res = { render : {}, status : {}};
  res.render = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  return res as unknown as Response;
};
const req = { } as unknown as Request;
const err = { statusCode: undefined };
let res: Response;


describe('ErrorController test suite', () => {

  beforeEach(done => {
    sinon.reset();
    sinon.restore();        
    res = mockResponse();
    done();
  });
  
  it("notFoundErrorHandler()", () => {
    notFoundErrorHandler(req, res);

    expect(res.status).to.have.been.calledOnceWithExactly(404);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/404');
  });
  
  it("serverErrorHandler", () => {      
    serverErrorHandler(err, req, res);

    expect(res.status).to.have.been.calledOnceWithExactly(500);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
  });  
  
  it("serverErrorHandler", () => {
    const testError = null;
    serverErrorHandler(testError, req, res);

    expect(res.status).to.have.been.calledOnceWithExactly(500);
    expect(res.render).to.have.been.calledOnceWithExactly('error-pages/500');
  });  
  
});
  