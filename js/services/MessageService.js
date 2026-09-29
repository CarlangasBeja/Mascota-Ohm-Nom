/**
 * ============================================================
 * SERVICIO DE MENSAJES
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Centralizar el registro y visualización de mensajes.
 *
 * SRP:
 * Toda la coordinación de mensajes queda aquí.
 *
 * DRY:
 * Evita repetir guardar + obtener + mostrar en
 * GameController, TimerService y NavigationController.
 */
class MessageService {

    constructor(
        messageRepository,
        messageView
    ) {

        this.messageRepository =
            messageRepository;

        this.messageView =
            messageView;
    }

    agregar(mensaje) {

        this.messageRepository
            .guardar(mensaje);

        this.actualizarVista();
    }

    mostrar() {
        this.actualizarVista();
    }

    limpiar() {

        this.messageRepository
            .limpiar();

        this.messageView
            .mostrar([]);
    }

    actualizarVista() {

        this.messageView.mostrar(
            this.messageRepository
                .obtenerTodos()
        );
    }
}