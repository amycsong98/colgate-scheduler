import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() color: string;
  @Input() index: number;

  numOfCol = 6;

  constructor() { }

  ngOnInit() {

  }

  isDayRow(index) {
    return index < this.numOfCol;
  }

  isTimeCol(index) {
    return index % this.numOfCol == 0;
  }

  ind2day(index) {
    switch(index) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      default:
        return 'ERROR';
    }
  }
}
