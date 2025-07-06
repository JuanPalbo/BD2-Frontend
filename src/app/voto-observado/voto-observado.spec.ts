import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoObservado } from './voto-observado';

describe('VotoObservado', () => {
  let component: VotoObservado;
  let fixture: ComponentFixture<VotoObservado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotoObservado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotoObservado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
