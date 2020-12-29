import ApplicationLogger from "@companieshouse/structured-logging-node/lib/ApplicationLogger";
import { expect } from "chai";

import { logger, createLocalLogger } from "../../src/utils/logger/logger";
import { APPLICATION_NAME } from "../../src/config";

describe('LoggerUtils test suite', () => {

  it('Should expect localLogger variable not null and instants of ApplicationLogger', () => {
    expect(logger).not.null;
    expect(logger).instanceOf(ApplicationLogger);
  });

  it('Should expect the same object after calling the function createLocalLogger multiple times', () => {
    const testLocalLogger = createLocalLogger(APPLICATION_NAME);
    expect(testLocalLogger).not.null;
    expect(testLocalLogger).instanceOf(ApplicationLogger);
    expect(testLocalLogger).to.deep.equal(logger);
  });
  
});
