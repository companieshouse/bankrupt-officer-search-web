import moment from "moment";
import { FullBankruptOfficer } from "types";

const DISPLAY_DATE_FORMAT = "D MMMM YYYY";

export const dateOfBirthFormatting = (date: string | undefined): string | undefined => {
  return (date) ? date.split("-").reverse().join("/") : date;
};

export const formatDateForDisplay = (inputDate: string | undefined): string | undefined => {
  return (inputDate) ? moment(inputDate).format(DISPLAY_DATE_FORMAT) : inputDate;
};

export const firstCharacterUpperCase = (chars: string | undefined): string | undefined => {
  return (chars) ? chars.charAt(0).toUpperCase() + chars.substring(1).toLowerCase() : chars;
};

export const formattingOfficersInfo = (officersList: Array<FullBankruptOfficer>): Array<FullBankruptOfficer> => {
  const keysOfBankruptOfficer = ["forename1", "forename2", "alias", "surname", "addressLine1", "addressLine2", "addressLine3", "town", "county", "caseType", "bankruptcyType"];
  const dateToBeFormatted: string[] = ["debtorDischargeDate", "trusteeDischargeDate", "startDate"];

  return officersList.map( officer => {
    keysOfBankruptOfficer.forEach( k => officer[k] = firstCharacterUpperCase(officer[k]) );
    dateToBeFormatted.forEach( k => officer[k] = formatDateForDisplay(officer[k]) );
    officer.dateOfBirth = dateOfBirthFormatting(officer.dateOfBirth);
    return officer as FullBankruptOfficer;
  });
};