import { Usuario } from '../../models/usuario.model';
// importamos todas las acciones (tambien podriamos en este caso llamar solo a usuarios.actions)
import * as fromUsuarios from '../actions';

export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

// Montamos el switch con todas las acciones
export function usuariosReducer( state = estadoInicial, action: fromUsuarios.usuariosAcciones ): UsuariosState {
    switch ( action.type ) {
        case fromUsuarios.CARGAR_USUARIOS:
            return {
                ...state,
                loading: true,
                error: null // limpiamos el error para que al cargar, sea reseteado si hubo algun error anterior
            };

        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state, // el estado como estaba
                loading: false, // desmarcamos el loading porque terminó de cargar
                loaded: true, // marcamos como que ya lo cargamos
                users: [...action.usuarios] // usamos el operador spread, para asegurarnos de romper la referencia
            };

        case fromUsuarios.CARGAR_USUARIOS_FAIL:
            return {
                ...state, // el estado como estaba
                loading: false, // desmarcamos el loading porque terminó de cargar
                loaded: false, // marcamos como que ya lo cargamos, con error, pero terminamos de cargarlo
                error: { // guardamos las propiedades del error que nos interesan, no hacen falta todas :)
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        // SIEMPRE tiene que haber un default que retorne el state
        default:
            return state;
    }
}

