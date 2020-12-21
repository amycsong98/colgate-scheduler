import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CourseService } from '../course.service';
import {
  LASTEST_TERM, ACTION_TERM_CHANGE, SCHEDULE_NAME_ERROR_MSG, ACTION_OK, ACTION, ACTION_SCHEDULES_CHANGE,
  DATA, SCHEDULE_DEFAULT_CHANGE_SUCCESS_MSG
} from '../constants';
import { DataPassService } from '../data-pass.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: [
    './header-menu.component.css',
    '../colgate-scheduler.css'
  ]
})
export class HeaderMenuComponent implements OnInit {
  terms: any[];
  currentTerm: string;

  schedules: string[];
  currentSchedule: string;

  // HTML width
  scheduleWidth: number;

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    // datapass
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_SCHEDULES_CHANGE) {
          this.schedules = data[DATA];
        } else {
          console.log(data);
        }
      }
    );

    this.currentTerm = this.courseService.getCurrentTerm();

    // initialize terms
    this.courseService.getTerms().subscribe(
      res => {
        this.terms = res;
        console.log(this.terms)

        // get current term
        if (this.currentTerm === undefined) {
          this.currentTerm = this.terms[0].TERM_CODE;
          this.courseService.setCurrentTerm(this.currentTerm);
        }
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
    console.log('change current schedule: ' + schedule);
    if (schedule !== 'add') {
      this.currentSchedule = schedule;
      this.courseService.setCurrentSchedule(schedule);
    }
  }

  newSchedule() {
    const dialogRef = this.dialog.open(DialogScheduleNameComponent);

    dialogRef.afterClosed().subscribe(
      name => {
        if (name) {
          if (!this.scheduleNameExists(name)) {
            console.log(name);

            this.courseService.addNewSchedule(name);

            this.schedules = this.courseService.getSchedules();
            this.currentSchedule = name;
            this.courseService.setCurrentSchedule(name);
          } else {
            this.displayMessage(SCHEDULE_NAME_ERROR_MSG);
          }
        }
      }
    );
  }

  duplicateSchedule() {
    const dialogRef = this.dialog.open(DialogScheduleNameComponent);

    dialogRef.afterClosed().subscribe(
      name => {
        if (name) {
          if (!this.scheduleNameExists(name)) {
            this.courseService.duplicateSchedule(name);

            this.schedules = this.courseService.getSchedules();
            this.currentSchedule = name;
            this.courseService.setCurrentSchedule(name);
          } else {
            this.displayMessage(SCHEDULE_NAME_ERROR_MSG);
          }
        }
      }
    );
  }

  scheduleNameExists(name: string) {
    const schedules = this.courseService.getSchedules();
    for (const schedule of schedules) {
      if (schedule === name) {
        return true;
      }
    }
    return false;
  }

  deleteSchedule() {
    this.courseService.deleteSchedule();

    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.courseService.getCurrentSchedule();
  }

  editSchedule() {
    const dialogRef = this.dialog.open(DialogScheduleNameComponent);

    dialogRef.afterClosed().subscribe(
      name => {
        if (!this.scheduleNameExists(name)) {
          this.courseService.duplicateSchedule(name);

          this.schedules = this.courseService.getSchedules();
          this.currentSchedule = name;
          this.courseService.setCurrentSchedule(name);
        } else {
          this.displayMessage(SCHEDULE_NAME_ERROR_MSG);
        }
      }
    );
  }

  changeDefaultSchedule() {
    this.courseService.changeDefaultSchedule();
    this.displayMessage(SCHEDULE_DEFAULT_CHANGE_SUCCESS_MSG);
  }

  printSchedule() {
    window.print();
  }

  reload() {
    location.reload();
  }

  displayMessage(message: string) {
    this.snackBar.open(message, ACTION_OK, {
      duration: 2000,
    });
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

  //
  newScheduleName;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
