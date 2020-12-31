/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

import { logger } from '../../utils';
import { 
  ORACLE_QUERY_API_URL, 
  ORACLE_QUERY_API_ENDPOINT 
} from '../../config';
import {  
  BankruptOfficerSearchQuery, 
  BankruptOfficerSearchResults,
  FullBankruptOfficer
} from '../../types';

const QUERY_API_URL = `${ORACLE_QUERY_API_URL}${ORACLE_QUERY_API_ENDPOINT}`;

export const fetchBankruptOfficer = async (ephemeralKey: string): Promise<any> => {
  try {
    return axios.get<FullBankruptOfficer>(`${QUERY_API_URL}${ephemeralKey}`)
      .then( (res) => {
        return { status: res.status, data: res.data };
      })
      .catch( (e) => {
        return failedExecHttpRequest(e, 404);
      });
  } catch (e) {
    return failedExecHttpRequest(e, 500);
  }
};

export const fetchBankruptOfficers = async (query: BankruptOfficerSearchQuery): Promise<any> => {
  try {
    return axios.post<BankruptOfficerSearchResults>(QUERY_API_URL, query)
      .then( (res) => {
        return { status: res.status, data: res.data };
      })
      .catch( (e) => {
        return failedExecHttpRequest(e, 404);
      });
  } catch (e) {
    return failedExecHttpRequest(e, 500);
  }
};

export const failedExecHttpRequest = (e: any, statusCode: number) => {
  if(statusCode !== 404) logger.error(`${e}`);

  return {
    status: e?.statusCode || statusCode,
    error: e?.response?.body || { message: "failed to execute http request" }
  };
};
