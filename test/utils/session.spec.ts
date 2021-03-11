import { expect } from 'chai';

import { Session } from '@companieshouse/node-session-handler';
import { SignInInfoKeys } from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import { PERMISSIONS_PATH } from "../../src/config";

import { 
  getSessionRequestWithPermission,
  getSessionRequest,
  testSignedIn,
  testUserProfile,
  testAccessToken
} from '../__mocks__/session.mock';
import { 
  checkUserSignedIn,
  getPermissions,
  checkPermission,
  getLoggedInUserEmail,
  getSignInInfo,
  getUserId,
  getAccessToken
} from '../../src/utils/session/session';

describe('SessionUtils test suite', () => {  
  const testSessionRequest: Session = getSessionRequest();
  const testSessionWithPermission: Session = getSessionRequestWithPermission();

  it('Test function getSignInInfo()', () => {    
    const signInInfo = getSignInInfo(testSessionRequest);
    expect(signInInfo).has.keys(SignInInfoKeys.SignedIn, SignInInfoKeys.UserProfile, SignInInfoKeys.AccessToken);
  });

  it('Test function getPermissions()', () => {
    const testPermission = getPermissions(testSessionWithPermission);
    expect(testPermission).has.key(PERMISSIONS_PATH);
  });

  it('Test function checkPermission()', () => {
    const testPermission = checkPermission(testSessionWithPermission);
    expect(testPermission).equal(Boolean(1));
  });

  it('Test function getLoggedInUserEmail()', () => {
    const testPermission = getLoggedInUserEmail(testSessionWithPermission);
    expect(testPermission).equal("userWithPermission@ch.gov.uk");
  });

  it('Test function getUserId()', () => {
    const userId = getUserId(testSessionRequest);
    expect(userId).equal(testUserProfile.id);
  });

  it('Test function checkUserSignedIn()', () => {
    const userSignedIn = checkUserSignedIn(testSessionRequest);
    expect(userSignedIn).equal(Boolean(testSignedIn));
  });

  it('Test function getAccessToken()', () => {
    const signInInfo = getAccessToken(testSessionRequest);
    expect(signInInfo).equal(testAccessToken.access_token);
  });
});
