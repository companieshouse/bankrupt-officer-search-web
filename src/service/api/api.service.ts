import { Session } from '@companieshouse/node-session-handler';
import { Resource } from '@companieshouse/api-sdk-node';
import { createPrivateApiClient } from "private-api-sdk-node";
import PrivateApiClient from 'private-api-sdk-node/dist/client';

import { logger, userSession } from '../../utils';
import { INTERNAL_API_URL } from '../../config';
import { BankruptOfficerSearchQuery, BankruptOfficerSearchResults, FullBankruptOfficer } from '../../types';

export const createOAuthApiClient = (session: Session | undefined): PrivateApiClient => {
  const oAuth: string = userSession.getAccessToken(session);
  return createPrivateApiClient(undefined, oAuth, INTERNAL_API_URL);
};

export const fetchBankruptOfficer = async (session: Session | undefined, 
  ephemeralKey: string): Promise<Resource<FullBankruptOfficer>> => {
  const client = createOAuthApiClient(session);
  return await client.badosService.getBankruptOfficer(ephemeralKey)
    .catch((e) => {
      logger.error(e);
      return e;
    });
};

export const fetchBankruptOfficers = async (session: Session | undefined, 
  query: BankruptOfficerSearchQuery): Promise<Resource<BankruptOfficerSearchResults>> => {
  const client = createOAuthApiClient(session);
  return await client.badosService.getBankruptOfficers(query) 
    .catch((e) => {
      console.log('>>>>>>>>error: fetchBankruptOfficers');
      console.log(e);
      logger.error(e);
      if (e.httpStatusCode === 404) { // In case "404 Not found" throws an error
        return {
          httpStatusCode: e.httpStatusCode,
          resource: {
            itemsPerPage: 0,
            startIndex: 0,
            totalResults: 0,
            items: []
          }
        };
      }
      return e;
    });
};