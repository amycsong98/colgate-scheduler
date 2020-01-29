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

  indexToTime(index) {
    return index / 6 + 6 < 13 ? index / 6 + 6 + ' am' : index / 6 + 6 - 12 + ' pm';
  }

  isDayRow(index) {
    return index < this.numOfCol;
  }

  isTimeCol(index) {
    return index % this.numOfCol == 0;
  }

  indToday(index) {
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
