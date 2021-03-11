/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SessionKey } from '@companieshouse/node-session-handler/lib/session/keys/SessionKey';
import { SignInInfoKeys } from '@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys';
import { UserProfileKeys } from '@companieshouse/node-session-handler//lib/session/keys/UserProfileKeys';
import { ISignInInfo } from '@companieshouse/node-session-handler/lib/session/model/SessionInterfaces';
import { AccessTokenKeys } from '@companieshouse/node-session-handler/lib/session/keys/AccessTokenKeys';

import {
  PERMISSIONS_PATH
} from '../../config';

export function getSignInInfo(session): ISignInInfo {
  return session?.data?.[SessionKey.SignInInfo];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPermissions(session): any {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.Permissions];
}

export function checkPermission(session): boolean {
  const permission = getPermissions(session);
  return permission?.[PERMISSIONS_PATH] === 1;
}

export function getLoggedInUserEmail(session): string {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.Email] as string;
}

export function getUserId(session): string{
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.UserId] as string;
}

export function checkUserSignedIn(session): boolean {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.SignedIn] === 1;
}

export function getAccessToken(session): string {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.AccessToken]?.[AccessTokenKeys.AccessToken] as string;
}