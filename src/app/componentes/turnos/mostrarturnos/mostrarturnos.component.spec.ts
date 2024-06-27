import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarturnosComponent } from './mostrarturnos.component';

describe('MostrarturnosComponent', () => {
  let component: MostrarturnosComponent;
  let fixture: ComponentFixture<MostrarturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarturnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
