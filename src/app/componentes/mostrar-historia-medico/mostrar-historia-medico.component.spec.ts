import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHistoriaMedicoComponent } from './mostrar-historia-medico.component';

describe('MostrarHistoriaMedicoComponent', () => {
  let component: MostrarHistoriaMedicoComponent;
  let fixture: ComponentFixture<MostrarHistoriaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarHistoriaMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarHistoriaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
