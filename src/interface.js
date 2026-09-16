// ======================================================
// INTERFAZ
// ======================================================

function crearInterfaz(
    toggleReproduccion,
    cambiarCanal,
    obtenerEstado
) {

    const interfaz =
        document.createElement('div');

    interfaz.style.position = 'fixed';
    interfaz.style.top = '20px';
    interfaz.style.left = '20px';
    interfaz.style.color = 'white';
    interfaz.style.fontFamily = 'Arial';
    interfaz.style.zIndex = '10';

    document.body.appendChild(interfaz);

    function actualizarInterfaz() {

        const estado =
            obtenerEstado();

        interfaz.innerHTML = `

            <div style="margin-bottom:10px;">
                Canal:
                <strong>
                    ${estado.canal}
                </strong>
            </div>

            <div style="margin-bottom:10px;">
                Estado:
                ${
                    estado.reproduciendo
                        ? '▶ Reproduciendo'
                        : '📺 Estática'
                }
            </div>

            <button id="playButton">
                ${
                    estado.reproduciendo
                        ? '⏸ Pausar'
                        : '▶ Reproducir'
                }
            </button>

            <button id="previousButton">
                ◀ CH-
            </button>

            <button id="nextButton">
                CH+ ▶
            </button>

            <div style="margin-top:10px;">
                Q / E = cambiar canal
            </div>

            <div>
                WASD = mover cámara
            </div>
        `;

        document
            .getElementById('playButton')
            .addEventListener(
                'click',
                async () => {

                    await toggleReproduccion();

                    actualizarInterfaz();
                }
            );

        document
            .getElementById('previousButton')
            .addEventListener(
                'click',
                () => {

                    cambiarCanal(-1);

                    actualizarInterfaz();
                }
            );

        document
            .getElementById('nextButton')
            .addEventListener(
                'click',
                () => {

                    cambiarCanal(1);

                    actualizarInterfaz();
                }
            );
    }

    actualizarInterfaz();

    return {
        actualizar: actualizarInterfaz
    };
}

export {
    crearInterfaz
};