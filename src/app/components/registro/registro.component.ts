import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/Service/Registro.service';

/**
 * @description
 * Componente que registra nuevos Usuarios
 */
/**
 * @usageNotes
 * 
 * el metodo 'passwordFormField' realiza todas las validaciones necesarias para el password.
 * el metodo 'mustMatch' valida que las pass sean iguales.
 * el metodo 'dateValidator' realiza las validaciones necesarias para que no ingresen fechas erroneas.
 * el metodo 'registrar' registra al usuario.
 * el metodo 'validarEdad' valida que la edad no sea nenor a 13 años.
 * 
 */

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioRegistro: FormGroup;
  edadValida = false;
  resultado:boolean;
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  perfiles = this.servicioReg.perfiles;
  constructor(
    private servicioReg: RegistroService,
    private el: ElementRef,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, this.passwordFormField]),
      repetirPassword: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required, this.dateValidator]),
      perfil: new FormControl('', [Validators.required])
    }, 
    {
      validators: [this.mustMatch('password', 'repetirPassword')]
    });
  }

  passwordFormField(control: AbstractControl): { [key: string]: boolean } | null {
    const pass = control.value;
    if (!pass) {
      return null;
    }

    const UpperPattern = /^(?=.*[A-Z])/;
    if (!UpperPattern.test(pass)) {
      return { 'invalidMayuscula': true };
    }

    const LowerPattern = /(?=.*[a-z])/;
    if (!LowerPattern.test(pass)) {
      return { 'invalidMin': true };
    }

    const NumberPattern = /(.*[0-9].*)/;
    if (!NumberPattern.test(pass)) {
      return { 'invalidNum': true };
    }

    const CaracterPattern = /(?=.*[!@#$%^&*])/;
    if (!CaracterPattern.test(pass)) {
      return { 'invalidCaracter': true };
    }

    const LargoMinPattern = /.{8,10}/;
    if (!LargoMinPattern.test(pass)) {
      return { 'invalidLength': true };
    }

    return null;
  }

  get passRepit(){
    const pass1 = this.formularioRegistro.get('password');
    const pass2 = this.formularioRegistro.get('repetirPassword');
    if(pass1.value != pass2.value) {
      return false;
     } else {
      return true;
     }
  }
 
  /**
   * 
   * @param password -password1
   * @param repetirPassword -passwor2
   * @returns devulve true si los campos son iguales
   */
  mustMatch(password: string, repetirPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const repetirPasswordControl = formGroup.controls[repetirPassword];

      if (repetirPasswordControl.errors 
        && !repetirPasswordControl.errors.confirmedValidator) { 
        return null; 
    } 

      if (passwordControl.value !== repetirPasswordControl.value) {
        repetirPasswordControl.setErrors({ mustMatch: true });
      } else {
        repetirPasswordControl.setErrors(null);
      }

      let error: Validators | null;
      if (passwordControl.value !== repetirPasswordControl.value) {
          error = { confirmedValidator: true };
      } else {
          error = null; 
      }
      repetirPasswordControl.setErrors(error);
      return error;
    };
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateValue = control.value;
    if (!dateValue) {
      return null;
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateValue)) {
      return { 'invalidDate': true };
    }
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return { 'invalidDate': true };
    }

    
    const cienAnios =  1000 * 60 * 60 * 24 * 36500;
    const endDate = new Date();
    const restaDate = endDate.getTime() - cienAnios;
    const startDate = new Date(restaDate);

    if (date < startDate || date > endDate) {
      return { 'invalidDate': true };
    }

    return null;
  }

  registrar() {
    if (this.formularioRegistro.valid) {
      const usuario = {
        nombreUsuario: this.formularioRegistro.get('nombreUsuario').value,
        mail: this.formularioRegistro.get('mail').value,
        password: this.formularioRegistro.get('password').value,
        fechaNacimiento: this.formularioRegistro.get('fechaNacimiento').value,
        perfil: this.formularioRegistro.get('perfil').value
      };
      console.log(usuario);

      const registroExitoso = this.servicioReg.registrarUsuario(usuario.mail, usuario.password, 
        usuario.nombreUsuario, usuario.fechaNacimiento, usuario.perfil.name);
          if (registroExitoso) {
            console.log('Registro exitoso:', { usuario });
            
          } else {
            console.log('Error en el registro.');
          }
          this.resultado = registroExitoso;
          this.formularioRegistro.reset();
    }
  }

  /**
   * 
   * @param fechaNacimiento calcula la fecha de nacimiento para obtener la edad
   * @returns devuleve la edad
   */
  calcularEdad(fechaNacimiento): number {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
 
    const date = new Date(fechaNacimiento);

    const añoNacimiento = date.getFullYear();
    const mesNacimiento = date.getMonth();
    const diaNacimiento = date.getDate();
 
    let edad = añoActual - añoNacimiento;
 
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
 
    return edad;
  }


  validarEdad(): void {
    const fechaNacimientoValue = this.formularioRegistro.get('fechaNacimiento').value;
    const edad = this.calcularEdad(fechaNacimientoValue);
    this.edadValida = edad >= 13;
  }
}
