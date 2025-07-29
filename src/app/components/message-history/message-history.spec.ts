import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistory } from './message-history';

describe('MessageHistory', () => {
  let component: MessageHistory;
  let fixture: ComponentFixture<MessageHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
