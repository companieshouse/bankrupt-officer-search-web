import { Session } from '@companieshouse/node-session-handler';
import { Resource, createApiClient } from '@companieshouse/api-sdk-node';
import ApiClient from '@companieshouse/api-sdk-node/dist/client';

import { logger, userSession } from '../../utils';
import { INTERNAL_API_URL } from '../../config';
import { BankruptOfficerSearchQuery, BankruptOfficerSearchResults, FullBankruptOfficer } from '../../types';

export const createOAuthApiClient = (session: Session | undefined): ApiClient => {
  const oAuth: string = userSession.getAccessToken(session);
  return createApiClient(undefined, oAuth, INTERNAL_API_URL);
};

export const fetchBankruptOfficer = async (session: Session | undefined, 
  ephemeralKey: string): Promise<Resource<FullBankruptOfficer>> => {
  const client = createOAuthApiClient(session);
  return await client.BankruptOfficer.getBankruptOfficer(ephemeralKey)
    .catch(e => {
      logger.error(e);
      return e;
    });
};

export const fetchBankruptOfficers = async (session: Session | undefined, 
  query: BankruptOfficerSearchQuery): Promise<Resource<BankruptOfficerSearchResults>> => {
  const client = createOAuthApiClient(session);
  return await client.BankruptOfficer.getBankruptOfficers(query)
    .catch(e => {
      logger.error(e);
      return e;
    });
};