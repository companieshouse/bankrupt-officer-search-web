export const getEnvironmentValue = (key: string): string => {
  const value: string = process.env[key] || "";

  if (!value) {
    throw new Error(`Please set the environment variable "${key}"`);
  }

  return value;
};

export const CDN_HOST = getEnvironmentValue("CDN_HOST");
export const PIWIK_URL = getEnvironmentValue("PIWIK_URL");
export const PIWIK_SITE_ID = getEnvironmentValue("PIWIK_SITE_ID");
export const COOKIE_SECRET = getEnvironmentValue("COOKIE_SECRET");
export const CACHE_SERVER = getEnvironmentValue("CACHE_SERVER");
export const CHS_URL = getEnvironmentValue("CHS_URL");
export const API_KEY = getEnvironmentValue("CHS_API_KEY");
export const COOKIE_DOMAIN = getEnvironmentValue("COOKIE_DOMAIN");
export const INTERNAL_API_URL = getEnvironmentValue("INTERNAL_API_URL");

export const APPLICATION_NAME = "bankrupt-officer-search-web";
export const SCOTTISH_BANKRUPT_OFFICER = "/admin/officer-search/scottish-bankrupt-officer";
export const SCOTTISH_BANKRUPT_OFFICER_DETAILS = "/admin/officer-search/scottish-bankrupt-officer/:id";

export const PERMISSIONS_PATH = SCOTTISH_BANKRUPT_OFFICER;