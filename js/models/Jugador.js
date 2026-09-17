/*
 * ============================================================
 * MODELO: JUGADOR
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Representar la información del jugador y su mascota.
 *
 * SOLID - SRP:
 * La clase solamente representa el modelo del jugador.
 *
 * No guarda información directamente en localStorage.
 * No modifica HTML.
 * No controla temporizadores.
 */

class Jugador {

    constructor(nombre, mascota, clave) {

        this.nombre = nombre;

        /*
         * Se mantiene la relación original:
         * un jugador posee una mascota.
         */
        this.mascota = mascota instanceof Tamagochi
            ? mascota
            : new Tamagochi(mascota);

        this.clave = clave;
        this.primeraConexion = null;

        /*
         * Se conserva el Observer existente del proyecto.
         */
        this.observadores = [];

        Jugador.instancia = this;
    }

    getClave() {
        return this.clave;
    }

    setClave(clave) {
        this.clave = clave;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getMascota() {
        return this.mascota;
    }

    getPrimeraConexion() {
        return this.primeraConexion;
    }

    setPrimeraConexion(primeraConexion) {
        this.primeraConexion = primeraConexion;
    }

    agregarObservador(observador) {
        this.observadores.push(observador);
    }

    eliminarObservador(observador) {

        const index = this.observadores.indexOf(observador);

        if (index > -1) {
            this.observadores.splice(index, 1);
        }
    }

    notificarObservadores() {

        this.observadores.forEach(observador => {
            observador.update();
        });
    }
}