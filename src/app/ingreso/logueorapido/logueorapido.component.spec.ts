import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogueorapidoComponent } from './logueorapido.component';

describe('LogueorapidoComponent', () => {
  let component: LogueorapidoComponent;
  let fixture: ComponentFixture<LogueorapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogueorapidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogueorapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
