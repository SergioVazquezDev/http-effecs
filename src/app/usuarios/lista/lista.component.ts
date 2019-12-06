import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  constructor( private store: Store<AppState> ) { } // Configuramos el store en el constructor

  ngOnInit() {
    // Obtenemos las propiedades del nodo de usuarios del store
    this.store.select('usuarios').subscribe( usuarios => {
          this.usuarios = usuarios.users;
          this.loading = usuarios.loading;
          this.error = usuarios.error;
        });

    // Lanzamos la accion que cargará los usuarios
    this.store.dispatch( new usuariosActions.CargarUsuarios() );
  }
}
