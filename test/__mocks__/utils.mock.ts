import { 
  BankruptOfficerSearchFilters, 
  BankruptOfficerSearchQuery 
} from "../../src/types";

export const PAGE_NOT_FOUND = "page not found";
export const LINK_EXPIRED = "This link has expired";
export const SERVER_ERROR = "Sorry, there is a problem with the service";
export const EPHEMERALKEY = "B687FDB8F0E171DBE05400144FFBDD12";

export const FAKE_URL = { 
  path: "tryAgainNoLuck" 
};

export const mockFilters: BankruptOfficerSearchFilters = { 
  dateOfBirth: '', 
  forename1: 'Kermit', 
  surname: '', 
  postcode: '' 
};

export const mockSearchQuery: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFilters
};

export const BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS = { 
  itemsPerPage: 1, 
  startIndex: 0, 
  totalResults: 1, 
  items: [{ 
    ephemeralKey: "B6A94E743AD86973E05400144FFBDD12",
    forename1: "Kermit",
    forename2: "The",
    surname: "Frog",
    addressLine1: "123 Fake Lane",
    town: "Muppet Town",
    postcode: "MP12 3TW",
    dateOfBirth: "1940-01-01"
  }]
};

export const BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS = { 
  itemsPerPage: 0, 
  startIndex: 0, 
  totalResults: 0, 
  items: []
};

export const statusCode = {
  ok: 200,
  client_error: 404,
  server_error: 500
};

export const mockAxiosResponse = { 
  ok: {
    status: statusCode.ok,
    data: "ok"
  },  
  data_results: {
    status: statusCode.ok,
    data: BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS
  }, 
  no_data: {
    status: statusCode.client_error,
    data: null
  },
  client_error: {
    statusCode: statusCode.client_error,
    error: { message: "failed to execute http request" }
  },
  server_error: {
    statusCode: statusCode.server_error,
    error: { message: "failed to execute http request" }
  }
};
