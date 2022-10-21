import { BankruptOfficerSearchFilters } from "../types";

export class Validation {
  errorMessages: Set<string>;
  fieldsWithErrors: object;
  filters: BankruptOfficerSearchFilters;

  constructor(filters: BankruptOfficerSearchFilters) {
    this.errorMessages = new Set();
    this.fieldsWithErrors = {};
    this.filters = filters;
  }

  validate = () => {
    // Validate at least 1 dob is filled

    // Do dob validation (for both dob fields)

    // Do text field validation
    this.validateTextFields("forename1", "surname", "alias", "postcode");
    return {
      errorMessages: Array.from(this.errorMessages),
      fieldsWithErrors: this.fieldsWithErrors
    }
  }

  validateTextFields = (...textFieldsToValidate: string[]) => {
    for (const textField of textFieldsToValidate) {
      const text = this.filters[textField];
      if (text && !this.isCharacterSet2(text)) {
        this.errorMessages.add("Enter valid characters");
        this.fieldsWithErrors[textField] = true;
      }
    }
  }

  isCharacterSet2 = (text: string): boolean => {
    const charSet2 = new RegExp(/^[ÀÁÂÃÄÅĀĂĄǺaàáâãäåāăąǻÆǼæǽBbCcçćĉċčDÞĎĐdþďđEÈÉÊËĒĔĖĘĚeèéêëēĕėęěFfGĜĞĠĢgĝğġģHĤĦhĥħIÌÍÎÏĨĪĬĮİiìíîïĩīĭįJĴjĵKĶkķLĹĻĽĿŁlĺļľŀłMmNÑŃŅŇŊnñńņňŋOÒÓÔÕÖØŌŎŐǾoòóôõöøōŏőǿŒœPpQqRŔŖŘrŕŗřSŚŜŞŠsśŝşšTŢŤŦtţťŧUÙÚÛÜŨŪŬŮŰŲuùúûüũūŭůűųVvWŴẀẂẄwŵẁẃẅXxYỲÝŶŸyỳýŷÿZŹŻŽzźżž&@£$€¥*=#%+‘ʼ'()\/\[\]{}<>!«»?“ˮ\"0123456789.,:;\–\-   \r\n]+$/);
    return charSet2.test(text);
  }
}
