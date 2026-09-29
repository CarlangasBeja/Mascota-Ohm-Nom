// ============================================================
// GAME CONTROLLER
// ============================================================
// Coordina las acciones de la interfaz con los Services.
//
// SOLID:
// - SRP: coordina las acciones del juego.
// - DIP: trabaja con Services y Repository abstraídos.
// - No contiene las reglas internas de la mascota.
// ============================================================

/**
 * ============================================================
 * CONTROLADOR PRINCIPAL DEL JUEGO
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Coordinar las acciones del usuario.
 *
 * Las reglas de negocio permanecen en MascotaService.
 */
class GameController {

    constructor(
        gameService,
        playerService,
        gameView,
        messageService,
        navigationController,
        sessionRepository
    ) {

        this.gameService =
            gameService;

        this.playerService =
            playerService;

        this.gameView =
            gameView;

        this.messageService =
            messageService;

        this.navigationController =
            navigationController;

        this.sessionRepository =
            sessionRepository;

        // Se asigna desde Guardados.js después de crear TimerService.
        this.timerService = null;
    }

    setTimerService(timerService) {

        this.timerService =
            timerService;
    }

    /**
     * Reconstruye los objetos almacenados como JSON.
     */
    cargarJugador() {

        const partida =
            this.sessionRepository
                .obtener();

        if (!partida) {
            return null;
        }

        if (
            !partida.mascota ||
            !partida.nombre
        ) {
            return null;
        }

        const mascota =
            new Tamagochi(
                partida.mascota.nombre
            );

        mascota.setNivel(
            partida.mascota.nivel ?? 1
        );

        mascota.setPeso(
            partida.mascota.peso ?? 5
        );

        mascota.setVida(
            partida.mascota.vida ?? 100
        );

        mascota.setFelicidad(
            partida.mascota.felicidad ?? 10
        );

        mascota.setNecesidadBano(
            partida.mascota.necesidadBano ??
            false
        );

        mascota.setDormir(
            partida.mascota.dormir ??
            false
        );

        mascota.setCount(
            partida.mascota.count ?? 0
        );

        mascota.setState(
            partida.mascota.state ?? '😀'
        );

        // Nuevos atributos con compatibilidad
        // con partidas antiguas.
        mascota.setHambre(
            partida.mascota.hambre ?? 0
        );

        mascota.setCountJugadas(
            partida.mascota.countJugadas ??
            0
        );

        mascota.setNecesidadComida(
            partida.mascota.necesidadComida ??
            false
        );

        mascota.setAdvertenciaHambre(
            partida.mascota.advertenciaHambre ??
            false
        );

        mascota.setAdvertenciaVida(
            partida.mascota.advertenciaVida ??
            false
        );

        const jugador =
            new Jugador(
                partida.nombre,
                mascota,
                partida.clave
            );

        jugador.setPrimeraConexion(
            partida.primeraConexion ?? null
        );

        return jugador;
    }

    cargarDatos() {

        const jugador =
            this.cargarJugador();

        if (!jugador) {
            return null;
        }

        this.gameView
            .actualizar(jugador);

        this.messageService
            .mostrar();

        const mascota =
            jugador.getMascota();

        /**
         * Si cargamos una partida antigua que ya estaba
         * en estado crítico, mostramos la advertencia.
         */
        if (
            mascota.getVida() <= 10 &&
            mascota.getVida() > 0 &&
            !mascota.getAdvertenciaVida()
        ) {

            mascota.setAdvertenciaVida(
                true
            );

            this.messageService.agregar(
                'La mascota está a punto de morir.'
            );

            this.guardarSesion(
                jugador
            );
        }

        return jugador;
    }

    jugar(jugador) {

        const resultado =
            this.gameService
                .jugar(jugador);

        this.procesarResultado(
            resultado,
            jugador
        );

        this.guardarSesion(
            jugador
        );

        this.gameView
            .actualizar(jugador);
    }

    comer(jugador) {

        const resultado =
            this.gameService
                .comer(jugador);

        this.procesarResultado(
            resultado,
            jugador
        );

        this.guardarSesion(
            jugador
        );

        this.gameView
            .actualizar(jugador);
    }

    dormir(jugador) {

        const mascota =
            jugador.getMascota();

        if (mascota.getVida() <= 0) {
            return;
        }

        if (mascota.isDormir()) {

            mascota.setDormir(
                false
            );

        } else {

            this.messageService
                .agregar(
                    'Ya no puede dormir, le haces daño.'
                );

            const resultado =
                this.gameService
                    .lastimar(jugador);

            this.procesarResultado(
                resultado,
                jugador
            );
        }

        this.guardarSesion(
            jugador
        );

        this.gameView
            .actualizar(jugador);
    }

    usarBanio(jugador) {

        const mascota =
            jugador.getMascota();

        if (mascota.getVida() <= 0) {
            return;
        }

        if (
            mascota.getNecesidadBano()
        ) {

            const resultado =
                this.gameService
                    .banio(jugador);

            this.procesarResultado(
                resultado,
                jugador
            );

        } else {

            this.messageService
                .agregar(
                    'Ya no quiere ir al baño, déjalo salir.'
                );

            const resultado =
                this.gameService
                    .lastimar(jugador);

            this.procesarResultado(
                resultado,
                jugador
            );
        }

        this.guardarSesion(
            jugador
        );

        this.gameView
            .actualizar(jugador);
    }

    guardar(jugador) {

        this.gameService
            .guardar(jugador);

        alert(
            'Se ha guardado su progreso'
        );
    }

    salir(jugador) {

        if (
            window.confirm(
                'Antes de salir, ¿quiere guardar su progreso actual?'
            )
        ) {

            this.gameService
                .guardar(jugador);
        }

        this.sessionRepository
            .limpiar();

        this.navigationController
            .cerrarSesion();
    }

    guardarSesion(jugador) {

        this.sessionRepository
            .guardar(jugador);
    }

    /**
     * Procesa mensajes devueltos por los servicios.
     *
     * El controlador NO calcula vida ni hambre.
     */
    procesarResultado(
        resultado,
        jugador
    ) {

        if (!resultado) {
            return;
        }

        if (resultado.mensaje) {

            this.messageService
                .agregar(
                    resultado.mensaje
                );
        }

        if (
            Array.isArray(
                resultado.mensajes
            )
        ) {

            resultado.mensajes
                .forEach(mensaje => {

                    this.messageService
                        .agregar(mensaje);
                });
        }

        if (resultado.muerte) {

            this.manejarMuerte(
                jugador
            );
        }
    }

    /**
     * Recuperamos el comportamiento original:
     * una mascota muerta elimina su partida.
     */
    manejarMuerte(jugador) {

        if (this.timerService) {

            this.timerService
                .detener();
        }

        this.gameService
            .eliminar(jugador);

        this.messageService
            .limpiar();

        alert(
            'La mascota perdió toda su vida. La partida será eliminada.'
        );

        window.location.href =
            'MenuPrincipal.html';
    }
}