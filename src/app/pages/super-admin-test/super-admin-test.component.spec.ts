import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminTestComponent } from './super-admin-test.component';

describe('SuperAdminTestComponent', () => {
  let component: SuperAdminTestComponent;
  let fixture: ComponentFixture<SuperAdminTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperAdminTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
