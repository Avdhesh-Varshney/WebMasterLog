import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactComponent } from './new-contact.component';

describe('NewContactComponent', () => {
  let component: NewContactComponent;
  let fixture: ComponentFixture<NewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
