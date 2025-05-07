import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisteredStudentsComponent } from './show-registered-students.component';

describe('ShowRegisteredStudentsComponent', () => {
  let component: ShowRegisteredStudentsComponent;
  let fixture: ComponentFixture<ShowRegisteredStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRegisteredStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRegisteredStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
