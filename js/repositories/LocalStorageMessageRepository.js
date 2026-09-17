/*
 * ============================================================
 * REPOSITORIO DE MENSAJES
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Manejar únicamente los mensajes almacenados.
 *
 * SOLID - SRP:
 * No conoce las reglas del Tamagochi.
 *
 * SOLID - DIP:
 * La aplicación puede trabajar contra IMessageRepository
 * en lugar de depender directamente de localStorage.
 */

class LocalStorageMessageRepository extends IMessageRepository {

    constructor() {
        super();

        this.storageKey = 'mensajes';
    }

    obtenerTodos() {

        const data = localStorage.getItem(this.storageKey);

        return data ? JSON.parse(data) : [];
    }

    guardar(mensaje) {

        const mensajes = this.obtenerTodos();

        mensajes.push(mensaje);

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(mensajes)
        );
    }

    limpiar() {
        localStorage.removeItem(this.storageKey);
    }
}