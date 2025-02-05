import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardNavComponent;
  let fixture: ComponentFixture<DashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
