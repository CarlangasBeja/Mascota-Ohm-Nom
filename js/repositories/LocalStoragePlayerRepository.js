/*
 * ============================================================
 * REPOSITORIO DE JUGADORES
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Únicamente manejar los jugadores almacenados en localStorage.
 *
 * SOLID - SRP:
 * No contiene reglas del juego.
 *
 * SOLID - DIP:
 * Implementa el contrato IPlayerRepository.
 */

class LocalStoragePlayerRepository extends IPlayerRepository {

    constructor() {
        super();

        this.storageKey = 'datosDelJugador';
    }

    obtenerTodos() {

        const data = localStorage.getItem(this.storageKey);

        return data ? JSON.parse(data) : [];
    }

    guardarTodos(jugadores) {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(jugadores)
        );
    }

    buscarPorNombre(nombre) {

        const jugadores = this.obtenerTodos();

        return jugadores.find(
            jugador => jugador.nombre === nombre
        );
    }

    eliminarPorNombre(nombre) {

        const jugadores = this.obtenerTodos();

        const nuevosJugadores = jugadores.filter(
            jugador => jugador.nombre !== nombre
        );

        this.guardarTodos(nuevosJugadores);
    }
}