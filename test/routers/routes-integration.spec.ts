import Redis from 'ioredis';
import sinon from "sinon";
import request from "supertest";
import { expect } from 'chai';

import { 
  sessionSignedOut, 
  sessionSignedIn,
  signedInCookie
} from "../__mocks__/session.mock";

import {  
  LINK_EXPIRED,
  PAGE_NOT_FOUND, 
  SERVER_ERROR,
  FAKE_URL
} from "../__mocks__/req-res-next.mock";

import {
  SCOTTISH_BANKRUPT_OFFICER,
  SCOTTISH_BANKRUPT_OFFICER_DETAILS
} from '../../src/config';

let app = null;

describe('Routers test suite', () => {

  beforeEach(done => {
    sinon.stub(Redis.prototype, 'connect').returns(Promise.resolve());
    sinon.stub(Redis.prototype, 'get').returns(Promise.resolve(sessionSignedIn));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app = require('../../src/app').default;
    done();
  });

  afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
  });

  describe('Authentication', () => {
    [ SCOTTISH_BANKRUPT_OFFICER,
      SCOTTISH_BANKRUPT_OFFICER_DETAILS].forEach((page) => {
      it('should redirect ' + page + ' to signin if user is not logged in', async () => {
        return await request(app)
          .get(page)
          .set('Cookie', sessionSignedOut)
          .redirects(0)
          .then(response => {
            expect(response.text).to.include('/signin');
            expect(response.status).equal(302);
          });
      });
    });
  });

  describe('Errors routes', () => {

    it('Page not Found Error', async () => {
      return await request(app)
        .get(FAKE_URL)
        .set('Cookie', signedInCookie)
        .then(response => {
          expect(response.text).to.include(PAGE_NOT_FOUND);
          expect(response.status).equal(404);
        });
    });
  
    it('Page link has Expired Error', async () => {
      return await request(app)
        .get(SCOTTISH_BANKRUPT_OFFICER_DETAILS)
        .set('Cookie', signedInCookie)
        .then(response => {
          expect(response.text).to.include(LINK_EXPIRED);
          expect(response.status).equal(404);
        });
    });  

    it('Page Server Error', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // router.get("/error", (req: Request, res: Response, next: NextFunction) => {
      //   throw new Error("this simulates any type of error coming from the app");
      // });
      // const res: Response = sinon.spy();
      // const req: Request = sinon.spy();
      // const next: NextFunction = sinon.spy();
      
      // const stub = sinon.stub();
      // stub.onCall(postSearchPage(req, res, next)).throwsException();

      // const resp = await request(app)
      //   .get("/error")
      //   .set("Cookie", signedInCookie);
  
      // expect(resp.status).equal(500);
      // expect(resp.text).to.include(SERVER_ERROR);
      // TBD!!!
      expect(true).to.be.false;
    });

  });

  describe('Hit Scottish Endpoint', () => {
    it("should find " + SCOTTISH_BANKRUPT_OFFICER + " page url", async () => {
      return await request(app)
        .get(SCOTTISH_BANKRUPT_OFFICER)
        .set('Cookie', signedInCookie)
        .then(response => {
          expect(response.text).to.include('Search for a bankrupt and disqualified officer');
          expect(response.status).equal(200);
        });
    });
  });

});
