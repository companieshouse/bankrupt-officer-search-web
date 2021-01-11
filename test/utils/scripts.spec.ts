import { expect } from 'chai';

import { mockBankruptOfficer } from "../__mocks__/utils.mock";

import { 
  dateFormatting, 
  firstCharacterUpperCase, 
  formattingOfficersInfo 
} from "../../src/utils/script/formatting";

describe('Formatting test suite', () => {

  it('Test function dateFormatting', () => {
    const shouldbe = "02/01/1940";
    expect(dateFormatting("")).equal("");
    expect(dateFormatting(undefined)).equal(undefined);
    expect(dateFormatting(mockBankruptOfficer.dateOfBirth)).equal(shouldbe);
  });

  it('Test function firstCharacterUpperCase', () => {
    expect(firstCharacterUpperCase("")).equal("");
    expect(firstCharacterUpperCase(undefined)).equal(undefined);
    expect(firstCharacterUpperCase(mockBankruptOfficer.addressLine2)).equal("456 second lane");
    expect(firstCharacterUpperCase(mockBankruptOfficer.addressLine3)).equal("789 third lane");
    expect(firstCharacterUpperCase(mockBankruptOfficer.county)).equal("Some county");
  });

  it('Test function formattingOfficersInfo', () => {
    const officer = formattingOfficersInfo([mockBankruptOfficer])[0];
    expect(officer.addressLine2).equal("456 second lane");
    expect(officer.addressLine3).equal("789 third lane");
    expect(officer.county).equal("Some county");
  });
    
});