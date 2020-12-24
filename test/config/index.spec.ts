import { expect } from "chai";
import { getEnvironmentValue, CDN_HOST } from "../../src/config";

describe('Config test suite', () => {
    
  it('should check if CDN_HOST env is returned correctly and fetched from user environment', () => {
    const test_cdn_host = getEnvironmentValue("CDN_HOST");
    expect(test_cdn_host).is.not.null;
    expect(test_cdn_host).to.equal(CDN_HOST);
  });

  it('should thrown an error when passing anyNonExistingEnv to getEnvironmentValue()', () => {
    const fakeEnv = 'anyNonExistingEnv';
    expect(() => getEnvironmentValue(fakeEnv)).to.throw(`Please set the environment variable "${fakeEnv}"`);
  });

});
