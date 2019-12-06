import { UsuariosEffects } from './usuarios.effects';
import { UsuarioEffects } from './usuario.effects';

// Arreglo con todos los effectos de nuestra app, que pasaremos al app.module.ts
// Si no añadimos el effecto aqui, no se lanzará al lanzarse la accion
export const effectsArr: any[] = [ UsuariosEffects,
                                   UsuarioEffects ];

export * from './usuarios.effects';
export * from './usuario.effects';

// Centralizamos todos los ficheros de effects en este index