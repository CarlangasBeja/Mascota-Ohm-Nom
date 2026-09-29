/*
 * ============================================================
 * CONTROLADOR DE NAVEGACIÓN
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Controlar únicamente el cambio entre las interfaces
 * existentes.
 *
 * SOLID - SRP:
 * Esta clase tiene una sola responsabilidad:
 * controlar la navegación entre páginas.
 *
 * No contiene lógica del Tamagochi.
 * ============================================================
 */

/**
 * ============================================================
 * CONTROLADOR DE NAVEGACIÓN
 * ============================================================
 *
 * SRP:
 * Solamente controla navegación entre habitaciones.
 */
class NavigationController {

    constructor(messageService) {

        this.messageService =
            messageService;
    }

    navegar(pagina, mensaje) {

        this.messageService
            .agregar(mensaje);

        window.location.href =
            pagina;
    }

    goToDormir() {

        this.navegar(
            'SalaDormir.html',
            'dormitorio'
        );
    }

    goToSalaPrincipal() {

        this.navegar(
            'mascotaprincipal.html',
            'Sala Principal'
        );
    }

    goToComer() {

        this.navegar(
            'Cocina.html',
            'comedor'
        );
    }

    goToBanio() {

        this.navegar(
            'Banio.html',
            'Cuarto de baño'
        );
    }

    goToJugar() {

        this.navegar(
            'Patio.html',
            'Patio'
        );
    }

    cerrarSesion() {

        this.messageService
            .limpiar();

        window.location.href =
            'MenuPrincipal.html';
    }
}