/**
 * ============================================================
 * CONTRATO PARA REPOSITORIO DE MENSAJES
 * ============================================================
 *
 * ISP:
 * Esta abstracción solamente contiene operaciones
 * relacionadas con mensajes.
 */
class IMessageRepository {

    obtenerTodos() {
        throw new Error(
            "Método obtenerTodos no implementado."
        );
    }

    guardar(mensaje) {
        throw new Error(
            "Método guardar no implementado."
        );
    }

    limpiar() {
        throw new Error(
            "Método limpiar no implementado."
        );
    }
}