import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/Service/Registro.service';

/**
 * @description
 * Componente que valida si existe el usuario y le facilite la entrega de su password.
 */
/**
 * @usageNotes
 * 
 * el metodo 'recuperar' recupera la contraseña del usuario.
 * 
 */

@Component({
  selector: 'app-recupera-pass',
  templateUrl: './recupera-pass.component.html',
  styleUrls: ['./recupera-pass.component.css']
})
export class RecuperaPassComponent implements OnInit {
  formularioRpass:FormGroup;
  constructor(
    private router: Router,
    private servicioReg: RegistroService
  ) { }

  ngOnInit(): void {
    this.formularioRpass = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
  }

  recuperar(): void {
    if (this.formularioRpass.valid) {

      const login = {
        mail: this.formularioRpass.get('mail').value,
      };
      const rPass = this.servicioReg.recuperaPass(login.mail
        );
          if (rPass !== '') {
            console.log('Enviar mail con la pass:', { rPass });
            this.router.navigate(['/login']);
          } 
    }
  }
}
