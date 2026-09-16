import * as THREE from 'three';

import {
    audioSources,
    staticAudioSource,
    NUM_CANALES
} from './tvConfig.js';

import { pantalla } from './tvMedia.js';


// ======================================================
// ESTADO
// ======================================================

let listener = null;

let sound = null;

let staticSound = null;

const audioLoader =
    new THREE.AudioLoader();

const audioBuffers = [];


// ======================================================
// CONFIGURAR AUDIO ESPACIAL
// ======================================================

function configurarAudioEspacial(audio) {

    audio.setRefDistance(2);

    audio.setMaxDistance(15);

    audio.setRolloffFactor(1);

    audio.setLoop(true);

    audio.setVolume(0.8);
}


// ======================================================
// INICIALIZAR AUDIO
// ======================================================

function inicializarAudio(camera) {

    listener =
        new THREE.AudioListener();

    camera.add(listener);


    // --------------------------------------------------
    // Audio de los canales
    // --------------------------------------------------

    sound =
        new THREE.PositionalAudio(
            listener
        );

    configurarAudioEspacial(sound);

    pantalla.add(sound);


    // --------------------------------------------------
    // Audio de estática
    // --------------------------------------------------

    staticSound =
        new THREE.PositionalAudio(
            listener
        );

    configurarAudioEspacial(staticSound);

    pantalla.add(staticSound);


    // --------------------------------------------------
    // Cargar estática
    // --------------------------------------------------

    audioLoader.load(
        staticAudioSource,

        (buffer) => {

            staticSound.setBuffer(buffer);

            // El televisor comienza
            // mostrando estática.
            staticSound.play();
        },

        undefined,

        (error) => {

            console.error(
                'No se pudo cargar el audio de estática:',
                error
            );
        }
    );


    // --------------------------------------------------
    // Cargar audios de canales
    // --------------------------------------------------

    for (
        let i = 0;
        i < NUM_CANALES;
        i++
    ) {

        cargarAudio(i);
    }
}


// ======================================================
// CARGAR AUDIO DE UN CANAL
// ======================================================

function cargarAudio(canal) {

    if (audioBuffers[canal]) {
        return;
    }

    audioLoader.load(
        audioSources[canal],

        (buffer) => {

            audioBuffers[canal] = buffer;
        },

        undefined,

        (error) => {

            console.error(
                `No se pudo cargar el audio del canal ${canal + 1}:`,
                error
            );
        }
    );
}


// ======================================================
// REPRODUCIR AUDIO DEL CANAL
// ======================================================

function reproducirAudio(canal) {

    if (!sound) {
        return;
    }

    const buffer =
        audioBuffers[canal];

    if (!buffer) {
        return;
    }

    sound.setBuffer(buffer);

    sound.play();
}


// ======================================================
// DETENER AUDIO DEL CANAL
// ======================================================

function detenerAudio() {

    if (
        sound &&
        sound.isPlaying
    ) {
        sound.stop();
    }
}


// ======================================================
// REPRODUCIR ESTÁTICA
// ======================================================

function reproducirAudioEstatica() {

    if (
        staticSound &&
        staticSound.buffer &&
        !staticSound.isPlaying
    ) {
        staticSound.play();
    }
}


// ======================================================
// DETENER AUDIO DE ESTÁTICA
// ======================================================

function detenerAudioEstatica() {

    if (
        staticSound &&
        staticSound.isPlaying
    ) {
        staticSound.stop();
    }
}


export {
    inicializarAudio,
    cargarAudio,
    reproducirAudio,
    detenerAudio,
    reproducirAudioEstatica,
    detenerAudioEstatica
};