/*
 * ============================================================
 * VISTA: MENSAJES
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Mostrar mensajes en pantalla.
 *
 * SOLID - SRP:
 * Esta clase solamente trabaja con la presentación de mensajes.
 *
 * No almacena mensajes.
 * No conoce las reglas del juego.
 */

class MessageView {

    mostrar(mensajes) {

        const mensajesDiv =
            document.getElementById('mensajes');

        if (!mensajesDiv) {
            return;
        }

        mensajesDiv.innerHTML = '';

        for (let i = mensajes.length - 1; i >= 0; i--) {

            mensajesDiv.innerHTML += mensajes[i];

            if (i > 0) {
                mensajesDiv.innerHTML += '<br>';
            }
        }
    }
}