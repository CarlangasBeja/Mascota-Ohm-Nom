/*
 * ============================================================
 * REPOSITORIOS
 * ============================================================
 */

const playerRepository =
    new LocalStoragePlayerRepository();

const messageRepository =
    new LocalStorageMessageRepository();


/*
 * ============================================================
 * SERVICIOS
 * ============================================================
 */

const playerService =
    new PlayerService(playerRepository);

const mascotaService =
    new MascotaService();

const gameService =
    new GameService(
        playerService,
        mascotaService
    );


/*
 * ============================================================
 * VISTAS
 * ============================================================
 */

const gameView =
    new GameView();

const messageView =
    new MessageView();

const loginView =
    new LoginView();


/*
 * ============================================================
 * CONTROLADORES
 * ============================================================
 */

const navigationController =
    new NavigationController(
        messageRepository,
        messageView
    );

const gameController =
    new GameController(
        gameService,
        playerService,
        gameView,
        messageRepository,
        messageView,
        navigationController
    );

const loginController =
    new LoginController(
        playerService,
        loginView
    );


/*
 * ============================================================
 * TIMER
 * ============================================================
 */

const timerService =
    new TimerService(
        mascotaService,
        gameView,
        messageRepository,
        messageView
    );


/*
 * ============================================================
 * FACHADA GUARDADOS
 * ============================================================
 *
 * Guardados sirve como punto de entrada para los HTML.
 *
 * Por ejemplo, cuando el HTML hace:
 *
 *     onclick="guardados.goToDormir()"
 *
 * Guardados recibe la llamada y la delega al
 * NavigationController.
 *
 * Esto permite que el HTML no tenga que conocer
 * directamente los controladores internos.
 * ============================================================
 */

class Guardados {

    constructor() {

        /*
         * Jugador actualmente cargado.
         */

        this.jugador = null;


        /*
         * Guardamos las dependencias como propiedades.
         */

        this.playerService =
            playerService;

        this.mascotaService =
            mascotaService;

        this.gameService =
            gameService;

        this.gameController =
            gameController;

        this.loginController =
            loginController;

        this.loginView =
            loginView;

        this.navigationController =
            navigationController;

        this.messageRepository =
            messageRepository;

        this.messageView =
            messageView;

        this.timerService =
            timerService;

    }


    /*
     * ========================================================
     * CARGAR DATOS
     * ========================================================
     */

    cargarDatos() {

        this.jugador =
            this.gameController.cargarDatos();

        if (this.jugador) {

            this.timerService.iniciar(
                this.jugador
            );

        }

    }


    /*
     * ========================================================
     * ACCIONES DE LA MASCOTA
     * ========================================================
     */

    accionarBotonesDidacticos(accion) {

        /*
         * Si no tenemos jugador cargado,
         * intentamos cargarlo.
         */

        if (!this.jugador) {

            this.jugador =
                this.gameController.cargarJugador();

        }


        /*
         * Si no existe una partida,
         * no hacemos nada.
         */

        if (!this.jugador) {

            return;

        }


        switch (accion) {

            case 'jugar':

                this.gameController.jugar(
                    this.jugador
                );

                break;


            case 'comer':

                this.gameController.comer(
                    this.jugador
                );

                break;


            case 'dormir':

                this.gameController.dormir(
                    this.jugador
                );

                break;


            case 'usarBanio':

                this.gameController.usarBanio(
                    this.jugador
                );

                break;


            case 'guardar':

                this.gameController.guardar(
                    this.jugador
                );

                break;


            case 'salir':

                this.gameController.salir(
                    this.jugador
                );

                break;


            default:

                console.log(
                    'Opción no reconocida: ' + accion
                );

        }

    }


    /*
     * ========================================================
     * LOGIN
     * ========================================================
     */

    login() {

        this.loginController.login();

    }


    /*
     * ========================================================
     * CREAR PARTIDA
     * ========================================================
     */

    crearPartida() {

        this.loginController.crearPartida();

    }


    /*
     * ========================================================
     * NAVEGACIÓN
     * ========================================================
     *
     * Estos métodos son necesarios porque los HTML utilizan:
     *
     * guardados.goToDormir()
     * guardados.goToSalaPrincipal()
     * guardados.goToComer()
     * guardados.goToBanio()
     * guardados.goToJugar()
     *
     * ========================================================
     */

    goToDormir() {

        this.navigationController.goToDormir();

    }


    goToSalaPrincipal() {

        this.navigationController.goToSalaPrincipal();

    }


    goToComer() {

        this.navigationController.goToComer();

    }


    goToBanio() {

        this.navigationController.goToBanio();

    }


    goToJugar() {

        this.navigationController.goToJugar();

    }


    /*
     * ========================================================
     * CERRAR SESIÓN
     * ========================================================
     */

    cerrarSesion() {

        this.navigationController.cerrarSesion();

    }


    /*
     * ========================================================
     * MENSAJES
     * ========================================================
     */

    guardarMensaje(mensaje) {

        this.messageRepository.guardar(
            mensaje
        );

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );

    }


    mostrarMensajesEnDiv() {

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );

    }


    /*
     * ========================================================
     * ELIMINAR PARTIDA
     * ========================================================
     */

    eliminarPartida(jugador) {

        this.gameService.eliminar(
            jugador
        );

        this.navigationController.cerrarSesion();

    }

}


/*
 * ============================================================
 * FUNCIONES GLOBALES
 * ============================================================
 *
 * Se mantienen para compatibilidad con los HTML originales.
 * ============================================================
 */

function guardarMensaje(mensaje) {

    messageRepository.guardar(
        mensaje
    );

    messageView.mostrar(
        messageRepository.obtenerTodos()
    );

}


function mostrarMensajesEnDiv() {

    messageView.mostrar(
        messageRepository.obtenerTodos()
    );

}


function eliminarPartida(jugador) {

    gameService.eliminar(
        jugador
    );

    navigationController.cerrarSesion();

}


function goToDormir() {

    navigationController.goToDormir();

}


function goToSalaPrincipal() {

    navigationController.goToSalaPrincipal();

}


function goToComer() {

    navigationController.goToComer();

}


function goToBanio() {

    navigationController.goToBanio();

}


function goToJugar() {

    navigationController.goToJugar();

}


function cerrarSesion() {

    navigationController.cerrarSesion();

}


function toggleCreatePetForm() {

    loginView.mostrarCreacion();

}


function goBackToLogin() {

    loginController.volverLogin();

}


function showLoading() {

    const loading =
        document.getElementById(
            'loadingOverlay'
        );

    if (loading) {

        loading.style.display = 'flex';

    }

}


function hideLoading() {

    const loading =
        document.getElementById(
            'loadingOverlay'
        );

    if (loading) {

        loading.style.display = 'none';

    }

}