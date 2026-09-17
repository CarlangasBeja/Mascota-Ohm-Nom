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

class LoginView {

    obtenerLogin() {

        return {
            username:
                document.getElementById('username').value,

            password:
                document.getElementById('password').value
        };
    }

    obtenerNuevaPartida() {

        return {
            username:
                document.getElementById('newUsername').value,

            password:
                document.getElementById('newPassword').value,

            confirmPassword:
                document.getElementById('confirmPassword').value,

            petName:
                document.getElementById('petName').value
        };
    }

    limpiarNuevaPartida() {

        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('petName').value = '';
    }

    mostrarLogin() {

        document.getElementById('loginForm')
            .style.display = 'block';

        document.getElementById('createPetForm')
            .style.display = 'none';
    }

    mostrarCreacion() {

        document.getElementById('loginForm')
            .style.display = 'none';

        document.getElementById('createPetForm')
            .style.display = 'block';
    }
}