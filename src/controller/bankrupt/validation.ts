
import moment from 'moment';
import { dateOfBirthFormatting } from 'utils/script/formatting';
import { format } from 'path';



const now = moment();

export function DatePicker_IsValidDate(input): boolean | undefined {
  const bits = input.split('-');
  const d = new Date(bits[0], bits[1] - 1, bits[2]);
  
  return d.getFullYear() == bits[0] && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]);
}

export function isValidDate(input: moment.MomentInput): boolean | undefined {

  if(input !== ''){
    console.log("input is : " + input);
    return  moment(input, 'YYYY-MM-DD', true).isValid();
  }
}
  
export function checkFromDob(fromDateOfBirth: string): boolean | undefined{
 
  if(fromDateOfBirth !== ''){
    if(fromDateOfBirth > now.format('YYYY-MM-DD' ) || isValidDate(fromDateOfBirth) === false ){
      return true;
    }
    isValidDate(fromDateOfBirth);
  }
}
export function checkToDob(fromDateOfBirth: string, toDateOfBirth: string) : boolean | undefined{
  if(toDateOfBirth !== ''){
    if(toDateOfBirth > now.format('YYYY-MM-DD' ) || fromDateOfBirth > toDateOfBirth || isValidDate(toDateOfBirth) === false){
      return true;
    }
    isValidDate(toDateOfBirth);
  }
}