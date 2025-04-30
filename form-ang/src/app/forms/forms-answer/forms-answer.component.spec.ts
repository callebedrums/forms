import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAnswerComponent } from './forms-answer.component';

describe('FormsAnswerComponent', () => {
  let component: FormsAnswerComponent;
  let fixture: ComponentFixture<FormsAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
