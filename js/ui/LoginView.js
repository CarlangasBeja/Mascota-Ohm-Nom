/*
 * ============================================================
 * VISTA: LOGIN
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Leer y modificar únicamente los elementos visuales
 * correspondientes al inicio de sesión y creación de mascota.
 *
 * SOLID - SRP.
 */

/**
 * ============================================================
 * VISTA DEL LOGIN
 * ============================================================
 *
 * SRP:
 * Solamente administra elementos visuales del login.
 */
class LoginView {

    obtenerLogin() {

        return {
            username:
                document.getElementById(
                    'username'
                ).value,

            password:
                document.getElementById(
                    'password'
                ).value
        };
    }

    obtenerNuevaPartida() {

        return {
            username:
                document.getElementById(
                    'newUsername'
                ).value,

            password:
                document.getElementById(
                    'newPassword'
                ).value,

            confirmPassword:
                document.getElementById(
                    'confirmPassword'
                ).value,

            petName:
                document.getElementById(
                    'petName'
                ).value
        };
    }

    limpiarNuevaPartida() {

        this.establecerValor(
            'newUsername',
            ''
        );

        this.establecerValor(
            'newPassword',
            ''
        );

        this.establecerValor(
            'confirmPassword',
            ''
        );

        this.establecerValor(
            'petName',
            ''
        );
    }

    limpiarLogin() {

        this.establecerValor(
            'username',
            ''
        );

        this.establecerValor(
            'password',
            ''
        );
    }

    limpiarContrasenasCreacion() {

        this.establecerValor(
            'newPassword',
            ''
        );

        this.establecerValor(
            'confirmPassword',
            ''
        );
    }

    mostrarLogin() {

        const login =
            document.getElementById(
                'loginForm'
            );

        const creacion =
            document.getElementById(
                'createPetForm'
            );

        if (login) {
            login.style.display = 'block';
        }

        if (creacion) {
            creacion.style.display = 'none';
        }
    }

    mostrarCreacion() {

        const login =
            document.getElementById(
                'loginForm'
            );

        const creacion =
            document.getElementById(
                'createPetForm'
            );

        if (login) {
            login.style.display = 'none';
        }

        if (creacion) {
            creacion.style.display = 'block';
        }
    }

    establecerValor(id, valor) {

        const elemento =
            document.getElementById(id);

        if (elemento) {
            elemento.value = valor;
        }
    }
}