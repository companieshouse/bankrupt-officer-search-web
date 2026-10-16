
import moment from 'moment';

const now = moment();

export function isValidDate(input: moment.MomentInput): boolean | undefined {
  const minDate = moment.utc("0001-01-01");
  if(input !== ''){
    // moment >= 2.30 strict mode no longer accepts zero-padded values for the 'M'/'D' tokens
    const formats = ['YYYY-M-D', 'YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-DD'];
    const parsedDate = moment(input, formats, true);
    return parsedDate.isValid() && parsedDate.isAfter(minDate);
  }
}
  
export function fromDobInvalid(fromDateOfBirth = ''): boolean | undefined{
 
  if(fromDateOfBirth !== ''){
    if(fromDateOfBirth > now.format('YYYY-MM-DD' ) || isValidDate(fromDateOfBirth) === false ){
      return true;
    }
    return false;
  }
}
export function toDobInvalid(toDateOfBirth = '',fromDateOfBirth = '') : boolean | undefined{
  if(toDateOfBirth !== ''){
    if(toDateOfBirth > now.format('YYYY-MM-DD' ) || fromDateOfBirth > toDateOfBirth || isValidDate(toDateOfBirth) === false){
      return true;
    }
    return false;
  }
}