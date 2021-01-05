import { SessionKey } from '@companieshouse/node-session-handler/lib/session/keys/SessionKey'
import { SignInInfoKeys } from '@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys'
import { UserProfileKeys } from '@companieshouse/node-session-handler//lib/session/keys/UserProfileKeys'

// CREATE STATIC CLASS
export const getAccessToken = (session): string => {
  const signInInfo = session?.data[SessionKey.SignInInfo]

  return signInInfo?.[SignInInfoKeys.AccessToken]?.[SignInInfoKeys.AccessToken]!
}

export const getUserId = (session): string => {
  const signInInfo = session?.data[SessionKey.SignInInfo]

  return signInInfo?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.UserId]
}

export const checkUserSignedIn = (session): boolean => {
  return session?.data?.[SessionKey.SignInInfo]?.[SignInInfoKeys.SignedIn] === 1
}
