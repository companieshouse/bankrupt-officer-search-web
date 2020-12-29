import { Session } from "@companieshouse/node-session-handler";
import { SessionKey } from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import { Encoding } from "@companieshouse/node-session-handler/lib/encoding/Encoding";
import { SignInInfoKeys } from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import { ISignInInfo, IUserProfile } from "@companieshouse/node-session-handler/lib/session/model/SessionInterfaces";

export const testSignedIn = 1;
export const testUserProfile: IUserProfile = { id: 'someId' };

export function getSessionRequest(): Session {
  return new Session({
    [SessionKey.SignInInfo]: {
      [SignInInfoKeys.SignedIn]: testSignedIn,
      [SignInInfoKeys.UserProfile]: testUserProfile
    } as ISignInInfo
  });
}

export const COOKIE_NAME = "__SID";
export const SIGNED_IN_ID = '4ZhJ6pAmB5NAJbjy/6fU1DWMqqrk';
export const SIGNED_IN_SIGNATURE = 'mqJFqeNMr1lzJzQjKt+44ufLaT8';
export const SIGNED_IN_COOKIE = SIGNED_IN_ID + SIGNED_IN_SIGNATURE;
export const signedInCookie = [`${COOKIE_NAME}=${SIGNED_IN_COOKIE}`];
export const sessionSignedIn = Encoding.encode({
  [SessionKey.ClientSig]: SIGNED_IN_SIGNATURE,
  [SessionKey.Id]: SIGNED_IN_ID,
  expires: Date.now() + 3600 * 1000,
  signin_info: {
    access_token: {
      access_token: 'oKi1z8KY0gXsXu__hy2-YU_JJSdtxOkJ4K5MAE-gOFVzpKt5lvqnFpVeUjhqhVHZ1K8Hkr7M4IYdzJUnOz2hQw',
      expires_in: 3600,
      refresh_token: 'y4YXof84bkUeBZlavRlAGfdq5VMkpPm6UR0OYwPvI6i6UDmtEiTQ1Ro-HGCGo01y4ploP4Kdwd6H4dEh8-E_Fg',
      token_type: 'Bearer'
    },
    signed_in: 1
  }
});

export const SIGNED_OUT_ID = '2VsqkD1ILMqzO0NyuL+ubx4crUCP';
export const SIGNED_OUT_SIGNATURE = '9L9X4DGu5LOaE2yaGjPk+vGZcMw';
export const SIGNED_OUT_COOKIE = SIGNED_OUT_ID + SIGNED_OUT_SIGNATURE;
export const SET_SIGNED_OUT_COOKIE = [`${COOKIE_NAME}=${SIGNED_OUT_COOKIE}`];
export const INVALID_COOKIE = [`${COOKIE_NAME}=123`];

export const sessionSignedOut = Encoding.encode({
  [SessionKey.ClientSig]: SIGNED_OUT_SIGNATURE,
  [SessionKey.Id]: SIGNED_OUT_ID,
  expires: Date.now() + 3600 * 1000,
  connectTimeout: 1000,
  signin_info: {
    access_token: {
      access_token: 'oKi1z8KY0gXsXu__hy2-YU_JJSdtxOkJ4K5MAE-gOFVzpKt5lvqnFpVeUjhqhVHZ1K8Hkr7M4IYdzJUnOz2hQw',
      expires_in: 3600,
      refresh_token: 'y4YXof84bkUeBZlavRlAGfdq5VMkpPm6UR0OYwPvI6i6UDmtEiTQ1Ro-HGCGo01y4ploP4Kdwd6H4dEh8-E_Fg',
      token_type: 'Bearer'
    },
    signed_in: 0
  }
});
