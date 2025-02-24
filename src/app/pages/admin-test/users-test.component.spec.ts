import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestComponent } from './users-test.component';

describe('UsersTestComponent', () => {
  let component: AdminTestComponent;
  let fixture: ComponentFixture<AdminTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
