import * as THREE from 'three';

import {
    scene,
    camera
} from './scene.js';

import {
    alternarEncendido,
    toggleReproduccion,
    cambiarCanal
} from './tv.js';

import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';


let remote = null;
let remoteLight = null;

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

const REMOTE_SCALE = 0.12;

const REMOTE_DISTANCE = 1.5;

const REMOTE_OFFSET =
    new THREE.Vector3(
        0.45,
        -0.45,
        0
    );

function inicializarRemoto() {

    const loader = new GLTFLoader();

    loader.load( '/assets/models/remote.glb', (gltf) => {
            remote =
                gltf.scene;

            remote.traverse((objeto) => {
                if (!objeto.isMesh) {
                    return;
                }
                if (
                    objeto.name === 'Remote_Power' ||
                    objeto.name === 'Remote_PlayPause' ||
                    objeto.name === 'Remote_CH_Up' ||
                    objeto.name === 'Remote_CH_Down'
                ) {
                    objeto.userData.interactivo = true;
                }

            });

            remote.name = 'Remote';

            remote.scale.setScalar(REMOTE_SCALE);

            remoteLight = new THREE.PointLight(
                0xFFEDD6,
                .5,
                2
            );

            remoteLight.position.set(
                0,
                0,
                7
            );

            remote.add(remoteLight);

            scene.add(remote);

            // console.log('Control remoto cargado');
        },

        undefined,

        (error) => {

            console.error('Error cargando remote.glb:',error);
        }
    );
}

function actualizarRemoto() {
    if (!remote) return;

    const direccion = new THREE.Vector3();

    const posicion = new THREE.Vector3();

    camera.getWorldDirection(direccion);

    camera.getWorldPosition(posicion);

    remote.position.copy(posicion);

    remote.position.add(direccion.multiplyScalar(REMOTE_DISTANCE));

    const offset = REMOTE_OFFSET.clone();

    offset.applyQuaternion(camera.quaternion);

    remote.position.add(offset);

    remote.quaternion.copy(camera.quaternion);
}

function manejarClick(evento) {
    mouse.x = (evento.clientX / window.innerWidth) * 2 - 1;

    mouse.y = -(evento.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersecciones = raycaster.intersectObject(remote,true);

    if (intersecciones.length === 0) {
        return;
    }

    const objeto = intersecciones[0].object;

    if (!objeto.userData.interactivo) {
        return;
    }

    presionarBoton(objeto);

    switch (objeto.name) {

        case 'Remote_Power':
            alternarEncendido();
            break;

        case 'Remote_PlayPause':
            toggleReproduccion();
            break;

        case 'Remote_CH_Up':
            cambiarCanal(1);
            break;

        case 'Remote_CH_Down':
            cambiarCanal(-1);
            break;
    }
}

function presionarBoton(boton) {
    if (!boton) return;

    const posicionOriginal = boton.position.clone();

    boton.position.z -= 0.05;

    setTimeout(() => {
        boton.position.copy(posicionOriginal);
    }, 100);
}

window.addEventListener(
    'click',
    manejarClick,
);

export {
    inicializarRemoto,
    actualizarRemoto
};