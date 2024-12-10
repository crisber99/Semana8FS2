import { Component, OnInit } from '@angular/core';

/**
 * @description
 * Componente que despliega el menú.
 */
/**
 * @usageNotes
 * 
 * el metodo 'getPerfil' valida que el usuario sea ADMIN para poder mostrar más opciones en el menú.
 * 
 */

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isChecked = false;

  getPerfil(){
    if(sessionStorage.getItem('perfil') != null){
      if(sessionStorage.getItem('perfil').toUpperCase() == 'ADMIN') return true; else return false;
    }
    else return false;
    
  }

}
