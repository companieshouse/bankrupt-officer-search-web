/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SessionKey } from '@companieshouse/node-session-handler/lib/session/keys/SessionKey';
import { SignInInfoKeys } from '@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys';
import { UserProfileKeys } from '@companieshouse/node-session-handler//lib/session/keys/UserProfileKeys';
import { ISignInInfo } from '@companieshouse/node-session-handler/lib/session/model/SessionInterfaces';

export function getSignInInfo(session): ISignInInfo {
  return session?.data?.[SessionKey.SignInInfo];
}

export function getUserId(session): string{
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.UserId] as string;
}

export function checkUserSignedIn(session): boolean {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.SignedIn] === 1;
}
