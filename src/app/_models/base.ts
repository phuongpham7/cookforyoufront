import { DatePipe } from '@angular/common';
export class Base {
  id: string;
  isDelete: boolean;
  dateCreated: DatePipe;
  dateUpdated: DatePipe;
  dateDeleted: DatePipe;
}
