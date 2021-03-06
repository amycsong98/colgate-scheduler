import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';
import {
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, ACTION_HOVER, ACTION_UNHOVER,
  ACTION_ADD, ACTION, DATA, CRN, ACTION_DELETE, ACTION_TERM_CHANGE, ACTION_SCHEDULE_CHANGE, ACTION_UPDATE
} from '../constants';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: [
    './my-courses.component.css',
    '../colgate-scheduler.css'
  ]
})
export class MyCoursesComponent implements OnInit {
  displayedColumns: string[] = ['Course',	'Title',	'Meets',	'Status',	'Restrictions', 'delete', 'settings'];

  courses: object[];

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // initialize datapass service
    // same as my time-table (modularize this)
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_HOVER) {
        } else if (data[ACTION] === ACTION_UNHOVER) {
        } else if (data[ACTION] === ACTION_ADD) {
          this.courses = this.courses.concat([data[DATA]]); //
        } else if (data[ACTION] === ACTION_DELETE) {
          const course = data[DATA];
          this.courses = this.courses.filter(e => e[CRN] !== course[CRN]);
        } else if (data[ACTION] === ACTION_UPDATE) {
          this.courses = this.courseService.getCourses();
        } else if (data[ACTION] === ACTION_TERM_CHANGE) {
          this.courses = this.courseService.getCourses();
        } else if (data[ACTION] === ACTION_SCHEDULE_CHANGE) {
          this.courses = this.courseService.getCourses();
        } else {
          console.log(data);
        }
      }
    );

    // get courses
    this.courses = this.courseService.getCourses();
  }

  deleteCourse(course: any) {
    this.dataPassService.sendData({ action: ACTION_DELETE, data: course });
    return this.courseService.deleteCourse(course);
  }

  /*
    allowed changes:
    color, ampm
  */
  changeCourse(course: any) {
    // to prevent background of &nbsp; from changing
    const courseCopy = Object.assign({}, course);

    const dialogRef = this.dialog.open(DialogCourseSettingsComponent, {
      data: { courseCopy }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
        if (res) {
          this.courseService.updateCourse(courseCopy);
        }
      }
    );
  }
}

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.dialog.html',
  styleUrls: [
    './course-settings.dialog.css',
    '../colgate-scheduler.css'
  ]
})
export class DialogCourseSettingsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCourseSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

