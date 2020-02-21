import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit() {
    // get current term
    this.currentTerm = this.courseService.getCurrentTerm();
    console.log('current term: ' + this.currentTerm);
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

    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.schedules[0];
  }

  // When term is changed on the dropdown
  changeCurrentTerm(term: any) {
    this.currentTerm = term;
    this.courseService.setCurrentTerm(term);

    this.schedules = this.courseService.getSchedules();
    this.currentSchedule = this.schedules[0];
  }
}
