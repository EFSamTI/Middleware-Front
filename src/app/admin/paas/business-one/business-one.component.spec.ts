import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOneComponent } from './business-one.component';

describe('BusinessOneComponent', () => {
  let component: BusinessOneComponent;
  let fixture: ComponentFixture<BusinessOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
