import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as usuarioActions from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  user: Usuario;
  loading: boolean;
  error: any;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      const id = params['id']; // obtenemos el id de la ruta activa
      this.store.dispatch( new usuarioActions.CargarUsuario(id) ); // cargamos el usuario por el id mediante una accion
    });

    // Nos subcribiremos al store para estar pendientes cuando cambia el objeto user
    // Obtenemos las propiedades del nodo de usuario del store
    this.store.select('usuario').subscribe( usuario => {
      this.user = usuario.user; 
      this.loading = usuario.loading;
      this.error = usuario.error;
    });
  }
}
