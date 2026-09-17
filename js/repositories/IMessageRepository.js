/*
 * ============================================================
 * ABSTRACCIÓN: IMessageRepository
 * ============================================================
 *
 * SOLID - ISP:
 * Los mensajes tienen su propio contrato.
 *
 * Esto evita que una clase tenga que depender de operaciones
 * que no necesita.
 */

class IMessageRepository {

    obtenerTodos() {
        throw new Error("Método obtenerTodos no implementado.");
    }

    guardar(mensaje) {
        throw new Error("Método guardar no implementado.");
    }

    limpiar() {
        throw new Error("Método limpiar no implementado.");
    }
}