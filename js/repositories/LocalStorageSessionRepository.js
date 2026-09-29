/**
 * ============================================================
 * REPOSITORIO DE SESIÓN EN LOCALSTORAGE
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Persistir exclusivamente la partida activa.
 *
 * DIP:
 * El resto de la aplicación no necesita conocer
 * localStorage ni la clave "partidaJugador".
 */
class LocalStorageSessionRepository
    extends ISessionRepository {

    constructor() {

        super();

        this.storageKey =
            'partidaJugador';
    }

    obtener() {

        const data =
            localStorage.getItem(
                this.storageKey
            );

        if (!data) {
            return null;
        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                'Error leyendo la sesión:',
                error
            );

            return null;
        }
    }

    guardar(jugador) {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(jugador)
        );
    }

    limpiar() {

        localStorage.removeItem(
            this.storageKey
        );
    }
}