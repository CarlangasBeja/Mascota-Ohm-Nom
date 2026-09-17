/*
 * ============================================================
 * SERVICIO: JUGADOR
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Gestionar operaciones relacionadas con jugadores.
 *
 * SOLID - SRP:
 * Las reglas para crear, buscar y eliminar jugadores están
 * separadas de la persistencia.
 *
 * SOLID - DIP:
 * Recibe un IPlayerRepository.
 *
 * No depende directamente de localStorage.
 */

class PlayerService {

    constructor(playerRepository) {

        this.playerRepository = playerRepository;
    }

    crearJugador(nombre, mascota, clave) {

        const jugadores =
            this.playerRepository.obtenerTodos();

        const existe = jugadores.some(
            jugador => jugador.nombre === nombre
        );

        if (existe) {
            return false;
        }

        const nuevoJugador =
            new Jugador(nombre, mascota, clave);

        nuevoJugador.setPrimeraConexion(
            this.fecha()
        );

        jugadores.push(nuevoJugador);

        this.playerRepository.guardarTodos(jugadores);

        return true;
    }

    buscarJugador(nombre) {

        return this.playerRepository.buscarPorNombre(
            nombre
        );
    }

    eliminarJugador(nombre) {

        this.playerRepository.eliminarPorNombre(
            nombre
        );
    }

    guardarJugador(jugador) {

        const jugadores =
            this.playerRepository.obtenerTodos();

        const index = jugadores.findIndex(
            jugadorGuardado =>
                jugadorGuardado.nombre === jugador.getNombre()
        );

        if (index !== -1) {

            jugadores[index] = jugador;

            this.playerRepository.guardarTodos(jugadores);
        }
    }

    fecha() {

        const fecha = new Date();

        const formato = new Intl.DateTimeFormat(
            'es-ES',
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
        );

        return formato.format(fecha);
    }
}