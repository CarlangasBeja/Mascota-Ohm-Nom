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

/**
 * ============================================================
 * SERVICIO DE TEMPORIZADORES
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Administrar exclusivamente eventos automáticos basados
 * en tiempo.
 *
 * IMPORTANTE:
 * Ya NO existe recuperación automática de vida.
 */
class TimerService {

    constructor(
        mascotaService,
        gameView,
        messageService,
        sessionRepository
    ) {

        this.mascotaService =
            mascotaService;

        this.gameView =
            gameView;

        this.messageService =
            messageService;

        this.sessionRepository =
            sessionRepository;

        this.intervalos = [];

        this.onMuerte = null;
    }

    setOnMuerte(callback) {

        this.onMuerte =
            callback;
    }

    iniciar(jugador) {

        this.detener();

        const mascota =
            jugador.getMascota();

        /**
         * ==========================================
         * REDUCCIÓN DE FELICIDAD
         * ==========================================
         */
        const felicidadInterval =
            setInterval(() => {

                if (
                    mascota.getVida() <= 0
                ) {
                    return;
                }

                if (
                    mascota.getFelicidad() > 0
                ) {

                    mascota.setFelicidad(
                        mascota.getFelicidad() - 1
                    );

                    this.mascotaService
                        .actualizarEstado(
                            mascota
                        );

                    if (
                        mascota.getFelicidad() < 4 &&
                        mascota.getFelicidad() > 0
                    ) {

                        this.messageService
                            .agregar(
                                `${mascota.getNombre()} está con niveles bajos de felicidad`
                            );
                    }

                    if (
                        mascota.getFelicidad() === 0
                    ) {

                        this.messageService
                            .agregar(
                                `${mascota.getNombre()} está sin felicidad`
                            );
                    }

                    this.gameView
                        .actualizar(jugador);
                }

            }, 30000);

        this.intervalos.push(
            felicidadInterval
        );

        /**
         * ==========================================
         * NECESIDAD DE DORMIR
         * ==========================================
         */
        const dormirInterval =
            setInterval(() => {

                if (
                    mascota.getVida() <= 0
                ) {
                    return;
                }

                if (
                    !mascota.isDormir()
                ) {

                    mascota.setDormir(
                        true
                    );

                    this.messageService
                        .agregar(
                            `${mascota.getNombre()} ya quiere dormir`
                        );

                    this.gameView
                        .actualizar(jugador);
                }

            }, 120000);

        this.intervalos.push(
            dormirInterval
        );

        /**
         * ==========================================
         * PÉRDIDA DE VIDA POR FELICIDAD BAJA
         * ==========================================
         */
        const agonizarInterval =
            setInterval(() => {

                if (
                    mascota.getVida() <= 0
                ) {
                    return;
                }

                if (
                    mascota.getFelicidad() < 4
                ) {

                    const resultado =
                        this.mascotaService
                            .lastimar(jugador);

                    this.messageService
                        .agregar(
                            `${mascota.getNombre()} está perdiendo vida por su baja felicidad`
                        );

                    if (
                        Array.isArray(
                            resultado.mensajes
                        )
                    ) {

                        resultado.mensajes
                            .forEach(mensaje => {

                                this.messageService
                                    .agregar(
                                        mensaje
                                    );
                            });
                    }

                    this.gameView
                        .actualizar(jugador);

                    if (
                        resultado.muerte
                    ) {

                        this.detener();

                        if (
                            typeof this.onMuerte ===
                            'function'
                        ) {

                            this.onMuerte(
                                jugador
                            );
                        }
                    }
                }

            }, 10000);

        this.intervalos.push(
            agonizarInterval
        );

        /**
         * ==========================================
         * GUARDADO AUTOMÁTICO DE SESIÓN
         * ==========================================
         *
         * DIP:
         * TimerService ya no conoce localStorage.
         */
        const guardadoInterval =
            setInterval(() => {

                if (
                    mascota.getVida() > 0
                ) {

                    this.sessionRepository
                        .guardar(jugador);
                }

            }, 500);

        this.intervalos.push(
            guardadoInterval
        );

        /*
         * IMPORTANTE:
         *
         * Se eliminó por completo el antiguo intervalo
         * recuperarVida.
         *
         * Ahora la mascota recupera vida únicamente
         * mediante la acción de comer.
         */
    }

    detener() {

        this.intervalos
            .forEach(intervalo => {

                clearInterval(
                    intervalo
                );
            });

        this.intervalos = [];
    }
}