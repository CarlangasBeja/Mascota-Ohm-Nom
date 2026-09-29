/**
 * ============================================================
 * COMPOSICIÓN DE DEPENDENCIAS
 * ============================================================
 *
 * Aquí se crean las implementaciones concretas y se inyectan
 * a los servicios y controladores.
 */

// ============================================================
// REPOSITORIOS
// ============================================================

const playerRepository =
    new LocalStoragePlayerRepository();

const messageRepository =
    new LocalStorageMessageRepository();

const sessionRepository =
    new LocalStorageSessionRepository();


// ============================================================
// VISTAS
// ============================================================

const gameView =
    new GameView();

const messageView =
    new MessageView();

const loginView =
    new LoginView();


// ============================================================
// SERVICIOS
// ============================================================

const playerService =
    new PlayerService(
        playerRepository
    );

const mascotaService =
    new MascotaService();

const messageService =
    new MessageService(
        messageRepository,
        messageView
    );

const gameService =
    new GameService(
        playerService,
        mascotaService,
        sessionRepository
    );


// ============================================================
// CONTROLADORES
// ============================================================

const navigationController =
    new NavigationController(
        messageService
    );

const gameController =
    new GameController(
        gameService,
        playerService,
        gameView,
        messageService,
        navigationController,
        sessionRepository
    );

const loginController =
    new LoginController(
        playerService,
        loginView,
        sessionRepository
    );


// ============================================================
// TEMPORIZADORES
// ============================================================

const timerService =
    new TimerService(
        mascotaService,
        gameView,
        messageService,
        sessionRepository
    );

gameController.setTimerService(
    timerService
);

timerService.setOnMuerte(
    jugador => {

        gameController
            .manejarMuerte(jugador);
    }
);


// ============================================================
// FACHADA
// ============================================================

class Guardados {

    constructor() {

        this.jugador = null;

        /**
         * ====================================================
         * COMMAND
         * ====================================================
         *
         * Se elimina el switch.
         *
         * Cada acción está asociada a un comando.
         *
         * OCP:
         * Las acciones están desacopladas del flujo condicional
         * que anteriormente existía en un switch.
         */
        this.comandos = {

            jugar: () =>
                gameController
                    .jugar(this.jugador),

            comer: () =>
                gameController
                    .comer(this.jugador),

            dormir: () =>
                gameController
                    .dormir(this.jugador),

            usarBanio: () =>
                gameController
                    .usarBanio(
                        this.jugador
                    ),

            guardar: () =>
                gameController
                    .guardar(
                        this.jugador
                    ),

            salir: () =>
                gameController
                    .salir(
                        this.jugador
                    )
        };

        /**
         * Se mantienen como propiedades para conservar
         * compatibilidad con funciones que ya utilizabas.
         */
        this.loginController =
            loginController;

        this.gameController =
            gameController;

        this.navigationController =
            navigationController;
    }

    cargarDatos() {

        this.jugador =
            gameController
                .cargarDatos();

        if (this.jugador) {

            timerService
                .iniciar(
                    this.jugador
                );
        }
    }

    /**
     * ========================================================
     * PATRÓN COMMAND
     * ========================================================
     */
    accionarBotonesDidacticos(
        accion
    ) {

        if (!this.jugador) {

            this.jugador =
                gameController
                    .cargarJugador();
        }

        if (!this.jugador) {

            console.warn(
                'No existe una partida activa.'
            );

            return;
        }

        const comando =
            this.comandos[accion];

        if (
            typeof comando ===
            'function'
        ) {

            comando();

        } else {

            console.warn(
                `Acción no reconocida: ${accion}`
            );
        }
    }

    // ========================================================
    // LOGIN
    // ========================================================

    login() {

        loginController
            .login();
    }

    crearPartida() {

        loginController
            .crearPartida();
    }

    mostrarCreacion() {

        loginController
            .mostrarCreacion();
    }

    volverLogin() {

        loginController
            .volverLogin();
    }

    // ========================================================
    // NAVEGACIÓN
    // ========================================================

    goToDormir() {

        navigationController
            .goToDormir();
    }

    goToSalaPrincipal() {

        navigationController
            .goToSalaPrincipal();
    }

    goToComer() {

        navigationController
            .goToComer();
    }

    goToBanio() {

        navigationController
            .goToBanio();
    }

    goToJugar() {

        navigationController
            .goToJugar();
    }
}


// ============================================================
// COMPATIBILIDAD CON HTML ORIGINAL
// ============================================================

function guardarMensaje(mensaje) {

    messageService
        .agregar(mensaje);
}

function mostrarMensajesEnDiv() {

    messageService
        .mostrar();
}

function eliminarPartida(jugador) {

    timerService
        .detener();

    gameService
        .eliminar(jugador);

    messageService
        .limpiar();

    window.location.href =
        'MenuPrincipal.html';
}


// ============================================================
// FUNCIONES DE NAVEGACIÓN ORIGINALES
// ============================================================

function goToDormir() {

    navigationController
        .goToDormir();
}

function goToSalaPrincipal() {

    navigationController
        .goToSalaPrincipal();
}

function goToComer() {

    navigationController
        .goToComer();
}

function goToBanio() {

    navigationController
        .goToBanio();
}

function goToJugar() {

    navigationController
        .goToJugar();
}

function cerrarSesion() {

    sessionRepository
        .limpiar();

    navigationController
        .cerrarSesion();
}


// ============================================================
// LOGIN
// ============================================================

function toggleCreatePetForm() {

    loginController
        .mostrarCreacion();
}

function goBackToLogin() {

    loginController
        .volverLogin();
}


// ============================================================
// LOADING
// ============================================================

function showLoading() {

    const loading =
        document.getElementById(
            'loadingOverlay'
        );

    if (loading) {

        loading.style.display =
            'flex';
    }
}

function hideLoading() {

    const loading =
        document.getElementById(
            'loadingOverlay'
        );

    if (loading) {

        loading.style.display =
            'none';
    }
}