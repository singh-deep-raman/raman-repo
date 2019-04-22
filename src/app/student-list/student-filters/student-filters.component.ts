import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentFilter } from '../shared/models/student-filter.model';

@Component({
  selector: 'app-student-filters',
  templateUrl: './student-filters.component.html',
  styleUrls: ['./student-filters.component.css']
})
export class StudentFiltersComponent implements OnInit {

  @Output() filterStudentsEvent = new EventEmitter<StudentFilter>();
  studentFilter = new StudentFilter();

  constructor() { }

  ngOnInit() {
  }

  getFilteredStudents() {
    this.filterStudentsEvent.emit(this.studentFilter);
  }
}
