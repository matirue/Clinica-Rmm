import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarmedicosComponent } from './listarmedicos.component';

describe('ListarmedicosComponent', () => {
  let component: ListarmedicosComponent;
  let fixture: ComponentFixture<ListarmedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarmedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarmedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
