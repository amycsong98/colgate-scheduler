import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ACTION_ADD } from '../constants';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';
import {
  ACTION_HOVER, ACTION_UNHOVER, COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3,
  COURSE_STIME1, COURSE_STIME2, COURSE_STIME3, COURSE_ETIME1, COURSE_ETIME2, COURSE_ETIME3,
  ACTION, ACTION_SEARCH, DATA

} from '../constants';

@Component({
  selector: 'app-course-lister',
  templateUrl: './course-lister.component.html',
  styleUrls: ['./course-lister.component.css']
})
export class CourseListerComponent implements OnInit {
  isLoading: boolean;

  displayedColumns: string[] = ['Course',	'Title',	'Meets',	'Status',	'Restrictions'];

  courses: object[];

  searched = false;

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = false;

    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_SEARCH) {
          this.isLoading = true;

          const url = data[DATA];
          this.courseService.searchCourses(url).subscribe(
            res => {
              this.isLoading = false;
              this.courses = res;
              this.searched = true;
            }
          );
        }
      }
    );
  }

  

  addCourse(course: any) {
    this.courseService.guessAmPmAndAppend(course);
    this.courseService.addCourse(course);
  }

  appendAmPm(course: any, ampms: any) {
    if (ampms['start1AmPm']) {
      course[COURSE_STIME1] = course[COURSE_STIME1] + ':' + ampms['start1AmPm'];
      course[COURSE_ETIME1] = course[COURSE_ETIME1] + ':' + ampms['end1AmPm'];
    }
    if (ampms['start2AmPm']) {
      course[COURSE_STIME2] = course[COURSE_STIME2] + ':' + ampms['start2AmPm'];
      course[COURSE_ETIME2] = course[COURSE_ETIME2] + ':' + ampms['end2AmPm'];
    }
    if (ampms['start3AmPm']) {
      course[COURSE_STIME3] = course[COURSE_STIME3] + ':' + ampms['start3AmPm'];
      course[COURSE_ETIME3] = course[COURSE_ETIME3] + ':' + ampms['end3AmPm'];
    }
  }

  hoverCourse(course: any) {
    if (!this.courseService.isDuplicate(course)) {
      this.courseService.guessAmPmAndAppend(course);
      this.dataPassService.sendData({ action: ACTION_HOVER, data: course });
    }
  }

  unhoverCourse(course: any) {
    if (!this.courseService.isDuplicate(course)) {
      this.courseService.guessAmPmAndAppend(course);
      this.dataPassService.sendData({ action: ACTION_UNHOVER, data: course });
    }
  }
}

export interface AmPm {
  start1AmPm: string;
  start2AmPm: string;
  start3AmPm: string;
  end1AmPm: string;
  end2AmPm: string;
  end3AmPm: string;
}

// @Component({
//   selector: 'app-am-pm',
//   templateUrl: './am-pm.dialog.html',
// })
// export class DialogAmPmComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DialogAmPmComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: AmPm,
//     ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
