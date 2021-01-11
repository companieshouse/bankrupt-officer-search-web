import { BankruptOfficer } from "types";

export const dateFormatting = (date: string | undefined): string | undefined => {
  return (date) ? date.split("-").reverse().join("/") : date;
};

export const firstCharacterUpperCase = (chars: string | undefined): string | undefined => {
  return (chars) ? chars.charAt(0).toUpperCase() + chars.substring(1).toLowerCase() : chars;
};

export const formattingOfficersInfo = (officersList: Array<BankruptOfficer>): Array<BankruptOfficer> => {
  const keysOfBankruptOfficer = ["forename1", "forename2", "surname", "addressLine1", "addressLine2", "addressLine3", "town", "county"];

  return officersList.map( officer => {
    keysOfBankruptOfficer.forEach( k => officer[k] = firstCharacterUpperCase(officer[k]) );
    officer.dateOfBirth = dateFormatting(officer.dateOfBirth);
    return officer;
  });
};
