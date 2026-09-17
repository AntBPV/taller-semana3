import * as THREE from 'three';

import {
    videoSources,
    staticVideoSource
} from './tvConfig.js';

let pantalla = null;

// Videos Principales
const video = document.createElement('video');

video.loop = true;
video.muted = true;
video.playsInline = true;
video.preload = 'auto';

video.src = videoSources[0];

// Estatica
const staticVideo = document.createElement('video');

staticVideo.loop = true;
staticVideo.muted = true;
staticVideo.playsInline = true;
staticVideo.preload = 'auto';

staticVideo.src = staticVideoSource;

// Texturas
const videoTexture =
    new THREE.VideoTexture(video);

videoTexture.colorSpace =
    THREE.SRGBColorSpace;

const staticTexture =
    new THREE.VideoTexture(staticVideo);

staticTexture.colorSpace =
    THREE.SRGBColorSpace;

function inicializarPantalla(objetoPantalla) {
    pantalla = objetoPantalla;

    pantalla.material = new THREE.MeshBasicMaterial({
            map: staticTexture,
            side: THREE.DoubleSide
        });
}

function mostrarEstatica() {

    if (!pantalla) return;

    pantalla.material.map = staticTexture;
    pantalla.material.color.set(
        0xffffff
    );
    pantalla.material.needsUpdate = true;

    staticVideo.currentTime = 0;

    staticVideo.play().catch(() => {});
}

function ocultarEstatica() {

    if (!pantalla) return;

    pantalla.material.map = videoTexture;

    pantalla.material.color.set(
        0xffffff
    );

    pantalla.material.needsUpdate = true;
}

function mostrarApagada() {

    if (!pantalla) return;

    pantalla.material.map = null;

    pantalla.material.color.set(
        0x000000
    );

    pantalla.material.needsUpdate = true;

    staticVideo.pause();
    staticVideo.currentTime = 0;

    video.pause();
    video.currentTime = 0;
}

// Cambiar video
function cambiarVideo(canal) {
    const src = videoSources[canal];

    // console.log('Cambiando vídeo a:', src);

    video.pause();
    video.src = src;
    video.load();

    // console.log('Video src:', video.src);
}

function obtenerPantalla() {
    return pantalla;
}

function obtenerVideo() {
    return video;
}

function obtenerStaticVideo() {
    return staticVideo;
}

export {
    inicializarPantalla,
    obtenerPantalla,
    mostrarEstatica,
    ocultarEstatica,
    mostrarApagada,
    cambiarVideo,
    obtenerVideo,
    obtenerStaticVideo
};