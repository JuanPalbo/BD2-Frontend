import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirCircuito } from './abrir-circuito';

describe('AbrirCircuito', () => {
  let component: AbrirCircuito;
  let fixture: ComponentFixture<AbrirCircuito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirCircuito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrirCircuito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
