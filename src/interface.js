function crearInterfaz(
    obtenerEstado
) {
    const interfaz = document.createElement('div');

    interfaz.style.position = 'fixed';
    interfaz.style.top = '20px';
    interfaz.style.left = '20px';
    interfaz.style.color = 'white';
    interfaz.style.fontFamily = 'Arial';
    interfaz.style.zIndex = '10';

    document.body.appendChild(interfaz);

    function actualizarInterfaz() {

        const estado = obtenerEstado();

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
                    !estado.encendida
                        ? '⚫ Apagado'
                        : estado.reproduciendo
                            ? '▶ Reproduciendo'
                            : '📺 Estática'
                }
            </div>

            <div style="margin-top:15px;">
                <strong>Controles de cámara</strong>
            </div>

            <div style="margin-top:5px;">
                1 = Cámara principal
            </div>

            <div>
                2 = Cámara cercana
            </div>

            <div>
                3 = Cámara lejana
            </div>
        `;
    }

    actualizarInterfaz();

    return {
        actualizar: actualizarInterfaz
    };
}

export {
    crearInterfaz
};
