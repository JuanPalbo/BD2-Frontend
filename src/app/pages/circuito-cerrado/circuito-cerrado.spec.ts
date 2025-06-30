import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitoCerrado } from './circuito-cerrado';

describe('CircuitoCerrado', () => {
  let component: CircuitoCerrado;
  let fixture: ComponentFixture<CircuitoCerrado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitoCerrado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitoCerrado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
