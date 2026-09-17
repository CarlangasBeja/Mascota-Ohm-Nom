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

class NavigationController {

    constructor(messageRepository, messageView) {

        this.messageRepository = messageRepository;

        this.messageView = messageView;

    }


    /*
     * ========================================================
     * MÉTODO GENERAL DE NAVEGACIÓN
     * ========================================================
     *
     * Guarda un mensaje indicando a qué habitación se ingresó
     * y posteriormente cambia de página.
     */

    navegar(pagina, mensaje) {

        this.messageRepository.guardar(
            mensaje
        );

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );

        window.location.href = pagina;

    }


    /*
     * ========================================================
     * IR A DORMIR
     * ========================================================
     */

    goToDormir() {

        this.navegar(
            'SalaDormir.html',
            'dormitorio'
        );

    }


    /*
     * ========================================================
     * IR A LA SALA PRINCIPAL
     * ========================================================
     *
     * IMPORTANTE:
     * La sala principal es mascotaprincipal.html.
     *
     * MenuPrincipal.html es el LOGIN.
     */

    goToSalaPrincipal() {

        this.navegar(
            'mascotaprincipal.html',
            'Sala Principal'
        );

    }


    /*
     * ========================================================
     * IR A LA COCINA
     * ========================================================
     */

    goToComer() {

        this.navegar(
            'Cocina.html',
            'comedor'
        );

    }


    /*
     * ========================================================
     * IR AL BAÑO
     * ========================================================
     */

    goToBanio() {

        this.navegar(
            'Banio.html',
            'Cuarto de baño'
        );

    }


    /*
     * ========================================================
     * IR AL PATIO
     * ========================================================
     */

    goToJugar() {

        this.navegar(
            'Patio.html',
            'Patio'
        );

    }


    /*
     * ========================================================
     * CERRAR SESIÓN
     * ========================================================
     *
     * Al cerrar sesión regresamos al LOGIN.
     *
     * Por eso la página correcta es:
     * MenuPrincipal.html
     */

    cerrarSesion() {

        this.messageRepository.limpiar();

        window.location.href =
            'MenuPrincipal.html';

    }

}