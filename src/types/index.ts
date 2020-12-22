export interface Address {
  addressLine1?: string
  addressLine2?: string
  addressLine3?: string
  town?: string
  county?: string
  postcode?: string
}
interface BankruptOfficer extends Address {
  ephemeralKey: string
  forename1?: string
  forename2?: string
  surname?: string
  dateOfBirth?: string
}
export interface FullBankruptOfficer extends BankruptOfficer {
  caseReference?: string
  caseType?: string
  bankruptcyType?: string
  startDate?: string
  debtorDischargeDate?: string
  trusteeDischargeDate?: string
}
export interface BankruptOfficerSearchQuery {
  startIndex: number
  itemsPerPage: number
  filters: BankruptOfficerSearchFilters
}

export interface BankruptOfficerSearchFilters {
  forename1?: string
  surname?: string
  dateOfBirth?: string
  postcode?: string
}

export interface BankruptOfficerSearchResults {
  itemsPerPage: number
  startIndex: number
  totalResults: number
  items: BankruptOfficer[]
}
