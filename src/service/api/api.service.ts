import { logger, userSession} from '../../utils';
import { INTERNAL_API_URL } from '../../config';
import { BankruptOfficerSearchQuery } from '../../types';
import { createPrivateApiClient } from "private-api-sdk-node";

export const createOAuthApiClient = (session) => {
  const oAuth: string = userSession.getAccessToken(session);
  return createPrivateApiClient(undefined, oAuth, INTERNAL_API_URL);
}

export const fetchBankruptOfficer = async (session, ephemeralKey: string): Promise<any> => {
  const client = createOAuthApiClient(session);
  return await client.badosService.getBankruptOfficer(ephemeralKey)
    .catch( e => {
      logger.error(JSON.stringify(e));
      return e;
    });
};
export const fetchBankruptOfficers = async (session, query: BankruptOfficerSearchQuery): Promise<any> => {
  const client = createOAuthApiClient(session);
  return await client.badosService.getBankruptOfficers(query)
    .catch( e => {
      logger.error(JSON.stringify(e));
      return e;
    });
};