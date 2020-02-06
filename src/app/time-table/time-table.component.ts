import { Component, OnInit } from '@angular/core';

import { DataPassService } from '../data-pass.service';

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
        if (data['action'] === 'hover') {
          console.log(data);
          this.displayCourse(data['data']); 
        } else if (data['action'] === 'unhover') {

        } else if (data['action'] === 'add') {

        } else {
          console.log(data);
        }
      }
    );
  }

  displayCourse(course: any) {
    // parse data
    const days1 = course['MEET1_DAYS'];
    const days2 = course['MEET2_DAYS'];
    const dayt3 = course['MEET3_DAYS'];

    if (days1 != null) {
      const beginTime1 = course['MEET1_BEGIN_TIME12'];
      const endTime1 = course['MEET1_END_TIME12'];

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
