import * as THREE from 'three';

// ======================================================
// ESCENA
// ======================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111111);

// ======================================================
// CÁMARA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);

// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

// ======================================================
// LUZ
// ======================================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);

// ======================================================
// RESIZE
// ======================================================

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

export {
    scene,
    camera,
    renderer
};