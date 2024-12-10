import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RegistroService } from 'src/app/Service/Registro.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  formularioRegistro: FormGroup;
  resultado:boolean;
  constructor(
    private servicioReg: RegistroService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = new FormGroup({
      password: new FormControl('', [Validators.required, this.passwordFormField]),
      repetirPassword: new FormControl('', [Validators.required])
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

    const LargoPattern = /.{8,}/;
    if (!LargoPattern.test(pass)) {
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

}
