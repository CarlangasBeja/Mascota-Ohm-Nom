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

class GameController {

    constructor(
        gameService,
        playerService,
        gameView,
        messageRepository,
        messageView,
        navigationController
    ) {

        this.gameService = gameService;

        this.playerService = playerService;

        this.gameView = gameView;

        this.messageRepository = messageRepository;

        this.messageView = messageView;

        this.navigationController =
            navigationController;
    }


    // ========================================================
    // CARGAR JUGADOR
    // ========================================================

    cargarJugador() {

        const data =
            localStorage.getItem('partidaJugador');

        if (!data) {
            return null;
        }


        const partida =
            JSON.parse(data);


        const mascota =
            new Tamagochi(
                partida.mascota.nombre
            );


        mascota.setNivel(
            partida.mascota.nivel
        );

        mascota.setPeso(
            partida.mascota.peso
        );

        mascota.setVida(
            partida.mascota.vida
        );

        mascota.setFelicidad(
            partida.mascota.felicidad
        );

        mascota.setNecesidadBano(
            partida.mascota.necesidadBano
        );

        mascota.setNecesidadComida(
            partida.mascota.necesidadComida || false
        );

        mascota.setDormir(
            partida.mascota.dormir
        );

        mascota.setCount(
            partida.mascota.count
        );

        mascota.setCountJugadas(
            partida.mascota.countJugadas || 0
        );

        mascota.setState(
            partida.mascota.state
        );


        const jugador =
            new Jugador(
                partida.nombre,
                mascota,
                partida.clave
            );


        jugador.setPrimeraConexion(
            partida.primeraConexion
        );


        return jugador;
    }


    // ========================================================
    // CARGAR DATOS
    // ========================================================

    cargarDatos() {

        const jugador =
            this.cargarJugador();

        if (!jugador) {
            return null;
        }


        this.gameView.actualizar(jugador);

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );


        return jugador;
    }


    // ========================================================
    // JUGAR
    // ========================================================

    jugar(jugador) {

        this.gameService.jugar(jugador);

        this.guardarSesion(jugador);

        this.gameView.actualizar(jugador);


        // Si ya jugó 3 veces, mostramos hambre.
        if (jugador.getMascota().getNecesidadComida()) {

            this.agregarMensaje(
                `${jugador.getMascota().getNombre()} tiene hambre, necesita comer.`
            );
        }
    }


    // ========================================================
    // COMER
    // ========================================================

    comer(jugador) {

        const mascota =
            jugador.getMascota();


        // Si todavía no está necesitada de baño,
        // puede comer.
        if (mascota.getCount() < 4) {

            this.gameService.comer(jugador);

            // Comer satisface el hambre.
            mascota.setNecesidadComida(false);

            // Reiniciamos contador de juegos.
            mascota.setCountJugadas(0);

            this.guardarSesion(jugador);

            this.gameView.actualizar(jugador);


            this.agregarMensaje(
                `${mascota.getNombre()} ha comido y recuperó un poco de vida.`
            );


        } else {

            this.agregarMensaje(
                'Ya no puede comer, quiere ir al baño.'
            );

            mascota.setNecesidadBano(true);

            this.gameService.lastimar(jugador);

            this.gameView.actualizar(jugador);
        }
    }


    // ========================================================
    // DORMIR
    // ========================================================

    dormir(jugador) {

        const mascota =
            jugador.getMascota();


        if (mascota.isDormir()) {

            mascota.setDormir(false);

            this.gameService.dormir(jugador);

            this.guardarSesion(jugador);

            this.gameView.actualizar(jugador);


        } else {

            this.agregarMensaje(
                'La mascota no tiene sueño.'
            );

            this.gameService.lastimar(jugador);

            this.gameView.actualizar(jugador);
        }
    }


    // ========================================================
    // BAÑO
    // ========================================================

    usarBanio(jugador) {

        const mascota =
            jugador.getMascota();


        if (mascota.getNecesidadBano()) {

            this.gameService.banio(jugador);

            this.guardarSesion(jugador);

            this.gameView.actualizar(jugador);


        } else {

            this.agregarMensaje(
                'Ya no quiere ir al baño.'
            );

            this.gameService.lastimar(jugador);

            this.gameView.actualizar(jugador);
        }
    }


    // ========================================================
    // GUARDAR
    // ========================================================

    guardar(jugador) {

        this.gameService.guardar(jugador);

        alert(
            'Se ha guardado su progreso'
        );
    }


    // ========================================================
    // SALIR
    // ========================================================

    salir(jugador) {

        if (
            window.confirm(
                'Antes de salir quiere guardar su progreso actual?'
            )
        ) {

            this.gameService.guardar(jugador);
        }


        this.navigationController.cerrarSesion();
    }


    // ========================================================
    // GUARDAR SESIÓN ACTUAL
    // ========================================================

    guardarSesion(jugador) {

        localStorage.setItem(
            'partidaJugador',
            JSON.stringify(jugador)
        );
    }


    // ========================================================
    // MENSAJES
    // ========================================================

    agregarMensaje(mensaje) {

        this.messageRepository.guardar(
            mensaje
        );

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );
    }
}