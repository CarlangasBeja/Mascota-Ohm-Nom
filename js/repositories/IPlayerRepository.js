/**
 * ============================================================
 * CONTRATO PARA REPOSITORIOS DE JUGADORES
 * ============================================================
 *
 * DIP:
 * Los servicios pueden trabajar contra esta abstracción.
 *
 * ISP:
 * Solamente contiene operaciones relacionadas con jugadores.
 */
class IPlayerRepository {

    obtenerTodos() {
        throw new Error(
            "Método obtenerTodos no implementado."
        );
    }

    guardarTodos(jugadores) {
        throw new Error(
            "Método guardarTodos no implementado."
        );
    }

    buscarPorNombre(nombre) {
        throw new Error(
            "Método buscarPorNombre no implementado."
        );
    }

    eliminarPorNombre(nombre) {
        throw new Error(
            "Método eliminarPorNombre no implementado."
        );
    }
}