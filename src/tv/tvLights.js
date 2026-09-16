import * as THREE from 'three';

let tvLight = null;
let tvLed = null;

function inicializarLuces(
    scene,
    objetoPantalla,
    objetoLed
) {
    // PointLight del televisor
    tvLight = new THREE.PointLight(
        0xffffff,
        10,
        8
    );
    tvLight.position.set(
        0,
        0,
        0.1
    );
    objetoPantalla.add(tvLight);

    // Led decorador
    tvLed = objetoLed;
    tvLed.material.color.set(
        0xff0000
    );

    // AreaLight de la escena
    const areaLight =
        new THREE.RectAreaLight(
            0xCCE9FF,
            20,
            3.5,
            3.5
        );
    areaLight.position.set(
        0,
        7,
        4
    );
    areaLight.lookAt(
        0,
        0,
        7
    );
    scene.add(areaLight);
}

function encenderLuzTV() {
    if (tvLight) {
        tvLight.intensity = 10;
    }
    if (tvLed) {
        tvLed.material.color.set(
            0xff0000
        );
    }
}

function apagarLuzTV() {
    if (tvLight) {
        tvLight.intensity = 0;
    }
    if (tvLed) {
        tvLed.material.color.set(
            0x000000
        );
    }
}

export {
    inicializarLuces,
    encenderLuzTV,
    apagarLuzTV
};