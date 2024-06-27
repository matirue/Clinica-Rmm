import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarturnosComponent } from './listarturnos.component';

describe('ListarturnosComponent', () => {
  let component: ListarturnosComponent;
  let fixture: ComponentFixture<ListarturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarturnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
