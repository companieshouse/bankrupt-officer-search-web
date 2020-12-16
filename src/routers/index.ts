import { Router } from "express";

import { 
    bankrupt, 
    bankruptOfficer, 
    notFoundErrorHandler 
} from "../controller";

import { 
    SCOTTISH_BANKRUPT_OFFICER, 
    SCOTTISH_BANKRUPT_OFFICER_DETAILS 
} from "../config";

const router = Router();

router.get(SCOTTISH_BANKRUPT_OFFICER_DETAILS, bankruptOfficer);
router.get(SCOTTISH_BANKRUPT_OFFICER, bankrupt);

router.all("/*", notFoundErrorHandler);

export default router;
