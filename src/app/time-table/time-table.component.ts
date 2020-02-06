import { Component, OnInit } from '@angular/core';

import { DataPassService } from '../data-pass.service';
import { 
  COURSE_DAYS1, COURSE_DAYS2, COURSE_DAYS3, COURSE_STIME1, COURSE_ETIME1, ACTION_HOVER, ACTION_UNHOVER, ACTION_ADD, ACTION, DATA
} from '../constants';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  displayedColumns = ['time', 'mon', 'tues', 'wed', 'thurs', 'fri'];
  dataSource = TIME_DATA;

  constructor(
    private dataPassService: DataPassService
  ) { }

  ngOnInit() {
    this.dataPassService.currentData.subscribe(
      data => {
        if (data[ACTION] === ACTION_HOVER) {
          console.log(data);
          this.displayCourse(data[DATA]);
        } else if (data[ACTION] === ACTION_UNHOVER) {

        } else if (data[ACTION] === ACTION_ADD) {

        } else {
          console.log(data);
        }
      }
    );
  }

  displayCourse(course: any) {
    // parse data
    const days1 = course[COURSE_DAYS1];
    const days2 = course[COURSE_DAYS2];
    const dayt3 = course[COURSE_DAYS3];

    if (days1 != null) {
      const beginTime1 = course[COURSE_STIME1];
      const endTime1 = course[COURSE_ETIME1];

      console.log(days1);
      console.log(beginTime1);
      console.log(endTime1);
    }


  }
}

const TIME_DATA = [
  {time: '7 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '8 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '9 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '10 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '11 am', m: '', t: '', w: '', r: '', f: ''},
  {time: '12 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '1 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '2 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '3 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '4 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '5 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '6 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '7 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '8 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '9 pm', m: '', t: '', w: '', r: '', f: ''},
  {time: '10 pm', m: '', t: '', w: '', r: '', f: ''},
];
