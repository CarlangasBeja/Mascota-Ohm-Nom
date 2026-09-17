// ============================================================
// MODELO TAMAGOCHI
// ============================================================
// Representa los datos y estado de la mascota.
//
// SOLID:
// - SRP: únicamente representa el estado de Tamagochi.
// - No contiene HTML.
// - No contiene LocalStorage.
// - No contiene navegación.
// ============================================================

class Tamagochi {

    constructor(nombre) {

        // ====================================================
        // SINGLETON
        // ====================================================
        // Garantizamos una única instancia de Tamagochi
        // durante la ejecución de la página.
        // ====================================================

        if (Tamagochi.instance instanceof Tamagochi) {
            return Tamagochi.instance;
        }


        // ====================================================
        // DATOS INICIALES
        // ====================================================

        this.peso = 5.0;

        this.nivel = 1;

        this.vida = 100;

        this.felicidad = 10;

        this.nombre = nombre;

        this.necesidadBano = false;

        this.necesidadComida = false;

        this.dormir = false;

        this.count = 0;

        this.countJugadas = 0;

        this.state = '😀';


        Tamagochi.instance = this;
    }


    // ========================================================
    // ESTADO
    // ========================================================

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }


    // ========================================================
    // NIVEL
    // ========================================================

    getNivel() {
        return this.nivel;
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }


    // ========================================================
    // VIDA
    // ========================================================

    getVida() {
        return this.vida;
    }

    setVida(vida) {

        if (vida < 0) {
            vida = 0;
        }

        if (vida > 100) {
            vida = 100;
        }

        this.vida = vida;
    }


    // ========================================================
    // PESO
    // ========================================================

    getPeso() {
        return this.peso;
    }

    setPeso(peso) {
        this.peso = peso;
    }


    // ========================================================
    // FELICIDAD
    // ========================================================

    getFelicidad() {
        return this.felicidad;
    }

    setFelicidad(felicidad) {

        if (felicidad < 0) {
            felicidad = 0;
        }

        if (felicidad > 10) {
            felicidad = 10;
        }

        this.felicidad = felicidad;
    }


    // ========================================================
    // NOMBRE
    // ========================================================

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }


    // ========================================================
    // DORMIR
    // ========================================================

    isDormir() {
        return this.dormir;
    }

    setDormir(dormir) {
        this.dormir = dormir;
    }


    // ========================================================
    // NECESIDAD DE BAÑO
    // ========================================================

    getNecesidadBano() {
        return this.necesidadBano;
    }

    setNecesidadBano(necesidadBano) {
        this.necesidadBano = necesidadBano;
    }


    // ========================================================
    // CONTADOR DE COMIDAS
    // ========================================================

    getCount() {
        return this.count;
    }

    setCount(count) {
        this.count = count;
    }


    // ========================================================
    // NECESIDAD DE COMIDA
    // ========================================================

    getNecesidadComida() {
        return this.necesidadComida;
    }

    setNecesidadComida(necesidadComida) {
        this.necesidadComida = necesidadComida;
    }


    // ========================================================
    // CONTADOR DE JUEGOS
    // ========================================================

    getCountJugadas() {
        return this.countJugadas;
    }

    setCountJugadas(countJugadas) {
        this.countJugadas = countJugadas;
    }
}