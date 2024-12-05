import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isChecked = false;

  getPerfil(){
    if(sessionStorage.getItem('perfil') == 'admin') return true; else return false;
  }

}
