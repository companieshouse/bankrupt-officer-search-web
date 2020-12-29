import sinon = require("sinon");

import { SCOTTISH_BANKRUPT_OFFICER } from "../../src/config";
import { getSessionRequest } from "./session.mock";

export const PAGE_NOT_FOUND = "page not found";
export const LINK_EXPIRED = "This link has expired";
export const SERVER_ERROR = "Sorry, there is a problem with the service";

export const response = { } as unknown as Response;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mockResponse = () => {
  const res = { render: {}, status: {} };
  res.status = sinon.stub().returns(res);
  res.render = sinon.stub().returns(res);
  return res;
};

export const mockRequest = { 
  path: SCOTTISH_BANKRUPT_OFFICER,
  session: getSessionRequest()
} as unknown as Request;

export const correctPathRequest = { 
  path: SCOTTISH_BANKRUPT_OFFICER 
};

export const FAKE_URL = { 
  path: "tryAgainNoLuck" 
};

export const mockNext = sinon.stub();
