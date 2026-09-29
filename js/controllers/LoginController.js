/*
 * ============================================================
 * CONTROLADOR DE LOGIN
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Coordinar el inicio de sesión y creación de partidas.
 *
 * SOLID - SRP:
 * No contiene código de HTML detallado ni acceso directo
 * a localStorage.
 */

/**
 * ============================================================
 * CONTROLADOR DEL LOGIN
 * ============================================================
 */
class LoginController {

    constructor(
        playerService,
        loginView,
        sessionRepository
    ) {

        this.playerService =
            playerService;

        this.loginView =
            loginView;

        this.sessionRepository =
            sessionRepository;
    }

    login() {

        const datos =
            this.loginView
                .obtenerLogin();

        const jugador =
            this.playerService
                .buscarJugador(
                    datos.username
                );

        if (
            jugador &&
            jugador.clave ===
            datos.password
        ) {

            alert(
                'Inicio de sesión exitoso'
            );

            this.sessionRepository
                .guardar(jugador);

            window.location.href =
                'mascotaprincipal.html';

            return;
        }

        if (
            !this.playerService
                .hayJugadores()
        ) {

            alert(
                'No hay jugadores registrados. Regístrate primero.'
            );

            return;
        }

        alert(
            'Credenciales incorrectas. Intenta de nuevo.'
        );
    }

    crearPartida() {

        const datos =
            this.loginView
                .obtenerNuevaPartida();

        if (
            datos.username === '' ||
            datos.password === '' ||
            datos.confirmPassword === '' ||
            datos.petName === ''
        ) {

            alert(
                'Por favor rellene todos los cuadros de texto'
            );

            return;
        }

        if (
            datos.password !==
            datos.confirmPassword
        ) {

            alert(
                'La contraseña no coincide'
            );

            this.loginView
                .limpiarContrasenasCreacion();

            return;
        }

        const creada =
            this.playerService
                .crearJugador(
                    datos.username,
                    datos.petName,
                    datos.password
                );

        if (creada) {

            alert(
                'Se ha creado una nueva partida'
            );

            this.loginView
                .limpiarNuevaPartida();

            this.loginView
                .mostrarLogin();

        } else {

            alert(
                'Nombre de usuario no está disponible. Cambie a otro.'
            );
        }
    }

    mostrarCreacion() {

        this.loginView
            .mostrarCreacion();
    }

    volverLogin() {

        this.loginView
            .mostrarLogin();

        this.loginView
            .limpiarLogin();
    }
}