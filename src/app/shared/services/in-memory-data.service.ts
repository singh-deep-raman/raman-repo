import { StudentService } from './student.service';
import { StudentDocument } from './../models/student-document.model';
import { InMemoryDbService } from 'angular-in-memory-web-api/interfaces';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import * as faker from 'faker';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';

/**
 * This service acts as MOCK Server
 *
 * @export
 * @class InMemoryDataService
 * @implements {InMemoryDbService}
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  students = new Array<Student>();
  registeredUsers = new Array<User>();
  documentTypes = new Array<StudentDocument>();

  constructor() { }
  /**
   * This method creates dummy student data using FAKER.JS library and which will be available to all http calls
   *
   * @returns
   * @memberof InMemoryDataService
   */
  createDb() {
    this.resetValues();
    this.initRegisteredUsers();
    this.initDocumentTypes();
    this.initStudentData();
    return {
      students: this.students,
      registeredUsers: this.registeredUsers,
      documentTypes: this.documentTypes
    };
  }

  /**
   * This method reset values of students and registered users
   *
   * @memberof InMemoryDataService
   */
  resetValues() {
    this.students = [];
    this.registeredUsers = [];
  }

  /**
   * This method add 2 registered users which will be used to login into app
   *
   * @memberof InMemoryDataService
   */
  initRegisteredUsers() {
    this.registeredUsers.push(new User('root', 'root'));
    this.registeredUsers.push(new User('admin', 'admin'));
  }


  /**
   * This method creates dummy student data. We are generating 40 students.
   *
   * @memberof InMemoryDataService
   */
  initStudentData() {
    for (let i = 0; i < 40; i++) {
      this.students.push(this.getDummyStudent());
    }
  }

  /**
   * This method generates document types which will be displayed on Onboarding form.
   * We are creating this because we need document id to tell server which document was submitted.
   *
   * @memberof InMemoryDataService
   */
  initDocumentTypes() {
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Domicile', true, true));
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Birth Certificate', true, true));
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Marksheets', true, true));
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Police Clearance', false, true));
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Passport', false, true));
    this.documentTypes.push(new StudentDocument(faker.random.uuid(), 'Declaration', true, true));
  }

  /**
   * This method returns a dummy student using FAKER.JS library
   *
   * @private
   * @returns {Student}
   * @memberof InMemoryDataService
   */
  private getDummyStudent(): Student {
    const student = new Student();
    student.uid = faker.random.uuid();
    student.name = faker.name.firstName();
    student.fatherName = faker.name.firstName();
    student.motherName = faker.name.firstName();
    student.lastClassScore = faker.random.number({
      min: 30,
      max: 99
    }) + ' %';
    student.category = faker.helpers.randomize(['Domestic', 'International']);
    student.dob = faker.date.past().toString();
    student.gender = faker.helpers.randomize(['Male', 'Female']);
    student.imgUrl = faker.image.avatar();
    student.documents = faker.helpers.randomize([this.documentTypes]);
    return student;
  }

}
