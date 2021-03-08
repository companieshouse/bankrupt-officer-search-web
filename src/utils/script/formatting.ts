import moment from "moment";
import { FullBankruptOfficer } from "types";

export const firstCharacterUpperCase = (chars: string | undefined): string | undefined => {
  return (chars) ? chars.charAt(0).toUpperCase() + chars.substring(1).toLowerCase() : chars;
};

export const formattingOfficersInfo = (officersList: Array<FullBankruptOfficer>): Array<FullBankruptOfficer> => {
  const keysOfBankruptOfficer = ["forename1", "forename2", "alias", "surname", "addressLine1", "addressLine2", "addressLine3", "town", "county", "caseType", "bankruptcyType"];

  return officersList.map( officer => {
    keysOfBankruptOfficer.forEach( k => officer[k] = firstCharacterUpperCase(officer[k]) );
    formatDatesForDisplay(officer);
    return officer;
  });
};

function formatDatesForDisplay(officer: FullBankruptOfficer) {
  if (officer.dateOfBirth != null) {
    officer.dateOfBirth = moment(officer.dateOfBirth, 'DD-MM-YYY').format('L');
  }

  if (officer.startDate != null) {
    officer.startDate = moment(officer.startDate, 'DD-MM-YYY').format('D MMMM YYYY');
  }

  if (officer.debtorDischargeDate != null) {
    officer.debtorDischargeDate = moment(officer.debtorDischargeDate, 'DD-MM-YYY').format('D MMMM YYYY');
  }
  
  if (officer.trusteeDischargeDate != null) {
    officer.trusteeDischargeDate = moment(officer.trusteeDischargeDate, 'DD-MM-YYY').format('D MMMM YYYY');
  }
}

