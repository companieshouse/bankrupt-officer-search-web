import { expect } from 'chai';

import { mockFullBankruptOfficer } from "../__mocks__/utils.mock";

import { 
  firstCharacterUpperCase, 
  formatDateForDisplay,
  dateOfBirthFormatting,
  formattingOfficersInfo 
} from "../../src/utils/script/formatting";

describe('Formatting test suite', () => {

  it('Test function dateFormatting', () => {
    expect(dateOfBirthFormatting("")).equal("");
    expect(dateOfBirthFormatting(undefined)).equal(undefined);
    expect(dateOfBirthFormatting(mockFullBankruptOfficer.dateOfBirth)).equal("18/05/1950");
  });

  it('Test function formatDateForDisplay', () => {
    expect("").equal("");
    expect(formatDateForDisplay(undefined)).equal(undefined);
    expect(formatDateForDisplay(mockFullBankruptOfficer.startDate)).equal("2 January 2000");
    expect(formatDateForDisplay(mockFullBankruptOfficer.debtorDischargeDate)).equal("2 January 2030");
    expect(formatDateForDisplay(mockFullBankruptOfficer.trusteeDischargeDate)).equal("2 January 2030");
  });

  it('Test function firstCharacterUpperCase', () => {
    expect(firstCharacterUpperCase("")).equal("");
    expect(firstCharacterUpperCase(undefined)).equal(undefined);
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.forename1)).equal("Kermit");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.forename2)).equal("The");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.alias)).equal("Alias");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.surname)).equal("Frog");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.addressLine1)).equal("123 fake lane");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.addressLine2)).equal("456 second lane");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.addressLine3)).equal("789 third lane");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.town)).equal("Muppet town");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.county)).equal("Some county");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.caseType)).equal("Trust deed");
    expect(firstCharacterUpperCase(mockFullBankruptOfficer.bankruptcyType)).equal("Bankruptcy type");
  });

  it('Test function formattingOfficersInfo', () => {
    const officer = formattingOfficersInfo([mockFullBankruptOfficer])[0];
    expect(officer.forename1).equal("Kermit");
    expect(officer.forename2).equal("The");
    expect(officer.alias).equal("Alias");
    expect(officer.surname).equal("Frog");
    expect(officer.dateOfBirth).equal("18/05/1950");
    expect(officer.addressLine1).equal("123 fake lane");
    expect(officer.addressLine2).equal("456 second lane");
    expect(officer.addressLine3).equal("789 third lane");
    expect(officer.town).equal("Muppet town");
    expect(officer.county).equal("Some county");
    expect(officer.caseType).equal("Trust deed");
    expect(officer.bankruptcyType).equal("Bankruptcy type");
    expect(officer.startDate).equal("2 January 2000");
    expect(officer.debtorDischargeDate).equal("2 January 2030");
    expect(officer.trusteeDischargeDate).equal("2 January 2030");
  });
    
});