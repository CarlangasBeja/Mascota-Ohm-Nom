/**
 * ============================================================
 * REPOSITORIO LOCAL DE JUGADORES
 * ============================================================
 */
class LocalStoragePlayerRepository
    extends IPlayerRepository {

    constructor() {

        super();

        this.storageKey =
            'datosDelJugador';
    }

    obtenerTodos() {

        const data =
            localStorage.getItem(
                this.storageKey
            );

        try {

            return data
                ? JSON.parse(data)
                : [];

        } catch (error) {

            console.error(
                'Error leyendo jugadores:',
                error
            );

            return [];
        }
    }

    guardarTodos(jugadores) {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(jugadores)
        );
    }

    buscarPorNombre(nombre) {

        const jugadores =
            this.obtenerTodos();

        return jugadores.find(
            jugador =>
                jugador.nombre === nombre
        );
    }

    eliminarPorNombre(nombre) {

        const jugadores =
            this.obtenerTodos();

        const nuevosJugadores =
            jugadores.filter(
                jugador =>
                    jugador.nombre !== nombre
            );

        this.guardarTodos(
            nuevosJugadores
        );
    }
}