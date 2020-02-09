import { Component, OnInit } from '@angular/core';

import { CourseService } from '../course.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  terms: any[];
  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    // initialize terms
    this.courseService.getTerms().subscribe(
      res => {
        this.terms = res;
      }
    );
  }
  

}
