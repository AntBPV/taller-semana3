import {
    NUM_CANALES
} from './tvConfig.js';

import {
    mostrarEstatica,
    ocultarEstatica,
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


// ======================================================
// DEPENDENCIAS
// ======================================================

const video =
    obtenerVideo();


// ======================================================
// ESTADO
// ======================================================

let canalActual = 0;

let reproduciendo = false;


// Identificador para evitar que una carga antigua
// interfiera con un cambio de canal posterior.

let cambioCanalID = 0;


// ======================================================
// REPRODUCIR
// ======================================================

async function reproducir() {

    // Quitar estática
    ocultarEstatica();

    detenerAudioEstatica();


    // El canal siempre comienza desde cero
    video.currentTime = 0;

    try {

        await video.play();

        reproduciendo = true;


        // Reproducir audio del canal
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


// ======================================================
// PAUSAR
// ======================================================

function pausar() {

    // Detener completamente el vídeo
    video.pause();

    video.currentTime = 0;


    // Detener completamente el audio
    detenerAudio();


    reproduciendo = false;


    // Volver a estática
    mostrarEstatica();

    reproducirAudioEstatica();
}


// ======================================================
// PLAY / PAUSA
// ======================================================

async function toggleReproduccion() {

    if (reproduciendo) {

        pausar();

    } else {

        await reproducir();
    }
}


// ======================================================
// CAMBIAR CANAL
// ======================================================

function cambiarCanal(direccion) {

    const estabaReproduciendo =
        reproduciendo;


    // Crear identificador para esta operación.
    //
    // Si el usuario vuelve a cambiar de canal
    // antes de terminar la carga, podremos detectar
    // que esta operación ya quedó obsoleta.

    const cambioActual =
        ++cambioCanalID;


    // --------------------------------------------------
    // Detener canal actual
    // --------------------------------------------------

    video.pause();

    video.currentTime = 0;

    detenerAudio();

    reproduciendo = false;


    // --------------------------------------------------
    // Mostrar estática
    // --------------------------------------------------

    mostrarEstatica();

    reproducirAudioEstatica();


    // --------------------------------------------------
    // Calcular nuevo canal
    // --------------------------------------------------

    canalActual += direccion;


    if (canalActual < 0) {

        canalActual =
            NUM_CANALES - 1;
    }


    if (canalActual >= NUM_CANALES) {

        canalActual = 0;
    }


    console.log(
        `Cargando canal ${canalActual + 1}`
    );


    // --------------------------------------------------
    // Cambiar vídeo
    // --------------------------------------------------

    cambiarVideo(canalActual);


    // --------------------------------------------------
    // Preparar audio
    // --------------------------------------------------

    cargarAudio(canalActual);


    // --------------------------------------------------
    // Esperar al vídeo
    // --------------------------------------------------

    video.addEventListener(
        'canplay',

        async () => {

            // Si ya ocurrió otro cambio de canal,
            // esta carga dejó de ser válida.

            if (
                cambioActual !== cambioCanalID
            ) {
                return;
            }


            // Si el televisor estaba reproduciendo
            // antes del cambio, continuar.

            if (!estabaReproduciendo) {
                return;
            }


            ocultarEstatica();

            detenerAudioEstatica();

            video.currentTime = 0;


            try {

                await video.play();


                // Comprobar nuevamente que esta
                // operación sigue siendo válida.

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


// ======================================================
// ESTADO
// ======================================================

function obtenerEstado() {

    return {
        canal: canalActual + 1,
        reproduciendo: reproduciendo
    };
}


export {
    reproducir,
    pausar,
    toggleReproduccion,
    cambiarCanal,
    obtenerEstado
};