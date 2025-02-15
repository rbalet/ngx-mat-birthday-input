import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgxMatDateInputComponent } from './ngx-mat-date-input.component'

describe('NgxMatDateInputComponent', () => {
  let component: NgxMatDateInputComponent
  let fixture: ComponentFixture<NgxMatDateInputComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMatDateInputComponent],
    })
    fixture = TestBed.createComponent(NgxMatDateInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
