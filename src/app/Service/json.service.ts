import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 2d4b8422-c7f4-4b1d-8b73-439bba7af688'
    })
  }
  private jsonPerfiles = "assets/Perfiles.json";

  constructor(private http: HttpClient) { }

  getJsonPerfiles(): Observable<any>{
    return this.http.get(this.jsonPerfiles);
  }

  registrarPerfil(listaPerfil:any) {
    console.log(listaPerfil);
    this.http.post(this.jsonPerfiles,listaPerfil,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }
}
