import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccounteditComponent } from './dialog-accountedit.component';

describe('DialogAccounteditComponent', () => {
  let component: DialogAccounteditComponent;
  let fixture: ComponentFixture<DialogAccounteditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAccounteditComponent]
    });
    fixture = TestBed.createComponent(DialogAccounteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
