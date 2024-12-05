import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prueba 1: usuario registrado', () => {
    component.formularioRegistro.setValue({mail: "mail@mail.com", pass: "123456", userName: "user", fechaNacimiento:"25/03/1986"});
    component.registrar();
    expect(component.resultado).toBe(true);
  });
});
