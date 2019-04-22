import { StudentFilter } from './shared/models/student-filter.model';
import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../shared/models/student.model';
import * as faker from 'faker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students = new Array<Student>();
  filteredStudents = new Array<Student>();

  constructor(
    public router: Router,
    private confirmationService: ConfirmationService,
    private studentService: StudentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getAllStudents().subscribe(response => {
      this.students = response;
      this.filteredStudents = this.students;
    });
  }


  /**
   * This method filters list of students on the basis of Student Name search and Type of Student (Domestic, International, Both)
   *
   * @param {StudentFilter} filters
   * @memberof StudentListComponent
   */
  filterStudentsHandler(filters: StudentFilter) {
    this.filteredStudents = this.students.filter(student => {
      if (filters.studentName !== '' && filters.studentType !== 'Both') {
        return student.category === filters.studentType &&
          student.name.toLowerCase().indexOf(filters.studentName.toLowerCase()) >= 0;
      } else if (filters.studentType === 'Both' && filters.studentName !== '') {
        return student.name.toLowerCase().indexOf(filters.studentName.toLowerCase()) >= 0;
      } else if (filters.studentType !== 'Both' && filters.studentName === '') {
        return student.category === filters.studentType;
      }
      return true;
    });
  }
  /**
   * This method shows delete confirmation popup and deletes student if user clicks on YES
   *
   * @param {string} studentId
   * @memberof StudentListComponent
   */
  deleteStudent(studentId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this student?',
      header: 'Confirm Delete',
      key: 'deleteStudent',
      accept: () => {
        this.studentService.deleteStudent(studentId).subscribe(response => {
          this.students = this.students.filter(student => student.uid !== studentId);
          this.filteredStudents = this.students;
          this.filteredStudents = JSON.parse(JSON.stringify(this.filteredStudents));
          this.messageService.add({ severity: 'success', summary: 'Delete Successful' });
        });
      },
      reject: () => {

      }
    });
  }

}
