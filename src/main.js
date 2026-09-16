import {
    scene,
    camera,
    renderer
} from './scene.js';

import {
    pantalla,
    inicializarTV,
    toggleReproduccion,
    cambiarCanal,
    obtenerEstado
} from './tv.js';

import {
    crearInterfaz
} from './interface.js';

// ======================================================
// TELEVISOR
// ======================================================

scene.add(pantalla);

inicializarTV(camera);

// ======================================================
// INTERFAZ
// ======================================================

const interfaz =
    crearInterfaz(
        toggleReproduccion,
        cambiarCanal,
        obtenerEstado
    );

// ======================================================
// TECLADO
// ======================================================

window.addEventListener(
    'keydown',
    async (event) => {

        switch (
            event.key.toLowerCase()
        ) {

            // ------------------------------------------
            // PLAY / PAUSA
            // ------------------------------------------

            case ' ':

                event.preventDefault();

                await toggleReproduccion();

                interfaz.actualizar();

                break;

            // ------------------------------------------
            // CANALES
            // ------------------------------------------

            case 'q':

                cambiarCanal(-1);

                interfaz.actualizar();

                break;

            case 'e':

                cambiarCanal(1);

                interfaz.actualizar();

                break;

            // ------------------------------------------
            // CÁMARA
            // ------------------------------------------

            case 'w':
            case 'arrowup':

                camera.position.z -= 0.2;

                break;

            case 's':
            case 'arrowdown':

                camera.position.z += 0.2;

                break;

            case 'a':
            case 'arrowleft':

                camera.position.x -= 0.2;

                break;

            case 'd':
            case 'arrowright':

                camera.position.x += 0.2;

                break;
        }
    }
);

// ======================================================
// ANIMACIÓN
// ======================================================

function animate() {

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );
}

animate();