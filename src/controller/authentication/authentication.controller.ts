import { NextFunction, Request, Response } from 'express'
import { SessionKey } from '@companieshouse/node-session-handler/lib/session/keys/SessionKey'
import { SignInInfoKeys } from '@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys'
import { createLogger } from '@companieshouse/structured-logging-node'

import { APPLICATION_NAME, SCOTTISH_BANKRUPT_OFFICER } from '../../config'

const logger = createLogger(APPLICATION_NAME)

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.session) {
      logger.info(`${req.url}: Session object is missing!`)
    }
    const signedIn = req.session?.data?.[SessionKey.SignInInfo]?.[SignInInfoKeys.SignedIn] === 1

    if (!signedIn) {
      logger.info('User unauthorized, status_code=401, redirecting to sign in page')
      return res.redirect(`/signin?return_to=${SCOTTISH_BANKRUPT_OFFICER}`)
    } else {
      logger.info('User is signed in')
    }
    next()
  } catch (err) {
    logger.error(`Bankrupt officers authentication middleware: ${err as string}`)
    next(err)
  }
}
