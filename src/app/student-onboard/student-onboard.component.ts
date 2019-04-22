import { StudentService } from './../shared/services/student.service';
import { InMemoryDataService } from './../shared/services/in-memory-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentDocument } from '../shared/models/student-document.model';
import { Student } from '../shared/models/student.model';
import * as faker from 'faker';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-onboard',
  templateUrl: './student-onboard.component.html',
  styleUrls: ['./student-onboard.component.css']
})
export class StudentOnboardComponent implements OnInit {

  studentForm: FormGroup;
  documentTypes = new Array<StudentDocument>();
  viewMode = '';
  studentId = '';

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initDocumentTypes();
    this.route.queryParams.subscribe(params => {
      this.initStudentForm(params.studentId, params.viewMode);
    });
  }

  /**
   * This method initializes the student onboarding form
   *
   * @memberof StudentOnboardComponent
   */
  initStudentForm(studentId: string, viewMode: string) {
    this.viewMode = viewMode;
    this.studentId = studentId;
    this.studentForm = this.formBuilder.group({
      name: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      category: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      documents: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      dob: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      fatherName: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      motherName: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      lastClassScore: [{ value: '', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]],
      gender: [{ value: 'Male', disabled: viewMode === 'VIEW' && this.studentId }, [Validators.required]]
    });
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe((student: Student) => {
        this.studentForm.get('name').setValue(student.name);
        this.studentForm.get('category').setValue(student.category);
        this.studentForm.get('fatherName').setValue(student.fatherName);
        this.studentForm.get('motherName').setValue(student.motherName);
        this.studentForm.get('lastClassScore').setValue(student.lastClassScore);
        this.studentForm.get('gender').setValue(student.gender);
        this.studentForm.get('dob').setValue(new Date(student.dob));
        const docsSelected: string[] = [];
        student.documents.forEach(doc => {
          docsSelected.push(doc.docId);
        });
        this.studentForm.get('documents').setValue(docsSelected);
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Some error occurred !!!' });
      });
    }

  }

  /**
   * This method get available document types to display on Student Onboard form
   *
   * @memberof StudentOnboardComponent
   */
  initDocumentTypes() {
    this.studentService.getDocumentTypes().subscribe((response: Array<StudentDocument>) => {
      this.documentTypes = response;
    });
  }
  /**
   * This method creates a new student on the server
   *
   * @memberof StudentOnboardComponent
   */
  onboardStudent() {
    const student = new Student();
    student.uid = faker.random.uuid();
    student.name = this.studentForm.get('name').value;
    student.category = this.studentForm.get('category').value;
    const documentsSelected = this.studentForm.get('documents').value;
    documentsSelected.forEach(document => {
      student.documents.push(this.documentTypes.find(doc => doc.docId === document));
    });
    student.dob = this.studentForm.get('dob').value;
    student.fatherName = this.studentForm.get('fatherName').value;
    student.motherName = this.studentForm.get('motherName').value;
    student.lastClassScore = this.studentForm.get('lastClassScore').value;
    student.imgUrl = faker.image.avatar();

    if (this.viewMode === 'EDIT') {
      this.updateStudent(student);
    } else if (this.viewMode === '' || this.viewMode === undefined) {
      this.onboardNewStudent(student);
    }
  }

  updateStudent(student: Student) {
    this.studentService.updateStudent(student).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Student updated successfully !!!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Student update failed !!!' });
    });
  }

  onboardNewStudent(student: Student) {
    this.studentService.onboardStudent(student).subscribe(response => {
      this.studentForm.reset();
      this.initDocumentTypes();
      this.messageService.add({ severity: 'success', summary: 'Student onboarded successfully !!!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Student onboarded failed !!!' });
    });
  }

}

