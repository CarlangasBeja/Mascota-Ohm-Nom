/**
 * ============================================================
 * CONTRATO DEL REPOSITORIO DE SESIÓN
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Definir las operaciones necesarias para administrar
 * la sesión actual del jugador.
 *
 * SOLID:
 * SRP -> solamente representa operaciones de sesión.
 * ISP -> interfaz pequeña y específica.
 * DIP -> controladores y servicios pueden depender de esta
 *        abstracción y no directamente de localStorage.
 */
class ISessionRepository {

    obtener() {
        throw new Error(
            "Método obtener no implementado."
        );
    }

    guardar(jugador) {
        throw new Error(
            "Método guardar no implementado."
        );
    }

    limpiar() {
        throw new Error(
            "Método limpiar no implementado."
        );
    }
}