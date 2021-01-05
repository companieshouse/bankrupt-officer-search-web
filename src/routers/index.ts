import { Router } from "express";

import { 
    getSearchPage, 
    postSearchPage, 
    bankruptOfficer, 
    notFoundErrorHandler 
} from "../controller";

import { 
    SCOTTISH_BANKRUPT_OFFICER, 
    SCOTTISH_BANKRUPT_OFFICER_DETAILS 
} from "../config";

const router = Router();

router.get(SCOTTISH_BANKRUPT_OFFICER_DETAILS, bankruptOfficer);
router.get(SCOTTISH_BANKRUPT_OFFICER, getSearchPage);

router.post(SCOTTISH_BANKRUPT_OFFICER, postSearchPage);

router.all("/*", notFoundErrorHandler);

export default router;
