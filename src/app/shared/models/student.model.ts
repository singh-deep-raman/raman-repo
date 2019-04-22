import { StudentDocument } from 'src/app/shared/models/student-document.model';
export class Student {
  id = 0;
  uid = '';
  name = '';
  category = '';
  dob = '';
  fatherName = '';
  motherName = '';
  lastClassScore = '';
  imgUrl = '';
  gender = '';
  documents = new Array<StudentDocument>();
}
