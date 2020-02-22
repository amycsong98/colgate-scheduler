import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CourseService } from '../course.service';
import { LASTEST_TERM, ACTION_TERM_CHANGE } from '../constants';
import { DataPassService } from '../data-pass.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  terms: any[];
  currentTerm: string;

  schedules: string[];
  currentSchedule: string;

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    // get current term
    this.currentTerm = this.courseService.getCurrentTerm();
    if (this.currentTerm === undefined) {
      this.currentTerm = LASTEST_TERM;
      this.courseService.setCurrentTerm(LASTEST_TERM);
    }

    // initialize terms
    this.courseService.getTerms().subscribe(
      res => {
        this.terms = res;
      }
    );

    // initialize schedules
    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.courseService.getCurrentSchedule();
    if (this.currentSchedule === undefined) {
      this.currentSchedule = this.schedules[0];
      this.courseService.setCurrentSchedule(this.schedules[0]);
    }
  }

  // When term is changed on the dropdown
  changeCurrentTerm(term: any) {
    this.currentTerm = term;
    this.courseService.setCurrentTerm(term);

    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.schedules[0];
    this.courseService.setCurrentSchedule(this.schedules[0]);
  }

  changeCurrentSchedule(schedule: string) {
    console.log('change current schedule!');
    this.currentSchedule = schedule;
    this.courseService.setCurrentSchedule(schedule);
  }

  newSchedule() {
    const dialogRef = this.dialog.open(DialogScheduleNameComponent);

    dialogRef.afterClosed().subscribe(
      name => {
        if (name) {
          console.log(name);

          this.courseService.addNewSchedule(name);

          this.schedules = this.courseService.getSchedules();
          this.currentSchedule = name;
          this.courseService.setCurrentSchedule(name);
        }
      }
    );
  }

  duplicateSchedule() {
    const dialogRef = this.dialog.open(DialogScheduleNameComponent);

    dialogRef.afterClosed().subscribe(
      name => {
        if (name) {
          this.courseService.duplicateSchedule(name);

          this.schedules = this.courseService.getSchedules();
          this.currentSchedule = name;
          this.courseService.setCurrentSchedule(name);
        }
      }
    );
  }

  deleteSchedule() {
    this.courseService.deleteSchedule();

    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.courseService.getCurrentSchedule();
  }
}

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.dialog.html',
})
export class DialogScheduleNameComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogScheduleNameComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
