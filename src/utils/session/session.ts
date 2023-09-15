/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SessionKey } from '@companieshouse/node-session-handler/lib/session/keys/SessionKey';
import { SignInInfoKeys } from '@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys';
import { UserProfileKeys } from '@companieshouse/node-session-handler//lib/session/keys/UserProfileKeys';
import { ISignInInfo } from '@companieshouse/node-session-handler/lib/session/model/SessionInterfaces';
import { AccessTokenKeys } from '@companieshouse/node-session-handler/lib/session/keys/AccessTokenKeys';

import {
  PERMISSIONS_PATH
} from '../../config';
import { Session } from '@companieshouse/node-session-handler';

export function getSignInInfo(session: Session | undefined): ISignInInfo | undefined {
  return session?.data?.[SessionKey.SignInInfo];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPermissions(session: Session | undefined): any {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.Permissions];
}

export function checkPermission(session: Session | undefined): boolean {
  const permission = getPermissions(session);
  return permission?.[PERMISSIONS_PATH] === 1;
}

export function getLoggedInUserEmail(session: Session | undefined): string {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.Email] as string;
}

export function getUserId(session: Session): string{
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.UserId] as string;
}

export function checkUserSignedIn(session: Session | undefined): boolean {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.SignedIn] === 1;
}

export function getAccessToken(session: Session | undefined): string {
  const signInInfo = getSignInInfo(session);
  return signInInfo?.[SignInInfoKeys.AccessToken]?.[AccessTokenKeys.AccessToken] as string;
}