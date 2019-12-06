import { ActionReducerMap } from '@ngrx/store';
// Podemos hacerlo así xq hacemos referencia al fichero index, y éste contiene todos los reducers
import * as reducers from './reducers';

// Aqui tendremos la definicion global para mandarsela al store.module

// Como queremos que se muestre nuestro store
export interface AppState {
    // Añadimos los distintos reducers de nuestra app
    usuarios: reducers.UsuariosState;
    usuario: reducers.UsuarioState;
}

// Combinacion de todos los reducers que usan nuestro AppState
export const appReducers: ActionReducerMap<AppState> = {
    usuarios: reducers.usuariosReducer,
    usuario: reducers.usuarioReducer
};
