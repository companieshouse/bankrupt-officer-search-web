import { createPrivateApiClient } from "private-api-sdk-node";
import { 
  BankruptOfficerSearchFilters, 
  BankruptOfficerSearchQuery,
  FullBankruptOfficer
} from "../../src/types";

export const PAGE_NOT_FOUND = "page not found";
export const LINK_EXPIRED = "This link has expired";
export const SERVER_ERROR = "Sorry, there is a problem with the service";
export const EPHEMERALKEY = "B687FDB8F0E171DBE05400144FFBDD12";
export const mockApiClient = createPrivateApiClient(undefined, "OAUTH_TOKEN", "TEST_URL");

export const FAKE_URL = { 
  path: "tryAgainNoLuck" 
};

export const mockFilters: BankruptOfficerSearchFilters = { 
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: 'Kermit', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersDOBRanges: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '1940-01-01', 
  toDateOfBirth: '1910-01-01',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidFromDates: BankruptOfficerSearchFilters = {
  fromDateOfBirth: 'incorrect-date-02', 
  toDateOfBirth: '1950-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidToDates: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '', 
  toDateOfBirth: 'incorrect-date-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidBothDates: BankruptOfficerSearchFilters = {
  fromDateOfBirth: 'dodgydate', 
  toDateOfBirth: 'incorrect-date-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersPreviousToDate: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '1950-01-02',
  toDateOfBirth: '1960-01-01',
  forename1: '', 
  surname: '', 
  postcode: '' 
};



export const mockFiltersNoOfficerDOBRanges: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '1980-01-02', 
  toDateOfBirth: '1985-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersFromDOBRanges: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '1940-01-02', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersToDOBRanges: BankruptOfficerSearchFilters = {
  fromDateOfBirth: '', 
  toDateOfBirth: '1950-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockSearchQuery: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFilters
};

export const mockSearchQueryDOBNoOfficer: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersNoOfficerDOBRanges
};

export const mockSearchQueryDOBRanges: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersDOBRanges
};

export const mockSearchQueryFromDOB: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersFromDOBRanges
};

export const mockSearchQueryToDOB: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersToDOBRanges
};

export const mockSearchQueryInvalidFromDOB: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidFromDates
};


export const mockFullBankruptOfficer: FullBankruptOfficer = {
  ephemeralKey: EPHEMERALKEY,
  forename1: "KERMIT",
  forename2: "THE",
  alias: "ALIAS",
  surname: "FROG",
  dateOfBirth: "1950-05-18",
  addressLine1: "123 FAKE LANE",
  addressLine2: "456 SECOND LANE",
  addressLine3: "789 THIRD LANE",
  town: "MUPPET TOWN",
  county: "SOME COUNTY",
  postcode: "MP12 3TW",
  caseType: "TRUST DEED",
  caseReference: "CASE REFERENCE",
  bankruptcyType: "BANKRUPTCY TYPE",
  startDate: "2000-01-02",
  debtorDischargeDate: "2030-01-02",
  trusteeDischargeDate: "2030-01-02"
};

export const BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS = { 
  itemsPerPage: 1, 
  startIndex: 0, 
  totalResults: 1, 
  items: [mockFullBankruptOfficer]
};

export const BANKRUPT_OFFICER_SEARCH_NO_PAGE_RESULTS = { 
  itemsPerPage: 0, 
  startIndex: 0, 
  totalResults: 0, 
  items: [], 
};

export const BANKRUPT_OFFICER_SEARCH_ERROR = { 
  itemsPerPage: 0, 
  startIndex: 0, 
  totalResults: 0, 

 
};

export const PAGINATION_RESULTS = {
  pagination: {
    items: [
      {
        current: true,
        href: "/admin/officer-search/scottish-bankrupt-officer?page=1",
        number: 1
      }
    ]
  }
};

export const errorStatusCode = [401, 404, 500];

export const mockPostResponse = { 
  "200": { httpStatusCode: 200, resource: BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS },
  "401": { httpStatusCode: 401 },
  "404": { httpStatusCode: 404 },
  "500": { httpStatusCode: 500 }
};

export const mockGetResponse = { 
  "200": { httpStatusCode: 200, resource: mockFullBankruptOfficer },
  "401": { httpStatusCode: 401 },
  "404": { httpStatusCode: 404 },
  "500": { httpStatusCode: 500 }
};