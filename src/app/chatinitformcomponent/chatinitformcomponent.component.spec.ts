import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInitFormComponent } from './chatinitformcomponent.component';

describe('ChatInitFormComponent', () => {
  let component: ChatInitFormComponent;
  let fixture: ComponentFixture<ChatInitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatInitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
