import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos : Producto[] = []; 
  productosFiltrado: Producto[] = [];
  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise (( resolve, reject )=> {

      this.http.get('https://portafolioprueba-280fd.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando= false;            
          resolve();

      });
    });

    
  }
  public getProducto(id: string) {
    return this.http.get(`https://portafolioprueba-280fd.firebaseio.com/productos/${id}.json`)
       
  }

  public buscarProducto (termino: string){

    if(this.productos.length === 0){
      this.cargarProductos().then( ()=>{
        this.filtrarProductos( termino);
      });
    }else{
      this.filtrarProductos( termino);
    }
  }


  public filtrarProductos(termino: string){

      console.log(this.productos);

      this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino)>= 0 || tituloLower.indexOf(termino)>= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }


}
