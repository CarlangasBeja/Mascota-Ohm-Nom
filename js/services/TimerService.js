// ============================================================
// TIMER SERVICE
// ============================================================
// Controla los eventos que ocurren automáticamente con el
// paso del tiempo.
//
// SOLID:
// - SRP: administra exclusivamente temporizadores.
// - No contiene HTML directamente.
// - Utiliza GameView para actualizar la interfaz.
// - Utiliza Repository para guardar mensajes.
// ============================================================

class TimerService {

    constructor(
        mascotaService,
        gameView,
        messageRepository,
        messageView
    ) {

        this.mascotaService =
            mascotaService;

        this.gameView =
            gameView;

        this.messageRepository =
            messageRepository;

        this.messageView =
            messageView;

        this.intervalos = [];
    }


    // ========================================================
    // INICIAR TEMPORIZADORES
    // ========================================================

    iniciar(jugador) {

        this.detener();

        const mascota =
            jugador.getMascota();


        // ====================================================
        // FELICIDAD
        // ====================================================
        // Cada 30 segundos disminuye un punto.
        // ====================================================

        const felicidadInterval =
            setInterval(() => {

                if (mascota.getFelicidad() > 0) {

                    mascota.setFelicidad(
                        mascota.getFelicidad() - 1
                    );


                    if (mascota.getFelicidad() < 4) {

                        this.agregarMensaje(
                            `${mascota.getNombre()} está con niveles bajos de felicidad.`
                        );
                    }


                    this.mascotaService.actualizarEstado(
                        mascota
                    );


                    this.gameView.actualizar(
                        jugador
                    );


                    if (mascota.getFelicidad() === 0) {

                        this.agregarMensaje(
                            `${mascota.getNombre()} está sin felicidad.`
                        );
                    }
                }

            }, 30000);


        this.intervalos.push(
            felicidadInterval
        );


        // ====================================================
        // SUEÑO
        // ====================================================

        const dormirInterval =
            setInterval(() => {

                if (!mascota.isDormir()) {

                    mascota.setDormir(true);

                    this.agregarMensaje(
                        `${mascota.getNombre()} ya quiere dormir.`
                    );

                    this.gameView.actualizar(
                        jugador
                    );
                }

            }, 120000);


        this.intervalos.push(
            dormirInterval
        );


        // ====================================================
        // HAMBRE
        // ====================================================
        // Si la mascota jugó demasiado, comienza a perder
        // vida lentamente hasta que coma.
        // ====================================================

        const hambreInterval =
            setInterval(() => {

                if (
                    mascota.getNecesidadComida() &&
                    mascota.getVida() > 0
                ) {

                    mascota.setVida(
                        mascota.getVida() - 1
                    );


                    this.agregarMensaje(
                        `${mascota.getNombre()} tiene hambre. Necesita comer.`
                    );


                    this.gameView.actualizar(
                        jugador
                    );
                }

            }, 30000);


        this.intervalos.push(
            hambreInterval
        );


        // ====================================================
        // AGONIZAR
        // ====================================================
        // Si felicidad es muy baja, pierde vida.
        // ====================================================

        const agonizarInterval =
            setInterval(() => {

                if (
                    mascota.getFelicidad() < 4 &&
                    mascota.getVida() > 0
                ) {

                    mascota.setVida(
                        mascota.getVida() - 1
                    );


                    this.agregarMensaje(
                        `${mascota.getNombre()} está en peligro.`
                    );


                    this.gameView.actualizar(
                        jugador
                    );
                }

            }, 10000);


        this.intervalos.push(
            agonizarInterval
        );


        // ====================================================
        // RECUPERACIÓN NATURAL
        // ====================================================
        // Si está feliz y no tiene hambre, recupera lentamente.
        // ====================================================

        const recuperarInterval =
            setInterval(() => {

                if (
                    mascota.getFelicidad() >= 4 &&
                    !mascota.getNecesidadComida() &&
                    mascota.getVida() > 0 &&
                    mascota.getVida() < 100
                ) {

                    mascota.setVida(
                        mascota.getVida() + 1
                    );


                    this.gameView.actualizar(
                        jugador
                    );
                }

            }, 10000);


        this.intervalos.push(
            recuperarInterval
        );


        // ====================================================
        // GUARDADO AUTOMÁTICO
        // ====================================================

        const guardadoInterval =
            setInterval(() => {

                localStorage.setItem(
                    'partidaJugador',
                    JSON.stringify(jugador)
                );

            }, 500);


        this.intervalos.push(
            guardadoInterval
        );
    }


    // ========================================================
    // AGREGAR MENSAJE
    // ========================================================

    agregarMensaje(mensaje) {

        this.messageRepository.guardar(
            mensaje
        );

        this.messageView.mostrar(
            this.messageRepository.obtenerTodos()
        );
    }


    // ========================================================
    // DETENER TEMPORIZADORES
    // ========================================================

    detener() {

        this.intervalos.forEach(
            intervalo => clearInterval(intervalo)
        );

        this.intervalos = [];
    }
}