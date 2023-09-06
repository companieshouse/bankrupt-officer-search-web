import { createApiClient } from "@companieshouse/api-sdk-node";
import { 
  BankruptOfficerSearchFilters, 
  BankruptOfficerSearchQuery,
  FullBankruptOfficer
} from "../../src/types";

export const PAGE_NOT_FOUND = "page not found";
export const LINK_EXPIRED = "This link has expired";
export const SERVER_ERROR = "Sorry, there is a problem with the service";
export const EPHEMERALKEY = "B687FDB8F0E171DBE05400144FFBDD12";
export const mockApiClient = createApiClient(undefined, "OAUTH_TOKEN", "TEST_URL");

export const FAKE_URL = { 
  path: "tryAgainNoLuck" 
};

export const mockFilters: BankruptOfficerSearchFilters = { 
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: 'Kermit', 
  surname: 'Frog', 
  postcode: '' 
};

export const mockFiltersDOBRanges: BankruptOfficerSearchFilters = {
  "from-dob-dd": '02',
  "from-dob-mm": '01',
  "from-dob-yyyy": '1940', 
  "to-dob-dd": '02',
  "to-dob-mm": '01',
  "to-dob-yyyy": '1950',
  fromDateOfBirth: '1940-01-02', 
  toDateOfBirth: '1950-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersNoOfficerDOBRanges: BankruptOfficerSearchFilters = {
  "from-dob-dd": '02',
  "from-dob-mm": '01',
  "from-dob-yyyy": '1980', 
  "to-dob-dd": '02',
  "to-dob-mm": '01',
  "to-dob-yyyy": '1985',
  fromDateOfBirth: '1980-01-02', 
  toDateOfBirth: '1985-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersFromDOBRanges: BankruptOfficerSearchFilters = {
  "from-dob-dd": '02',
  "from-dob-mm": '01',
  "from-dob-yyyy": '1940',
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '1940-01-02', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersToDOBRanges: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '02',
  "to-dob-mm": '01',
  "to-dob-yyyy": '1950',
  fromDateOfBirth: '', 
  toDateOfBirth: '1950-01-02',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersInvalidCharDDFromDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '!!!',
  "from-dob-mm": '01',
  "from-dob-yyyy": '1970',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersInvalidCharMMFromDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '12',
  "from-dob-mm": 'letters',
  "from-dob-yyyy": '1970',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersInvalidCharYYYYFromDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '12',
  "from-dob-mm": '04',
  "from-dob-yyyy": '!!&*(@462',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidCharDDToDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": 'letters',
  "to-dob-mm": '01',
  "to-dob-yyyy": '2020',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidCharMMToDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '01',
  "to-dob-mm": 'r!random',
  "to-dob-yyyy": '2020',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersInvalidCharYYYYToDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '01',
  "to-dob-mm": '02',
  "to-dob-yyyy": '!£$£@$@',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersInvalidToandFromDOB: BankruptOfficerSearchFilters = {
  "from-dob-dd": 'letters',
  "from-dob-mm": 'and@£$£@',
  "from-dob-yyyy": 'banned: ',  
  "to-dob-dd": 'letters',
  "to-dob-mm": '01',
  "to-dob-yyyy": '£$',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersToDobBeforeFrom: BankruptOfficerSearchFilters = {
  "from-dob-dd": '12',
  "from-dob-mm": '01',
  "from-dob-yyyy": '1990',  
  "to-dob-dd": '12',
  "to-dob-mm": '01',
  "to-dob-yyyy": '1970',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersFutureFromDate: BankruptOfficerSearchFilters = {
  "from-dob-dd": '12',
  "from-dob-mm": '01',
  "from-dob-yyyy": '2090',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersFutureToDate: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '01',
  "to-dob-mm": '02',
  "to-dob-yyyy": '2070',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};



export const mockFiltersNonExistantFromDate: BankruptOfficerSearchFilters = {
  "from-dob-dd": '31',
  "from-dob-mm": '02',
  "from-dob-yyyy": '1970',  
  "to-dob-dd": '',
  "to-dob-mm": '',
  "to-dob-yyyy": '',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};


export const mockFiltersNonExistantToDate: BankruptOfficerSearchFilters = {
  "from-dob-dd": '',
  "from-dob-mm": '',
  "from-dob-yyyy": '',  
  "to-dob-dd": '31',
  "to-dob-mm": '02',
  "to-dob-yyyy": '1960',
  fromDateOfBirth: '', 
  toDateOfBirth: '',
  forename1: '', 
  surname: '', 
  postcode: '' 
};

export const mockFiltersInvalidChars: BankruptOfficerSearchFilters = {
  "to-dob-dd": '02',
  "to-dob-mm": '01',
  "to-dob-yyyy": '1950',
  surname: 'filter_with_underscore', 
};

export const mockSearchQuery: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFilters
};

export const mockSearchQueryInvalidChars: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidChars
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

export const mockSearchQueryInvalidDDFromDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharDDFromDOB
};
export const mockSearchQueryInvalidMMFromDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharMMFromDOB
};

export const mockSearchQueryInvalidYYYYFromDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharYYYYFromDOB
};

export const mockSearchQueryInvalidDDToDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharDDToDOB
};

export const mockSearchQueryInvalidMMToDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharMMToDOB
};

export const mockSearchQueryInvalidYYYYToDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidCharYYYYToDOB
};

export const mockSearchQueryInvalidToAndFromDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersInvalidToandFromDOB
};
export const mockSearchQueryToDobBeforeFrom: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersToDobBeforeFrom
};

export const mockSearchQueryFutureFromDate: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersFutureFromDate
};

export const mockSearchQueryFutureToDate: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersFutureToDate
};

export const mockSearchQueryNonExistantFromDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersNonExistantFromDate
};


export const mockSearchQueryNonExistantToDob: BankruptOfficerSearchQuery = { 
  startIndex: 0, 
  itemsPerPage: 10, 
  filters: mockFiltersNonExistantToDate
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
  items: []
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

export const errorStatusCode: Array<number> = [401, 404, 500];

export type mockResponseTypes = {[key:string]: {httpStatusCode: number, resource?: unknown}};

export const mockPostResponse: mockResponseTypes = { 
  "200": { httpStatusCode: 200, resource: BANKRUPT_OFFICER_SEARCH_PAGE_RESULTS },
  "401": { httpStatusCode: 401 },
  "404": { httpStatusCode: 404 },
  "500": { httpStatusCode: 500 }
};

export const mockGetResponse: mockResponseTypes = { 
  "200": { httpStatusCode: 200, resource: mockFullBankruptOfficer },
  "401": { httpStatusCode: 401 },
  "404": { httpStatusCode: 404 },
  "500": { httpStatusCode: 500 }
};

