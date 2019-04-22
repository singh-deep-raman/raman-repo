import { StudentDocument } from 'src/app/shared/models/student-document.model';

/**
 * Model to hold student details
 *
 * @export
 * @class Student
 */
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
