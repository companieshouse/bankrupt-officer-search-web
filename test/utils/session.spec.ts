import { expect } from 'chai';

import { getSessionRequest, testSignedIn, testUserProfile } from '../__mocks__/session.mock';
import { checkUserSignedIn, getSignInInfo, getUserId } from '../../src/utils/session/session';
import { Session } from '@companieshouse/node-session-handler';
import { SignInInfoKeys } from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";

describe('SessionUtils test suite', () => {  
  const testSessionRequest: Session = getSessionRequest();

  it('Test function getSignInInfo()', () => {    
    const signInInfo = getSignInInfo(testSessionRequest);
    expect(signInInfo).has.keys(SignInInfoKeys.SignedIn, SignInInfoKeys.UserProfile);
  });

  it('Test function getUserId()', () => {
    const userId = getUserId(testSessionRequest);
    expect(userId).equal(testUserProfile.id);
  });

  it('Test function checkUserSignedIn()', () => {
    const userSignedIn = checkUserSignedIn(testSessionRequest);
    expect(userSignedIn).equal(Boolean(testSignedIn));
  });

});
