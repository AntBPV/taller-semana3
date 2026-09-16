import * as THREE from 'three';

import {
    audioSources,
    staticAudioSource
} from './tvConfig.js';

let listener = null;
let sound = null;
let staticSound = null;

const audioLoader = new THREE.AudioLoader();

const audioBuffers = [];

function configurarAudioEspacial(audio) {
    audio.setRefDistance(2);
    audio.setMaxDistance(15);
    audio.setRolloffFactor(1);
    audio.setVolume(0.8);
}

function inicializarAudio(
    camera,
    objetoPantalla
) {

    listener = new THREE.AudioListener();

    camera.add(listener);

    sound = new THREE.PositionalAudio(
        listener
    );

    staticSound = new THREE.PositionalAudio(
        listener
    );

    configurarAudioEspacial(sound);
    configurarAudioEspacial(staticSound);

    objetoPantalla.add(sound);
    objetoPantalla.add(staticSound);

    audioLoader.load(
        staticAudioSource,
        (buffer) => {
            staticSound.setBuffer(buffer);
            staticSound.setLoop(true);
        }
    );

    audioSources.forEach(
        (src, index) => {
            audioLoader.load(
                src,
                (buffer) => {
                    audioBuffers[index] =
                        buffer;
                }
            );
        }
    );
}

function cargarAudio(canal) {
    return new Promise(
        (resolve, reject) => {
            if (audioBuffers[canal]) {
                resolve(
                    audioBuffers[canal]
                );
                return;
            }

            audioLoader.load(
                audioSources[canal],
                (buffer) => {
                    audioBuffers[canal] =
                        buffer;
                    resolve(buffer);
                },
                undefined,
                reject
            );
        }
    );
}

async function reproducirAudio(canal) {
    const buffer =
        await cargarAudio(canal);
    if (sound.isPlaying) {
        sound.stop();
    }

    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.play();
}

function detenerAudio() {
    if (
        sound &&
        sound.isPlaying
    ) {
        sound.stop();
    }
}

function reproducirAudioEstatica() {
    if (
        staticSound.buffer &&
        !staticSound.isPlaying
    ) {
        staticSound.play();
    }
}

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