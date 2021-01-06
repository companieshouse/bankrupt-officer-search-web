import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from "sinon-chai";
import sinon from "sinon";

import { 
  notFoundErrorHandler, 
  serverErrorHandler 
} from "../../src/controller";

import {
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

    expect(res.status).to.have.been.calledWith(statusCode.client_error);
    expect(res.render).to.have.been.calledOnce;
    expect(res.render).to.have.been.calledWith('error-pages/404');
  });
  
  it("serverErrorHandler", () => {      
    serverErrorHandler(err, req, res);

    expect(res.status).to.have.been.calledWith(statusCode.server_error);
    expect(res.render).to.have.been.calledOnce;
    expect(res.render).to.have.been.calledWith('error-pages/500');
  });  
  
});
  