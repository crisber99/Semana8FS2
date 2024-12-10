import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { JsonService } from 'src/app/Service/json.service';


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
  styleUrls: ['./perfil.component.css'],
  providers: [JsonService]
})
export class PerfilComponent implements OnInit {
  formularioPerfil: FormGroup;
  resultado: boolean;

  constructor(
    private jsonPerfiles: JsonService
  ) { }

  Perfiles: any[] = [];
  perfilName: string = '';

  ngOnInit(): void {
    this.jsonPerfiles.getJsonPerfiles().subscribe(data => {
      this.Perfiles = data;
    });

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

  registrar(): void {
    const newPerfil = {
      perfilCod: this.Perfiles.length > 0 ? Math.max(...this.Perfiles.map((p: any) => p.perfilCod)) + 1 : 1,
      perfilName: this.formularioPerfil.get('nombrePerfil').value
    };
    this.Perfiles.push(newPerfil);
    this.jsonPerfiles.registrarPerfil(this.Perfiles);

    this.formularioPerfil.reset();
  }

}
