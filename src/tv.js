import { inicializarAudio } from './tv/tvAudio.js';

import {
    pantalla,
    mostrarEstatica
} from './tv/tvMedia.js';

import {
    toggleReproduccion,
    cambiarCanal,
    obtenerEstado
} from './tv/tvPlayback.js';


// ======================================================
// INICIALIZACIÓN
// ======================================================

function inicializarTV(camera) {

    inicializarAudio(camera);

    // El televisor comienza en estática.
    mostrarEstatica();
}


// ======================================================
// EXPORTACIONES
// ======================================================

export {
    pantalla,
    inicializarTV,
    toggleReproduccion,
    cambiarCanal,
    obtenerEstado
};