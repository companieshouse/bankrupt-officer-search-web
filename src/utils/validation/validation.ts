
import moment from 'moment';

const now = moment();

export function isValidDate(input: moment.MomentInput): boolean | undefined {
  const minDate = moment.utc("0001-01-01");
  if(input !== ''){
    return moment(input, 'YYYY-M-D', true).isValid() && (moment(input, 'YYYY-M-D').isAfter(minDate));
  }
}
  
export function fromDobInvalid(fromDateOfBirth: string): boolean | undefined{
 
  if(fromDateOfBirth !== ''){
    if(fromDateOfBirth > now.format('YYYY-MM-DD' ) || isValidDate(fromDateOfBirth) === false ){
      return true;
    }
    return false;
  }
}
export function toDobInvalid(toDateOfBirth: string,fromDateOfBirth: string) : boolean | undefined{
  if(toDateOfBirth !== ''){
    if(toDateOfBirth > now.format('YYYY-MM-DD' ) || fromDateOfBirth > toDateOfBirth || isValidDate(toDateOfBirth) === false){
      return true;
    }
    return false;
  }
}