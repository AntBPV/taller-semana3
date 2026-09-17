import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './style.css';

import {
    scene,
    camera,
    renderer
} from './scene.js';

import {
    inicializarTV,
    obtenerEstado
} from './tv.js';

import {
    crearInterfaz
} from './interface.js';

import {
    inicializarCamaras,
    usarCamaraMain,
    usarCamaraClose,
    usarCamaraFar
} from './camera.js';

import {
    inicializarRemoto,
    actualizarRemoto
} from './remote.js';

// Loader - Escena desde Blender
const loader = new GLTFLoader();

loader.load(
    '/assets/models/scene.glb',
(gltf) => {
    const modelo = gltf.scene;
    scene.add(modelo);
    inicializarCamaras(modelo);
    usarCamaraMain(camera);
    inicializarRemoto();

    // Loggear objetos del .glb
    // modelo.traverse((objeto) => {
    //     console.log(
    //         objeto.type,
    //         objeto.name
    //     );
    // });

    const screen =
        modelo.getObjectByName(
            'TV-Screen'
        );

    const cameraMain =
        modelo.getObjectByName('Camera_Main');

    const cameraClose =
        modelo.getObjectByName('Camera_Close');

    const cameraFar =
        modelo.getObjectByName('Camera_Far');

    const tvLed =
        modelo.getObjectByName(
            'TV-LED'
        );

    // console.log('Camera Main:', cameraMain);
    // console.log('Camera Close:', cameraClose);
    // console.log('Camera Far:', cameraFar);

    inicializarTV(
        camera,
        screen,
        tvLed
    );
},
    undefined,
    (error) => {
        console.error(
            'Error cargando scene.glb:',
            error
        );
    }
);

// Interfaz HTML + Teclado
const interfaz =
    crearInterfaz(
        obtenerEstado
    );
setInterval(
    () => {
        interfaz.actualizar();
    },
    100
);

window.addEventListener(
    'keydown',
    async (event) => {
        switch (
            event.key.toLowerCase()
        ) {
            case ' ':
                event.preventDefault();
                await toggleReproduccion();
                interfaz.actualizar();
                break;

            // Camara
            case '1':
                usarCamaraMain(camera);
                break;

            case '2':
                usarCamaraClose(camera);
                break;

            case '3':
                usarCamaraFar(camera);
                break;
        }
    }
);

function animate() {
    requestAnimationFrame(animate);
    actualizarRemoto();
    renderer.render(
        scene,
        camera
    );
}

animate();