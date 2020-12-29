import { createLogger } from "@companieshouse/structured-logging-node";
import ApplicationLogger from "@companieshouse/structured-logging-node/lib/ApplicationLogger";
import { APPLICATION_NAME } from "../../config";

let localLogger: ApplicationLogger;
export function createLocalLogger(appName: string): ApplicationLogger {
  if (localLogger) {
    return localLogger;
  } else {
    return (localLogger = createLogger(appName));
  }
}

export const logger = createLocalLogger(APPLICATION_NAME);
