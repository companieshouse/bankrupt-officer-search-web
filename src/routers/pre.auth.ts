import { SCOTTISH_BANKRUPT_OFFICER } from "../config";
import { Router } from "express";

import { healthcheckEndpoint } from '../controller/healthcheck';

const router = Router();

router.get(`${SCOTTISH_BANKRUPT_OFFICER}/healthcheck`, healthcheckEndpoint);

export default router;