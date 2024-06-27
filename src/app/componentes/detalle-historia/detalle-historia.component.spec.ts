import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHistoriaComponent } from './detalle-historia.component';

describe('DetalleHistoriaComponent', () => {
  let component: DetalleHistoriaComponent;
  let fixture: ComponentFixture<DetalleHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
