import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { productoDescripcion } from '../../interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: productoDescripcion;
  productoId: string;
  constructor( private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
        .subscribe(parametros => {
          console.log("parametros: ", parametros.id);
          this.productoService.getProducto(parametros['id'])
              .subscribe( (respProducto: productoDescripcion) => {
                this.productoId = parametros.id;
                this.producto = respProducto;
                console.log("producto: ", this.producto.producto);
              })
        })
  }

}
