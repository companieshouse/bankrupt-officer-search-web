import { expect } from 'chai';
import { isValidDate, toDobInvalid, fromDobInvalid} from '../../src/utils/validation/validation';


describe('Validation test suite', () => {  
  describe('validation for isValidDate method return boolean if conditions are met', () => {

    it('should return false when non existant fromDate is used', function () {
      const fromDate = "1990-02-31";
      expect((isValidDate(fromDate))).to.be.false;
    });

    it('should return true when valid fromDob used', function () {
      const fromDate = "1980-01-01";
      expect((isValidDate(fromDate))).to.be.true;
    });

    ['1980-01-01', '1980-1-1', '1980-01-1', '1980-1-01'].forEach((date) => {
      it(`should return true for valid date ${date}`, function () {
        expect(isValidDate(date)).to.be.true;
      });
    });

    ['1980-02-30', '1980-13-01', '1980-00-10', '1980-01-32', '1980/01/01', '19800101', 'abcd-01-01'].forEach((date) => {
      it(`should return false for invalid date ${date}`, function () {
        expect(isValidDate(date)).to.be.false;
      });
    });

    it('should return undefined for an empty string', function () {
      expect(isValidDate('')).to.be.undefined;
    });

  });
  describe('validation for fromDobInvalid method return boolean if conditions are met', () => {
    it('should return true when future fromDob is used', function () {
      const fromDate = "2090-01-01";
      expect((fromDobInvalid(fromDate))).to.be.true;
    });

    it('should return true when invalid fromDob is used', function () {
      const fromDate = "sdsd-01-01";
      expect((fromDobInvalid(fromDate))).to.be.true;
            
    });
  });
    
  describe('validation for toDobInvalid method return boolean if conditions are met', () => {
    it('should return true when non existant toDate is used', function () {
      const toDate = "1990-02-31";
      const fromDate = "";
      expect((toDobInvalid(toDate, fromDate))).to.be.true;
    
    });

    it('should return true when future toDate is used', function () {
      const toDate = "2080-01-01";
      const fromDate = "";
      expect((toDobInvalid(toDate, fromDate))).to.be.true;
            
    });

    it('should return true when from date is greater than todate ', function () {
      const toDate = "1970-01-01";
      const fromDate = "1980-01-01";
      expect((toDobInvalid(toDate, fromDate))).to.be.true;
            
    });

    it('should return true when a future toDate is used ', function () {
      const toDate = "2090-01-01";
      const fromDate = "";
      expect((toDobInvalid(toDate, fromDate))).to.be.true;
           
    });

    it('should return false when a valid toDate is used ', function () {
      const toDate = "1990-02-01";
      const fromDate = "1980-01-01";
      expect((toDobInvalid(toDate, fromDate))).to.be.false;       
    });});});