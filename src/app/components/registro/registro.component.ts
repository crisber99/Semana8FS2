import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/Service/Registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioRegistro: FormGroup;
  edadValida = false;
  resultado:boolean;

  constructor(
    private servicioReg: RegistroService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repetirPassword: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required])
    }, {
      validators: [this.mustMatch('password', 'repetirPassword')]
    });
  }
 
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

  registrar() {
    if (this.formularioRegistro.valid) {
      const usuario = {
        nombreUsuario: this.formularioRegistro.get('nombreUsuario').value,
        mail: this.formularioRegistro.get('mail').value,
        password: this.formularioRegistro.get('password').value,
        fechaNacimiento: this.formularioRegistro.get('fechaNacimiento').value
      };
      console.log(usuario);

      const registroExitoso = this.servicioReg.registrarUsuario(usuario.mail, usuario.password, 
        usuario.nombreUsuario, usuario.fechaNacimiento, "admin");
          if (registroExitoso) {
            console.log('Registro exitoso:', { usuario });
            
          } else {
            console.log('Error en el registro.');
          }
          this.resultado = registroExitoso;
          this.formularioRegistro.reset();
    }
  }

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
