import express from "express";
import * as nunjucks from "nunjucks";
import * as path from "path";
import cookieParser from "cookie-parser";
import Redis from "ioredis";

import { 
  SessionStore, 
  SessionMiddleware, 
  CookieConfig 
} from "@companieshouse/node-session-handler";

import { 
  createLoggerMiddleware 
} from "@companieshouse/structured-logging-node";

import { 
  serverErrorHandler,
  authentication
} from "./controller";

import router from "./routers";

import {
  PIWIK_SITE_ID,
  PIWIK_URL,
  COOKIE_SECRET,
  COOKIE_DOMAIN,
  CACHE_SERVER,
  APPLICATION_NAME,
  SCOTTISH_BANKRUPT_OFFICER,
  SCOTTISH_BANKRUPT_OFFICER_DETAILS
} from "./config";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// where nunjucks templates should resolve to
const viewPath = path.join(__dirname, "views");

// set up the template engine
const env = nunjucks.configure([
  viewPath,
  "node_modules/govuk-frontend/",
  "node_modules/govuk-frontend/components",
], {
  autoescape: true,
  express: app,
});

const cookieConfig: CookieConfig = { cookieName: "__SID", cookieSecret: COOKIE_SECRET, cookieDomain: COOKIE_DOMAIN };
const sessionStore = new SessionStore(new Redis(`redis://${CACHE_SERVER}`));

app.use([SCOTTISH_BANKRUPT_OFFICER, SCOTTISH_BANKRUPT_OFFICER_DETAILS], createLoggerMiddleware(APPLICATION_NAME));
app.use([SCOTTISH_BANKRUPT_OFFICER, SCOTTISH_BANKRUPT_OFFICER_DETAILS], SessionMiddleware(cookieConfig, sessionStore));
app.use([SCOTTISH_BANKRUPT_OFFICER, SCOTTISH_BANKRUPT_OFFICER_DETAILS], authentication);

app.set("views", viewPath);
app.set("view engine", "html");

// add global variables to all templates
env.addGlobal("PIWIK_URL", PIWIK_URL);
env.addGlobal("PIWIK_SITE_ID", PIWIK_SITE_ID);

// serve static assets in development. this will not execute in production.
if (process.env.NODE_ENV === "development") {
  app.use("/static", express.static("dist/static"));
  env.addGlobal("CSS_URL", "/static/app.css");
}
// apply our default router to /
app.use("/", router);

// set up error handler
app.use(serverErrorHandler);

export default app;
