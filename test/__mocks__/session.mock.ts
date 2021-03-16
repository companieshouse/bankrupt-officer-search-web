import { Session } from "@companieshouse/node-session-handler";
import { SessionKey } from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import { Encoding } from "@companieshouse/node-session-handler/lib/encoding/Encoding";
import { SignInInfoKeys } from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import { UserProfileKeys } from "@companieshouse/node-session-handler/lib/session/keys/UserProfileKeys";
import { AccessTokenKeys } from "@companieshouse/node-session-handler/lib/session/keys/AccessTokenKeys";
import { IAccessToken, ISignInInfo, IUserProfile } from "@companieshouse/node-session-handler/lib/session/model/SessionInterfaces";

import { PERMISSIONS_PATH } from "../../src/config";

export const COOKIE_NAME = "__SID";
export const testSignedIn = 1;
export const testUserProfile: IUserProfile = { id: 'someId' };
export const testAccessToken: IAccessToken = { access_token: 'accessToken' };

export function getSessionRequest(): Session {
  return new Session({
    [SessionKey.SignInInfo]: {
      [SignInInfoKeys.SignedIn]: testSignedIn,
      [SignInInfoKeys.UserProfile]: testUserProfile,
      [SignInInfoKeys.AccessToken]: testAccessToken
    } as ISignInInfo
  });
}

export const SIGNED_IN_ID = '4ZhJ6pAmB5NAJbjy/6fU1DWMqqrk';
export const SIGNED_IN_SIGNATURE = 'mqJFqeNMr1lzJzQjKt+44ufLaT8';
export const SIGNED_IN_COOKIE = SIGNED_IN_ID + SIGNED_IN_SIGNATURE;
export const signedInCookie = [`${COOKIE_NAME}=${SIGNED_IN_COOKIE}`];

const ACCESS_TOKEN = {
  [AccessTokenKeys.AccessToken]: 'oKi1z8KY0gXsXu__hy2-YU_JJSdtxOkJ4K5MAE-gOFVzpKt5lvqnFpVeUjhqhVHZ1K8Hkr7M4IYdzJUnOz2hQw',
  [AccessTokenKeys.ExpiresIn]: 3600,
  [AccessTokenKeys.RefreshToken]: 'y4YXof84bkUeBZlavRlAGfdq5VMkpPm6UR0OYwPvI6i6UDmtEiTQ1Ro-HGCGo01y4ploP4Kdwd6H4dEh8-E_Fg',
  [AccessTokenKeys.TokenType]: 'Bearer'
};

const USER_PROFILE_WITH_PERMISSIONS =  {
  [UserProfileKeys.Email]: "userWithPermission@ch.gov.uk",
  [UserProfileKeys.Permissions]: { [PERMISSIONS_PATH]: 1 }
};

const USER_PROFILE_WITH_NO_PERMISSIONS = {
  [UserProfileKeys.Email]: "userWithNoPermission@ch.gov.uk",
  [UserProfileKeys.Permissions]: {}
};

const SIGN_IN_INFO = {
  [SignInInfoKeys.AccessToken]: ACCESS_TOKEN,
  [SignInInfoKeys.SignedIn]: 1,
  [SignInInfoKeys.UserProfile]: USER_PROFILE_WITH_PERMISSIONS
};

const SIGN_IN_INFO_NO_PERMISSION = {
  [SignInInfoKeys.AccessToken]: ACCESS_TOKEN,
  [SignInInfoKeys.SignedIn]: 1,
  [SignInInfoKeys.UserProfile]: USER_PROFILE_WITH_NO_PERMISSIONS
};

const SIGN_OUT_INFO = {
  [SignInInfoKeys.AccessToken]: ACCESS_TOKEN,
  [SignInInfoKeys.SignedIn]: 0,
  [SignInInfoKeys.UserProfile]: USER_PROFILE_WITH_NO_PERMISSIONS
};

export const sessionSignedIn = Encoding.encode({
  [SessionKey.ClientSig]: SIGNED_IN_SIGNATURE,
  [SessionKey.Id]: SIGNED_IN_ID,
  [SessionKey.Expires]: Date.now() + 3600 * 1000,
  [SessionKey.SignInInfo]: SIGN_IN_INFO
});

export const sessionSignedInNoPermission = Encoding.encode({
  [SessionKey.ClientSig]: SIGNED_IN_SIGNATURE,
  [SessionKey.Id]: SIGNED_IN_ID,
  [SessionKey.Expires]: Date.now() + 3600 * 1000,
  [SessionKey.SignInInfo]: SIGN_IN_INFO_NO_PERMISSION
});

export function getSessionRequestWithPermission(): Session {
  return new Session({
    [SessionKey.SignInInfo]: SIGN_IN_INFO as ISignInInfo
  });
}

export const SIGNED_OUT_ID = '2VsqkD1ILMqzO0NyuL+ubx4crUCP';
export const SIGNED_OUT_SIGNATURE = '9L9X4DGu5LOaE2yaGjPk+vGZcMw';
export const SIGNED_OUT_COOKIE = SIGNED_OUT_ID + SIGNED_OUT_SIGNATURE;
export const signedOutCookie = [`${COOKIE_NAME}=${SIGNED_OUT_COOKIE}`];

export const sessionSignedOut = Encoding.encode({
  [SessionKey.ClientSig]: SIGNED_OUT_SIGNATURE,
  [SessionKey.Id]: SIGNED_OUT_ID,
  [SessionKey.Expires]: Date.now() + 3600 * 1000,
  [SessionKey.SignInInfo]: SIGN_OUT_INFO,
  connectTimeout: 1000
});

export function getSessionRequestWithNoPermission(): Session {
  return new Session({
    [SessionKey.SignInInfo]: SIGN_IN_INFO_NO_PERMISSION as ISignInInfo
  });
}