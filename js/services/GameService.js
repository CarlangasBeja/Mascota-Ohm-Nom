// ============================================================
// GAME SERVICE
// ============================================================
// Coordina las operaciones principales del juego.
//
// SOLID:
// - SRP: coordina las operaciones del juego.
// - Delegamos el comportamiento específico de la mascota
//   a MascotaService.
// ============================================================

/**
 * ============================================================
 * SERVICIO GENERAL DEL JUEGO
 * ============================================================
 */
class GameService {

    constructor(
        playerService,
        mascotaService,
        sessionRepository
    ) {

        this.playerService =
            playerService;

        this.mascotaService =
            mascotaService;

        this.sessionRepository =
            sessionRepository;
    }

    guardar(jugador) {

        this.playerService
            .guardarJugador(jugador);

        this.sessionRepository
            .guardar(jugador);
    }

    eliminar(jugador) {

        this.playerService
            .eliminarJugador(
                jugador.getNombre()
            );

        this.sessionRepository
            .limpiar();
    }

    jugar(jugador) {

        const resultado =
            this.mascotaService
                .jugar(jugador);

        this.mascotaService
            .actualizarEstado(
                jugador.getMascota()
            );

        return resultado;
    }

    comer(jugador) {

        return this.mascotaService
            .comer(jugador);
    }

    banio(jugador) {

        return this.mascotaService
            .banio(
                jugador.getMascota()
            );
    }

    lastimar(jugador) {

        return this.mascotaService
            .lastimar(jugador);
    }
}