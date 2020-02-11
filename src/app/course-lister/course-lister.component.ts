import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { URL_TEST, ACTION_ADD } from '../constants';
import { CourseService } from '../course.service';
import { DataPassService } from '../data-pass.service';
import { 
  ACTION_HOVER, ACTION_UNHOVER, COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3,
  COURSE_STIME1, COURSE_STIME2, COURSE_STIME3, COURSE_ETIME1, COURSE_ETIME2, COURSE_ETIME3,

} from '../constants';

@Component({
  selector: 'app-course-lister',
  templateUrl: './course-lister.component.html',
  styleUrls: ['./course-lister.component.css']
})
export class CourseListerComponent implements OnInit {
  displayedColumns: string[] = ['Course',	'Title',	'Meets',	'Status',	'Restrictions'];

  courses: object[];

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.courseService.searchCourses(URL_TEST).subscribe(
      res => {
        console.log(res);
        this.courses = res;
      }
    );
  }

  addCourse(course: any) {
    const start1 = course[COURSE_DAYS1] !== null ? course[COURSE_STIME1] : false;
    const end1 = course[COURSE_DAYS1] !== null ? course[COURSE_ETIME1] : false;
    const start2 = course[COURSE_DAYS2] !== null ? course[COURSE_STIME2] : false;
    const end2 = course[COURSE_DAYS2] !== null ? course[COURSE_ETIME2] : false;
    const start3 = course[COURSE_DAYS3] !== null ? course[COURSE_STIME3] : false;
    const end3 = course[COURSE_DAYS3] !== null ? course[COURSE_ETIME3] : false;

    if (start1) {
      const dialogRef = this.dialog.open(DialogAmPmComponent, {
        data: {start1, start2, start3, end1, end2, end3, start1AmPm: '', start2AmPm: '',
        start3AmPm: '', end1AmPm: '', end2AmPm: '', end3AmPm: '',
      }
      });

      dialogRef.afterClosed().subscribe(
        res => {
          if (res) { // if ampms are correctly input
            console.log(res);
            this.appendAmPm(course, res);
            this.courseService.addCourse(course);
            this.dataPassService.sendData({ action: ACTION_ADD, data: course });
          }
        }
      );
    } else {

    }
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
    this.dataPassService.sendData({ action: ACTION_HOVER, data: course });
  }

  unhoverCourse(course: any) {
    this.dataPassService.sendData({ action: ACTION_UNHOVER, data: course });
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

@Component({
  selector: 'app-am-pm',
  templateUrl: './am-pm.dialog.html',
})
export class DialogAmPmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAmPmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AmPm,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
