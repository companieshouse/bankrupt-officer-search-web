import Redis from 'ioredis';
import sinon from "sinon";
import request from "supertest";
import { expect } from 'chai';

import {
  sessionSignedIn,
  signedOutCookie,
  signedInCookie
} from "../__mocks__/session.mock";

import {
  SCOTTISH_BANKRUPT_OFFICER,
  SCOTTISH_BANKRUPT_OFFICER_DETAILS
} from '../../src/config';

import { logger } from "../../src/utils";

let app: unknown = null;

describe('Routers test suite', () => {

  beforeEach(done => {
    sinon.stub(Redis.prototype, 'connect').returns(Promise.resolve());
    sinon.stub(Redis.prototype, 'get').returns(Promise.resolve(sessionSignedIn));
    sinon.stub(logger, 'info').returns();

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
          .set('Cookie', signedOutCookie)
          .redirects(0)
          .then(response => {
            expect(response.text).to.include('/signin');
            expect(response.status).equal(302);
          });
      }).timeout(10000);
    });
  });

  describe('Healthcheck', () => {
    it('should return 200 without authentication', async () => {
      const resp = await request(app)
        .get(`${SCOTTISH_BANKRUPT_OFFICER}/healthcheck`)
        .set('Cookie', signedOutCookie)
        .redirects(0);

      expect(resp.status).to.equal(200);
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

  describe('Should hit SCOTTISH_BANKRUPT_OFFICER Endpoint and return signout info', () => {
    it("should find " + SCOTTISH_BANKRUPT_OFFICER + " page url", async () => {
      return await request(app)
        .get(SCOTTISH_BANKRUPT_OFFICER)
        .set('Cookie', signedInCookie)
        .then(response => {
          expect(response.text).to.include('userWithPermission@ch.gov.uk');
          expect(response.text).to.include('/signout');
          expect(response.status).equal(200);
        });
    });
  });

  describe('Should hit SCOTTISH_BANKRUPT_OFFICER_DETAILS Endpoint and should no return signout info', () => {
    it("should find " + SCOTTISH_BANKRUPT_OFFICER_DETAILS + " page url", async () => {
      return await request(app)
        .get(SCOTTISH_BANKRUPT_OFFICER_DETAILS)
        .set('Cookie', signedInCookie)
        .then(response => {
          expect(response.text).not.to.include('userWithPermission@ch.gov.uk');
          expect(response.text).not.to.include('/signout');
        });
    });
  });

});
