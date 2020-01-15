import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() day;
  @Input() time;
  @Input() color;

  constructor() { }

  ngOnInit() {

  }

  fullDayName(day: string) {
    switch(day) {
      case 'M':
        return 'Monday';
      case 'T':
        return 'Tuesday';
      case 'W':
        return 'Wednesday';
      case 'Th':
        return 'Thursday';
      case 'F':
        return 'Friday';
      default:
        return 'ERROR';
    }
  }
}
