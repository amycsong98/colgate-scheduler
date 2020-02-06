import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  displayedColumns = ['time', 'mon', 'tues', 'wed', 'thurs', 'fri'];
  dataSource = TIME_DATA;

  constructor() { }

  ngOnInit() {
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
