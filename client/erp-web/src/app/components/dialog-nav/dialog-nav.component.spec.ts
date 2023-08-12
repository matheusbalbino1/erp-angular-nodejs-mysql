import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNavComponent } from './dialog-nav.component';

describe('DialogNavComponent', () => {
  let component: DialogNavComponent;
  let fixture: ComponentFixture<DialogNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
