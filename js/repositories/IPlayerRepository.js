/*
 * ============================================================
 * ABSTRACCIÓN: IPlayerRepository
 * ============================================================
 *
 * SOLID - DIP:
 * La aplicación no debe depender directamente de localStorage.
 *
 * SOLID - ISP:
 * Este contrato solamente representa operaciones relacionadas
 * con jugadores.
 *
 * JavaScript no tiene interfaces nativas como C# o Java,
 * por eso utilizamos una clase abstracta como contrato.
 */

class IPlayerRepository {

    obtenerTodos() {
        throw new Error("Método obtenerTodos no implementado.");
    }

    guardarTodos(jugadores) {
        throw new Error("Método guardarTodos no implementado.");
    }

    buscarPorNombre(nombre) {
        throw new Error("Método buscarPorNombre no implementado.");
    }

    eliminarPorNombre(nombre) {
        throw new Error("Método eliminarPorNombre no implementado.");
    }
}