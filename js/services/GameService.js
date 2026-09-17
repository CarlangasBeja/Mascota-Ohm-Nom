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

class GameService {

    constructor(
        playerService,
        mascotaService
    ) {

        this.playerService =
            playerService;

        this.mascotaService =
            mascotaService;
    }


    // ========================================================
    // GUARDAR
    // ========================================================

    guardar(jugador) {

        this.playerService.guardarJugador(
            jugador
        );

        localStorage.setItem(
            'partidaJugador',
            JSON.stringify(jugador)
        );
    }


    // ========================================================
    // ELIMINAR
    // ========================================================

    eliminar(jugador) {

        this.playerService.eliminarJugador(
            jugador.getNombre()
        );
    }


    // ========================================================
    // JUGAR
    // ========================================================

    jugar(jugador) {

        this.mascotaService.jugar(
            jugador
        );

        this.mascotaService.actualizarEstado(
            jugador.getMascota()
        );
    }


    // ========================================================
    // COMER
    // ========================================================

    comer(jugador) {

        this.mascotaService.comer(
            jugador.getMascota()
        );
    }


    // ========================================================
    // BAÑO
    // ========================================================

    banio(jugador) {

        this.mascotaService.banio(
            jugador.getMascota()
        );
    }


    // ========================================================
    // DORMIR
    // ========================================================

    dormir(jugador) {

        this.mascotaService.dormir(
            jugador.getMascota()
        );
    }


    // ========================================================
    // LASTIMAR
    // ========================================================

    lastimar(jugador) {

        this.mascotaService.lastimar(
            jugador
        );
    }
}