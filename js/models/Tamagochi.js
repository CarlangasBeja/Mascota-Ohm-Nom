/**
 * ============================================================
 * MODELO TAMAGOCHI
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Representar únicamente el estado de la mascota.
 *
 * SOLID - SRP:
 * Esta clase solamente almacena información de la mascota.
 *
 * IMPORTANTE:
 * Se eliminó el Singleton porque cada jugador debe poder tener
 * una instancia independiente de Tamagochi.
 */
class Tamagochi {

    constructor(nombre) {

        this.peso = 5.0;
        this.nivel = 1;
        this.vida = 100;
        this.felicidad = 10;

        this.nombre = nombre;

        this.necesidadBano = false;
        this.dormir = false;

        // Cantidad de veces que ha comido antes de ir al baño.
        this.count = 0;

        // Estado visual.
        this.state = '😀';

        // Hambre de 0 a 10.
        this.hambre = 0;

        // Cantidad de veces que ha jugado desde la última comida.
        this.countJugadas = 0;

        // Indica si necesita comida.
        this.necesidadComida = false;

        // Evitan repetir advertencias constantemente.
        this.advertenciaHambre = false;
        this.advertenciaVida = false;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getNivel() {
        return this.nivel;
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }

    getVida() {
        return this.vida;
    }

    setVida(vida) {
        this.vida = Math.max(0, Math.min(100, vida));
    }

    getPeso() {
        return this.peso;
    }

    setPeso(peso) {
        this.peso = Math.max(0, peso);
    }

    getFelicidad() {
        return this.felicidad;
    }

    setFelicidad(felicidad) {
        this.felicidad = Math.max(0, Math.min(10, felicidad));
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    isDormir() {
        return this.dormir;
    }

    setDormir(dormir) {
        this.dormir = dormir;
    }

    getNecesidadBano() {
        return this.necesidadBano;
    }

    setNecesidadBano(necesidadBano) {
        this.necesidadBano = necesidadBano;
    }

    getCount() {
        return this.count;
    }

    setCount(count) {
        this.count = Math.max(0, count);
    }

    getHambre() {
        return this.hambre;
    }

    setHambre(hambre) {
        this.hambre = Math.max(0, Math.min(10, hambre));
    }

    getCountJugadas() {
        return this.countJugadas;
    }

    setCountJugadas(countJugadas) {
        this.countJugadas = Math.max(0, countJugadas);
    }

    getNecesidadComida() {
        return this.necesidadComida;
    }

    setNecesidadComida(valor) {
        this.necesidadComida = valor;
    }

    getAdvertenciaHambre() {
        return this.advertenciaHambre;
    }

    setAdvertenciaHambre(valor) {
        this.advertenciaHambre = valor;
    }

    getAdvertenciaVida() {
        return this.advertenciaVida;
    }

    setAdvertenciaVida(valor) {
        this.advertenciaVida = valor;
    }
}