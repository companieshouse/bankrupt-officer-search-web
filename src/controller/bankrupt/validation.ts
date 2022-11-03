
import moment from 'moment';

const now = moment();

export function isValidDate(input: moment.MomentInput): boolean | undefined {

  if(input !== ''){
    console.log("input is : " + input);
    return  moment(input, 'YYYY-MM-DD', true).isValid();
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