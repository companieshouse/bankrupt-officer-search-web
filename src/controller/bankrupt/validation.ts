
import moment from 'moment';



const now = moment();


export function isValidDate(input: moment.MomentInput): boolean | undefined {
  if(input !== ''){
    console.log("input is : " + input);
    return  moment(input, 'YYYY-MM-DD', true).isValid();
  }
}
  
export function checkFromDob(fromDateOfBirth: string): boolean | undefined{
  if(fromDateOfBirth !== ''){
    if(fromDateOfBirth > now.format('YYYY-MM-DD' )){
      return true;
    }
  }
}
  
  
export function checkToDob(fromDateOfBirth: string, toDateOfBirth: string) : boolean | undefined{
  if(toDateOfBirth !== ''){
    if(toDateOfBirth > now.format('YYYY-MM-DD' ) || fromDateOfBirth > toDateOfBirth){
      return true;
    }
  }
}