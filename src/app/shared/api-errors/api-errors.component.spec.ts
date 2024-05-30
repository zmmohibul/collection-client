import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorsComponent } from './api-errors.component';

describe('ApiErrorsComponent', () => {
  let component: ApiErrorsComponent;
  let fixture: ComponentFixture<ApiErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
