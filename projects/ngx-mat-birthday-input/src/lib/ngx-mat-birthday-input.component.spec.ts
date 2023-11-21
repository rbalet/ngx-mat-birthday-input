import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatBirthdayInputComponent } from './ngx-mat-birthday-input.component';

describe('NgxMatBirthdayInputComponent', () => {
  let component: NgxMatBirthdayInputComponent;
  let fixture: ComponentFixture<NgxMatBirthdayInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMatBirthdayInputComponent]
    });
    fixture = TestBed.createComponent(NgxMatBirthdayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
