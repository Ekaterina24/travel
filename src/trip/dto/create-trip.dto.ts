import { IsDate } from 'class-validator';
  
  export class CreateTripDto {
  
    date_start: string;
  
    date_finish: string;
  }