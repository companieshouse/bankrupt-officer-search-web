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

let app = null;

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
      });
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
