import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericErrorViewComponent } from './generic-error-view.component';

describe('GenericErrorViewComponent', () => {
  let component: GenericErrorViewComponent;
  let fixture: ComponentFixture<GenericErrorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericErrorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericErrorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
