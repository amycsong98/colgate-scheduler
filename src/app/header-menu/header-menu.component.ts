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

  constructor(
    private courseService: CourseService,
    private dataPassService: DataPassService,
  ) { }

  ngOnInit() {
    // initialize terms
    this.courseService.getTerms().subscribe(
      res => {
        this.terms = res;
      }
    );

    // get current term
    this.currentTerm = this.courseService.getCurrentTerm();
    console.log('current term: ' + this.currentTerm);
    if (this.currentTerm === undefined) {
      this.currentTerm = LASTEST_TERM;
      this.courseService.setCurrentTerm(LASTEST_TERM);
    }
  }

  // When term is changed on the dropdown
  changeCurrentTerm(term: any) {
    this.courseService.setCurrentTerm(term);
  }
}
