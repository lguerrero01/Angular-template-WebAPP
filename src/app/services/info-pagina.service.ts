import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada= false;
  equipo: any[] = [];

  constructor(private http: HttpClient) { 
    this.cargarEquipo();
    this.cargarInfo();
    


  }

  private cargarInfo() {
    console.log("hola")
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {

          this.cargada= true;
          this.info = resp;
        });
  }

  private cargarEquipo() {
    console.log("hola desde cargar equipo")
    this.http.get('https://portafolioprueba-280fd.firebaseio.com/equipo.json')
        .subscribe( (resp: any[]) => {
          this.equipo = resp;
        });
    
  }

}
