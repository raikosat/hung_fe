import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccountcreateComponent } from './dialog-accountcreate.component';

describe('DialogAccountcreateComponent', () => {
  let component: DialogAccountcreateComponent;
  let fixture: ComponentFixture<DialogAccountcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAccountcreateComponent]
    });
    fixture = TestBed.createComponent(DialogAccountcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
