import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListerComponent } from './course-lister.component';

describe('CourseListerComponent', () => {
  let component: CourseListerComponent;
  let fixture: ComponentFixture<CourseListerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
