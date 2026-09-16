import * as THREE from 'three';

import {
    videoSources,
    staticVideoSource
} from './tvConfig.js';


// ======================================================
// VÍDEO DEL CANAL
// ======================================================

const video = document.createElement('video');

video.loop = true;
video.muted = true;
video.playsInline = true;
video.preload = 'auto';

video.src = videoSources[0];
video.load();


// ======================================================
// VÍDEO DE ESTÁTICA
// ======================================================

const staticVideo = document.createElement('video');

staticVideo.src = staticVideoSource;
staticVideo.loop = true;
staticVideo.muted = true;
staticVideo.playsInline = true;
staticVideo.preload = 'auto';

staticVideo.load();


// ======================================================
// TEXTURAS
// ======================================================

const videoTexture =
    new THREE.VideoTexture(video);

videoTexture.colorSpace =
    THREE.SRGBColorSpace;

const staticTexture =
    new THREE.VideoTexture(staticVideo);

staticTexture.colorSpace =
    THREE.SRGBColorSpace;


// ======================================================
// PANTALLA
// ======================================================

const geometry =
    new THREE.PlaneGeometry(4, 2.25);

const material =
    new THREE.MeshBasicMaterial({
        map: staticTexture,
        side: THREE.DoubleSide
    });

const pantalla =
    new THREE.Mesh(
        geometry,
        material
    );


// ======================================================
// ESTÁTICA
// ======================================================

function mostrarEstatica() {

    material.map = staticTexture;
    material.needsUpdate = true;

    staticVideo.currentTime = 0;

    staticVideo
        .play()
        .catch(() => {});
}


function ocultarEstatica() {

    staticVideo.pause();
    staticVideo.currentTime = 0;

    material.map = videoTexture;
    material.needsUpdate = true;
}


// ======================================================
// CAMBIAR VÍDEO
// ======================================================

function cambiarVideo(canal) {

    video.src = videoSources[canal];
    video.load();
}


// ======================================================
// GETTERS
// ======================================================

function obtenerVideo() {
    return video;
}

function obtenerStaticVideo() {
    return staticVideo;
}

function obtenerPantalla() {
    return pantalla;
}


export {
    pantalla,
    mostrarEstatica,
    ocultarEstatica,
    cambiarVideo,
    obtenerVideo,
    obtenerStaticVideo
};