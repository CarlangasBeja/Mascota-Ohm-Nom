// ============================================================
// MASCOTA SERVICE
// ============================================================
// Este Service contiene la lógica relacionada con el
// comportamiento de la mascota.
//
// SOLID:
// - SRP: Esta clase tiene una responsabilidad principal:
//        controlar las acciones y estados de la mascota.
// - No maneja HTML.
// - No maneja LocalStorage.
// - No maneja navegación.
// ============================================================

/**
 * ============================================================
 * SERVICIO DE LA MASCOTA
 * ============================================================
 *
 * RESPONSABILIDAD:
 * Contener las reglas de negocio propias del Tamagochi.
 *
 * SRP:
 * Las reglas de vida, hambre, felicidad, comida y baño
 * permanecen en esta clase.
 */
class MascotaService {

    /**
     * Alimentar a la mascota.
     */
    comer(jugador) {

        const mascota =
            jugador.getMascota();

        if (mascota.getVida() <= 0) {

            return {
                permitido: false,
                mensaje:
                    'La mascota ya no puede comer.'
            };
        }

        if (mascota.getCount() >= 4) {

            mascota.setNecesidadBano(
                true
            );

            return {
                permitido: false,
                mensaje:
                    'Ya no puede comer, quiere ir al baño.'
            };
        }

        // Aumenta peso.
        mascota.setPeso(
            mascota.getPeso() + 0.6
        );

        // Cuenta las comidas.
        mascota.setCount(
            mascota.getCount() + 1
        );

        // Comer reduce hambre.
        mascota.setHambre(
            mascota.getHambre() - 3
        );

        // Reiniciamos las jugadas relacionadas con hambre.
        mascota.setCountJugadas(0);

        // Si bajó el hambre, ya no necesita comida.
        if (mascota.getHambre() < 7) {

            mascota.setNecesidadComida(
                false
            );

            mascota.setAdvertenciaHambre(
                false
            );
        }

        /**
         * La vida se recupera mediante alimentación.
         *
         * Ya NO existe recuperación automática
         * dentro de TimerService.
         */
        mascota.setVida(
            mascota.getVida() + 2
        );

        // Permite volver a avisar si posteriormente
        // vuelve a caer a 10 o menos.
        if (mascota.getVida() > 10) {

            mascota.setAdvertenciaVida(
                false
            );
        }

        return {
            permitido: true
        };
    }

    /**
     * Jugar aumenta felicidad/nivel y también hambre.
     */
    jugar(jugador) {

        const mascota =
            jugador.getMascota();

        if (mascota.getVida() <= 0) {

            return {
                permitido: false,
                mensaje:
                    'La mascota ya no puede jugar.'
            };
        }

        const mensajes = [];

        if (
            mascota.getFelicidad() < 10
        ) {

            mascota.setFelicidad(
                mascota.getFelicidad() + 1
            );

            mascota.setNivel(
                mascota.getNivel() + 1
            );

        } else {

            const resultadoVida =
                this.reducirVida(mascota);

            mensajes.push(
                ...resultadoVida.mensajes
            );
        }

        mascota.setCountJugadas(
            mascota.getCountJugadas() + 1
        );

        mascota.setHambre(
            mascota.getHambre() + 1
        );

        if (
            mascota.getHambre() >= 7
        ) {

            mascota.setNecesidadComida(
                true
            );

            if (
                !mascota.getAdvertenciaHambre()
            ) {

                mascota.setAdvertenciaHambre(
                    true
                );

                mensajes.push(
                    'Tu mascota tiene hambre. Dale de comer.'
                );
            }
        }

        return {
            permitido: true,
            mensajes: mensajes
        };
    }

    /**
     * Llevar la mascota al baño.
     */
    banio(tamagochi) {

        const random =
            Math.random();

        const reduccion =
            0.5 +
            ((1.5 - 0.5) * random);

        tamagochi.setPeso(
            tamagochi.getPeso() -
            reduccion
        );

        tamagochi.setCount(0);

        tamagochi.setNecesidadBano(
            false
        );

        return {
            permitido: true
        };
    }

    /**
     * Reduce la vida de la mascota.
     */
    lastimar(jugador) {

        return this.reducirVida(
            jugador.getMascota()
        );
    }

    /**
     * Centraliza la regla para perder vida.
     */
    reducirVida(mascota) {

        const mensajes = [];

        if (mascota.getVida() <= 0) {

            return {
                mensajes: mensajes,
                muerte: true
            };
        }

        mascota.setVida(
            mascota.getVida() - 1
        );

        /**
         * Advertencia una sola vez al entrar
         * en la zona crítica.
         */
        if (
            mascota.getVida() <= 10 &&
            mascota.getVida() > 0 &&
            !mascota.getAdvertenciaVida()
        ) {

            mascota.setAdvertenciaVida(
                true
            );

            mensajes.push(
                'La mascota está a punto de morir.'
            );
        }

        if (
            mascota.getVida() === 0
        ) {

            mensajes.push(
                `${mascota.getNombre()} ha perdido toda su vida.`
            );
        }

        return {
            mensajes: mensajes,
            muerte:
                mascota.getVida() === 0
        };
    }

    /**
     * Estado visual dependiendo de felicidad.
     */
    actualizarEstado(tamagochi) {

        const felicidad =
            tamagochi.getFelicidad();

        if (
            felicidad <= 10 &&
            felicidad > 8
        ) {

            tamagochi.setState('😀');

        } else if (
            felicidad <= 8 &&
            felicidad > 5
        ) {

            tamagochi.setState('😠');

        } else if (
            felicidad <= 5 &&
            felicidad > 2
        ) {

            tamagochi.setState('😭');

        } else {

            tamagochi.setState('💀');
        }
    }
}