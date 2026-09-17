import {
    NUM_CANALES
} from './tvConfig.js';

import {
    mostrarEstatica,
    ocultarEstatica,
    mostrarApagada,
    cambiarVideo,
    obtenerVideo
} from './tvMedia.js';

import {
    cargarAudio,
    reproducirAudio,
    detenerAudio,
    reproducirAudioEstatica,
    detenerAudioEstatica
} from './tvAudio.js';

import {
    encenderLuzTV,
    apagarLuzTV
} from './tvLights.js';

const video = obtenerVideo();

let canalActual = 0;
let reproduciendo = false;
let encendida = true;

let cambioCanalID = 0;

async function reproducir() {
    if (!encendida) {
        return false;
    }

    ocultarEstatica();

    detenerAudioEstatica();

    video.currentTime = 0;

    try {
        await video.play();
        reproduciendo = true;

        reproducirAudio(canalActual);

        return true;
    } catch (error) {

        console.error(
            'No se pudo reproducir el vídeo:',
            error
        );

        reproduciendo = false;
        mostrarEstatica();
        reproducirAudioEstatica();
        return false;
    }
}

function pausar() {
    video.pause();

    video.currentTime = 0;

    detenerAudio();

    reproduciendo = false;

    mostrarEstatica();

    reproducirAudioEstatica();
}

async function toggleReproduccion() {
    if (!encendida) {
        return;
    }

    if (reproduciendo) {
        pausar();
    } else {
        await reproducir();
    }
}

function alternarEncendido() {

    encendida = !encendida;

    if (encendida) {

        encenderLuzTV();

        mostrarEstatica();

        reproducirAudioEstatica();

        reproduciendo = false;

        return;
    }

    video.pause();
    video.currentTime = 0;

    detenerAudio();
    detenerAudioEstatica();
    mostrarApagada();
    apagarLuzTV();

    reproduciendo = false;
}

function cambiarCanal(direccion) {
    if (!encendida) {
        return;
    }

    const estabaReproduciendo = reproduciendo;

    const cambioActual = ++cambioCanalID;

    video.pause();
    video.currentTime = 0;

    detenerAudio();

    reproduciendo = false;

    mostrarEstatica();
    reproducirAudioEstatica();

    canalActual += direccion;

    if (canalActual < 0) {
        canalActual = NUM_CANALES - 1;
    }

    if (canalActual >= NUM_CANALES) {
        canalActual = 0;
    }

    // console.log(
    //     `Cargando canal ${canalActual + 1}`
    // );

    cambiarVideo(canalActual);
    cargarAudio(canalActual);

    video.addEventListener(
        'canplay',
        async () => {
            if (
                cambioActual !== cambioCanalID
            ) {
                return;
            }

            if (!estabaReproduciendo) {
                return;
            }

            ocultarEstatica();
            detenerAudioEstatica();
            video.currentTime = 0;

            try {
                await video.play();

                if (
                    cambioActual !==
                    cambioCanalID
                ) {
                    video.pause();
                    return;
                }

                reproduciendo = true;
                reproducirAudio(canalActual);

            } catch (error) {
                console.error(
                    'No se pudo reproducir el vídeo:',
                    error
                );
                mostrarEstatica();
                reproducirAudioEstatica();
            }
        },
        {
            once: true
        }
    );
}

function obtenerEstado() {
    return {
        canal: canalActual + 1,
        reproduciendo: reproduciendo,
        encendida: encendida
    };
}

export {
    reproducir,
    pausar,
    toggleReproduccion,
    cambiarCanal,
    alternarEncendido,
    obtenerEstado
};