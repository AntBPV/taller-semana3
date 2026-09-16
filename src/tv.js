import {
    inicializarPantalla,
    mostrarEstatica
} from './tv/tvMedia.js';

import {
    inicializarAudio
} from './tv/tvAudio.js';

import {
    inicializarLuces
} from './tv/tvLights.js';

import {
    toggleReproduccion,
    cambiarCanal,
    alternarEncendido,
    obtenerEstado
} from './tv/tvPlayback.js';

import {
    scene
} from './scene.js';

function inicializarTV(
    camera,
    objetoPantalla,
    objetoLed
) {

    inicializarPantalla(
        objetoPantalla
    );

    inicializarAudio(
        camera,
        objetoPantalla
    );

    inicializarLuces(
        scene,
        objetoPantalla,
        objetoLed
    );

    mostrarEstatica();
}

export {
    inicializarTV,
    toggleReproduccion,
    alternarEncendido,
    cambiarCanal,
    obtenerEstado
};