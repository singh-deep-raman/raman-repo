import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { HttpClient } from '@angular/common/http';
import { StudentDocument } from '../models/student-document.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students = new Array<Student>();
  SERVER_URL = 'https://localhost:4200/api';
  constructor(
    private httpClient: HttpClient) {
  }


  /**
   * This method creates a new student on the server by passing the student details in student object
   *
   * @param {Student} student - student to be created
   * @returns
   * @memberof StudentOnboardService
   */
  onboardStudent(student: Student) {
    student.id = this.genId();
    const onboardStudent$ = new Observable<boolean>(observer => {
      this.httpClient.post(`${this.SERVER_URL + '/students'}`, student).subscribe((response: any) => {
        this.students = [student, ...this.students];
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });

    });
    return onboardStudent$;
  }

  genId(): number {
    return this.students.length > 0 ? Math.max(...this.students.map(hero => hero.id)) + 1 : 1;
  }

  /**
   * This method updates student details on the server by passing the student object
   *
   * @param {Student} student - student object with updated details
   * @returns
   * @memberof StudentOnboardService
   */
  updateStudent(student: Student) {
    const updateStudent$ = new Observable<boolean>(observer => {
      this.httpClient.put(`${this.SERVER_URL + '/students'}`, student).subscribe((response: any) => {
        const updateStudent = this.students.find(stud => stud.uid === student.uid);
        if (updateStudent) {
          updateStudent.name = student.name;
          updateStudent.motherName = student.motherName;
          updateStudent.lastClassScore = student.lastClassScore;
          updateStudent.gender = student.gender;
          updateStudent.fatherName = student.fatherName;
          updateStudent.documents = student.documents;
          updateStudent.dob = student.dob;
          updateStudent.category = student.category;
        }
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });

    });
    return updateStudent$;
  }

  /**
   * This method deletes student using the studentId.
   * It returns true if successfully deleted
   *
   * @param {number} studentId - student id of the student to be deleted
   * @returns {Observable<boolean>}
   * @memberof StudentOnboardService
   */
  deleteStudent(studentId: string): Observable<boolean> {
    const deleteStudent$ = new Observable<boolean>(observer => {
      this.httpClient.delete(`${this.SERVER_URL + '/students/' + studentId}`).subscribe((response: any) => {
        this.students = this.students.filter(student => student.uid !== studentId);
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });

    });
    return deleteStudent$;
  }


  /**
   * This method fetches type of documents from server to display on student onboarding form.
   * We also need document id to save which documents have been submitted by student.
   *
   * @returns {Observable<Array<StudentDocument>>}
   * @memberof StudentOnboardService
   */
  getDocumentTypes(): Observable<Array<StudentDocument>> {
    const documentTypes$ = new Observable<Array<StudentDocument>>(observer => {
      this.httpClient.get(`${this.SERVER_URL + '/documentTypes'}`).subscribe((response: any) => {
        observer.next(response);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });

    });
    return documentTypes$;
  }

  getAllStudents(): Observable<Array<Student>> {
    const students$: Observable<Array<Student>> = new Observable<Array<Student>>(observer => {
      this.httpClient.get(`${this.SERVER_URL + '/students/'}`).subscribe((response: Array<Student>) => {
        if (this.students.length === 0) {
          this.students = response;
        }
        observer.next(this.students);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });
    });
    return students$;
  }

  getStudentById(studentId: string): Observable<Student> {
    const student$ = new Observable<Student>(observer => {
      this.httpClient.get(`${this.SERVER_URL + '/students'}`).subscribe((response: any) => {
        const findStudent = this.students.find(student => student.uid === studentId);
        observer.next(findStudent ? findStudent : new Student());
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });
    });
    return student$;
  }

}
