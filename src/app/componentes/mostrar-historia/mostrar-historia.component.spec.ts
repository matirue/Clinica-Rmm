import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHistoriaComponent } from './mostrar-historia.component';

describe('MostrarHistoriaComponent', () => {
  let component: MostrarHistoriaComponent;
  let fixture: ComponentFixture<MostrarHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
