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

class GameView {

    actualizar(jugador) {

        const mascota = jugador.getMascota();


        // ====================================================
        // NIVEL
        // ====================================================

        const text1 = document.getElementById('text1');

        if (text1) {

            text1.innerText =
                'Level: ' + mascota.getNivel();
        }


        // ====================================================
        // NOMBRE DE LA MASCOTA
        // ====================================================

        const nombre =
            document.getElementById('textoEncima');

        if (nombre) {

            nombre.innerText =
                mascota.getNombre();
        }


        // ====================================================
        // NOMBRE DEL JUGADOR
        // ====================================================

        const usuario =
            document.getElementById('textoEsquina');

        if (usuario) {

            usuario.innerText =
                'Usuario: ' + jugador.getNombre();
        }


        // ====================================================
        // ESTADO
        // ====================================================

        const estado =
            document.getElementById('textEstado');

        if (estado) {

            estado.innerText =
                'Estado: ' + mascota.getState();
        }


        // ====================================================
        // VIDA
        // ====================================================

        const vida =
            document.getElementById('text2');

        if (vida) {

            vida.innerHTML =
                `<img src="imagenes/corazonPixeles.png"
                      alt="Image 2">
                 Vida: ${mascota.getVida()}`;
        }


        // ====================================================
        // FELICIDAD
        // ====================================================

        const felicidad =
            document.getElementById('text3');

        if (felicidad) {

            felicidad.innerHTML =
                `<img src="imagenes/felicidadPixeles.png"
                      alt="Image 3">
                 Felicidad: ${mascota.getFelicidad()}`;
        }


        // ====================================================
        // PESO
        // ====================================================

        const peso =
            document.getElementById('text4');

        if (peso) {

            peso.innerHTML =
                `<img src="imagenes/pesoPixel.png"
                      alt="Image 4">
                 Peso: ${mascota.getPeso().toFixed(1)}`;
        }


        // ====================================================
        // BAÑO
        // ====================================================

        const bano =
            document.getElementById('text5');

        if (bano) {

            if (mascota.getNecesidadBano()) {

                bano.innerHTML =
                    `<img src="imagenes/vistoPixel.png"
                          alt="Image 5">
                     Quiere ir al baño`;

            } else {

                bano.innerHTML =
                    `<img src="imagenes/xPixel.png"
                          alt="Image 5">
                     No quiere ir al baño`;
            }
        }


        // ====================================================
        // DORMIR
        // ====================================================

        const dormir =
            document.getElementById('text6');

        if (dormir) {

            if (mascota.isDormir()) {

                dormir.innerHTML =
                    `<img src="imagenes/vistoPixel.png"
                          alt="Image 6">
                     Quiere dormir`;

            } else {

                dormir.innerHTML =
                    `<img src="imagenes/xPixel.png"
                          alt="Image 6">
                     No quiere ir a dormir`;
            }
        }


        // ====================================================
        // NECESIDAD DE COMIDA
        // ====================================================

        const comida =
            document.getElementById('textComida');

        if (comida) {

            if (mascota.getNecesidadComida()) {

                comida.innerText =
                    '🍽️ Tiene hambre, necesita comer';

            } else {

                comida.innerText =
                    'No tiene hambre';
            }
        }


        // ====================================================
        // ADVERTENCIA DE VIDA
        // ====================================================

        const advertencia =
            document.getElementById('advertenciaVida');

        if (advertencia) {

            if (mascota.getVida() <= 10 &&
                mascota.getVida() > 0) {

                advertencia.innerText =
                    '⚠️ La mascota está a punto de morir. Necesita comer y descansar.';

                advertencia.style.display = 'block';

            } else if (mascota.getVida() <= 0) {

                advertencia.innerText =
                    '☠️ La mascota ha muerto.';

                advertencia.style.display = 'block';

            } else {

                advertencia.style.display = 'none';
            }
        }
    }
}