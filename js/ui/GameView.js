// ============================================================
// GAME VIEW
// ============================================================
// Esta clase se encarga ÚNICAMENTE de actualizar la interfaz.
//
// SOLID:
// - SRP: responsabilidad exclusiva de la presentación.
// - No modifica directamente la lógica de la mascota.
// - No guarda información.
// ============================================================

/**
 * ============================================================
 * VISTA DEL JUEGO
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Mostrar el estado actual de la mascota.
 */
class GameView {

    actualizar(jugador) {

        if (!jugador) {
            return;
        }

        const mascota =
            jugador.getMascota();

        const text1 =
            document.getElementById(
                'text1'
            );

        const estado =
            document.getElementById(
                'textEstado'
            );

        const vida =
            document.getElementById(
                'text2'
            );

        const felicidad =
            document.getElementById(
                'text3'
            );

        const peso =
            document.getElementById(
                'text4'
            );

        const bano =
            document.getElementById(
                'text5'
            );

        const dormir =
            document.getElementById(
                'text6'
            );

        if (text1) {

            text1.innerText =
                'Level: ' +
                mascota.getNivel();
        }

        const nombre =
            document.getElementById(
                'textoEncima'
            );

        if (nombre) {

            nombre.innerText =
                mascota.getNombre();
        }

        const usuario =
            document.getElementById(
                'textoEsquina'
            );

        if (usuario) {

            usuario.innerText =
                'Usuario: ' +
                jugador.getNombre();
        }

        if (estado) {

            estado.innerText =
                'Estado: ' +
                mascota.getState();
        }

        if (vida) {

            vida.innerHTML =
                `<img src="imagenes/corazonPixeles.png" alt="Vida"> ${mascota.getVida()}`;
        }

        if (felicidad) {

            felicidad.innerHTML =
                `<img src="imagenes/felicidadPixeles.png" alt="Felicidad"> ${mascota.getFelicidad()}`;
        }

        if (peso) {

            peso.innerHTML =
                `<img src="imagenes/pesoPixel.png" alt="Peso"> ${mascota.getPeso().toFixed(1)}`;
        }

        if (bano) {

            if (
                mascota.getNecesidadBano()
            ) {

                bano.innerHTML =
                    `<img src="imagenes/vistoPixel.png" alt="Sí"> Quiere ir al baño`;

            } else {

                bano.innerHTML =
                    `<img src="imagenes/xPixel.png" alt="No"> No quiere ir al baño`;
            }
        }

        if (dormir) {

            if (mascota.isDormir()) {

                dormir.innerHTML =
                    `<img src="imagenes/vistoPixel.png" alt="Sí"> Quiere dormir`;

            } else {

                dormir.innerHTML =
                    `<img src="imagenes/xPixel.png" alt="No"> No quiere ir a dormir`;
            }
        }
    }
}