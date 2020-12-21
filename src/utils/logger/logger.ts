import { APPLICATION_NAME } from '../../config'

import { createLogger } from '@companieshouse/structured-logging-node'
import ApplicationLogger from '@companieshouse/structured-logging-node/lib/ApplicationLogger'

let localLogger: ApplicationLogger
function createLocalLogger (appName: string) {
  if (localLogger) {
    return localLogger
  } else {
    return localLogger = createLogger(appName)
  }
}

export const logger = createLocalLogger(APPLICATION_NAME)
