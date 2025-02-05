import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepageComponent } from './filepage.component';

describe('FilepageComponent', () => {
  let component: FilepageComponent;
  let fixture: ComponentFixture<FilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
