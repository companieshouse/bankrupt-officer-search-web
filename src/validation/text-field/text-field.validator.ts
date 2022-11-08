import { INVALID_CHARACTER_ERROR_MESSAGE } from "../../config";
import { ValidationError } from "../../controller/bankrupt/ValidationError";
import { BankruptOfficerSearchFilters } from "../../types";

export const validateTextFields = (filters: BankruptOfficerSearchFilters): ValidationError[] => {
  const textFieldsToValidate = ["forename1", "surname", "alias", "postcode"];
  const textFieldErrors: ValidationError[] = [];
  for (const textField of textFieldsToValidate) {
    const text = filters[textField];
    if (text && !isCharacterSet2(text)) {
      textFieldErrors.push(new ValidationError(textField, INVALID_CHARACTER_ERROR_MESSAGE));
    }
  }
  return textFieldErrors;
}

const isCharacterSet2 = (text: string): boolean => {
  const charSet2 = new RegExp(/^[AÀÁÂÃÄÅĀĂĄǺaàáâãäåāăąǻÆǼæǽBbCcçćĉċčDÞĎĐdþďđEÈÉÊËĒĔĖĘĚeèéêëēĕėęěFfGĜĞĠĢgĝğġģHĤĦhĥħIÌÍÎÏĨĪĬĮİiìíîïĩīĭįJĴjĵKĶkķLĹĻĽĿŁlĺļľŀłMmNÑŃŅŇŊnñńņňŋOÒÓÔÕÖØŌŎŐǾoòóôõöøōŏőǿŒœPpQqRŔŖŘrŕŗřSŚŜŞŠsśŝşšTŢŤŦtţťŧUÙÚÛÜŨŪŬŮŰŲuùúûüũūŭůűųVvWŴẀẂẄwŵẁẃẅXxYỲÝŶŸyỳýŷÿZŹŻŽzźżž&@£$€¥*=#%+‘ʼ'()\/\[\]{}<>!«»?“ˮ\"0123456789.,:;\–\-   \r\n]+$/);
  return charSet2.test(text);
}
