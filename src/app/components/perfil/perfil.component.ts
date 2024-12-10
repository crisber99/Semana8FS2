import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { RegistroService } from 'src/app/Service/Registro.service';

/**
 * @description
 * Componente que registra nuevos perfiles
 */
/**
 * @usageNotes
 * 
 * se valida el campo nombrePerfil para que cumpla con lo siguiente:
 * que permita solo letras
 * que no permita otros caracteres
 * 
 * una vez que los campos del formulario esten validados
 * el metodo Registrar toma el campo 'nombrePerfil' y lo graba
 */

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formularioPerfil: FormGroup;
  resultado:boolean;
  
  constructor(
    private servicioReg: RegistroService
  ) { }

  Perfiles = this.servicioReg.perfiles;

  ngOnInit(): void {
    this.formularioPerfil = new FormGroup({
      nombrePerfil: new FormControl('', [Validators.required, this.ValidaCampo])
    });
  } 

  ValidaCampo(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    if (!name) {
      return null;
    }

    const SoloLetras = /^[a-zA-Z]+$/;
    if (!SoloLetras.test(name)) {
      return { 'SoloLetras': true };
    }

    const LargoMinPattern = /.{5,15}/;
    if (!LargoMinPattern.test(name)) {
      return { 'invalidLength': true };
    }

    return null;
  }

  registrar() {
    if (this.formularioPerfil.valid) {
      const per = {
        perfil: this.formularioPerfil.get('nombrePerfil').value
      };
      console.log(per);

      const registroExitoso = this.servicioReg.registrarPerfil(per.perfil);
          if (registroExitoso) {
            console.log('Registro exitoso:', { per });
            
          } else {
            console.log('Error en el registro.');
          }
          this.resultado = registroExitoso;
          this.formularioPerfil.reset();
    }
  }

}
