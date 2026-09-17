let cameraMain = null;
let cameraClose = null;
let cameraFar = null;

let cameraActiva = null;

function inicializarCamaras(modelo) {

    cameraMain =
        modelo.getObjectByName(
            'Camera_Main'
        );

    cameraClose =
        modelo.getObjectByName(
            'Camera_Close'
        );

    cameraFar =
        modelo.getObjectByName(
            'Camera_Far'
        );

    cameraActiva = cameraMain;

    // console.log(
    //     'Cámaras inicializadas:',
    //     cameraMain,
    //     cameraClose,
    //     cameraFar
    // );
}

function cambiarCamara(
    camaraDestino,
    camera
) {

    if (!camaraDestino) return;

    // Copiar posición
    camera.position.copy(
        camaraDestino.position
    );

    // Copiar rotación
    camera.quaternion.copy(
        camaraDestino.quaternion
    );

    // Copiar FOV
    if (
        camera.isPerspectiveCamera &&
        camaraDestino.isPerspectiveCamera
    ) {

        camera.fov =
            camaraDestino.fov;

        camera.updateProjectionMatrix();
    }

    cameraActiva =
        camaraDestino;
}

function usarCamaraMain(camera) {
    cambiarCamara(
        cameraMain,
        camera
    );
}

function usarCamaraClose(camera) {
    cambiarCamara(
        cameraClose,
        camera
    );
}

function usarCamaraFar(camera) {
    cambiarCamara(
        cameraFar,
        camera
    );
}

export {
    inicializarCamaras,
    usarCamaraMain,
    usarCamaraClose,
    usarCamaraFar
};