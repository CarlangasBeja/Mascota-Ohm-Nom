/**
 * ============================================================
 * MODELO JUGADOR
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Representar al jugador y su mascota.
 *
 * SOLID - SRP:
 * Solamente administra el estado correspondiente al jugador.
 */
class Jugador {

    constructor(nombre, mascota, clave) {

        this.nombre = nombre;

        this.mascota =
            mascota instanceof Tamagochi
                ? mascota
                : new Tamagochi(mascota);

        this.clave = clave;

        this.primeraConexion = null;

        this.observadores = [];
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

        const index =
            this.observadores.indexOf(observador);

        if (index > -1) {
            this.observadores.splice(index, 1);
        }
    }

    notificarObservadores() {

        this.observadores.forEach(observador => {

            if (
                observador &&
                typeof observador.update === 'function'
            ) {
                observador.update();
            }

        });
    }
}