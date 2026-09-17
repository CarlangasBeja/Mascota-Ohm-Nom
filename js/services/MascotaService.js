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

class MascotaService {

    // ========================================================
    // COMER
    // ========================================================
    // La mascota come:
    // - Aumenta un poco su peso.
    // - Recupera un poco de vida.
    // - Aumenta el contador de comidas.
    //
    // Esto simula una mascota virtual:
    // comer no recupera toda la vida de golpe.
    // ========================================================

    comer(tamagochi) {

        // Aumentamos ligeramente el peso.
        tamagochi.setPeso(
            tamagochi.getPeso() + 0.6
        );

        // Aumentamos solamente 3 puntos de vida.
        // Nunca puede superar 100.
        let vidaActual = tamagochi.getVida();

        vidaActual += 3;

        if (vidaActual > 100) {
            vidaActual = 100;
        }

        tamagochi.setVida(vidaActual);

        // Registramos que la mascota comió.
        tamagochi.setCount(
            tamagochi.getCount() + 1
        );
    }


    // ========================================================
    // JUGAR
    // ========================================================
    // Jugar aumenta la felicidad.
    //
    // Sin embargo, jugar constantemente también provoca
    // hambre.
    // ========================================================

    jugar(jugador) {

        const mascota = jugador.getMascota();

        // Si tiene felicidad menor a 10,
        // jugar aumenta un punto.
        if (mascota.getFelicidad() < 10) {

            mascota.setFelicidad(
                mascota.getFelicidad() + 1
            );

            mascota.setNivel(
                mascota.getNivel() + 1
            );

        } else {

            // Si ya tiene felicidad máxima,
            // jugar demasiado empieza a afectar su vida.
            this.lastimar(jugador);
        }


        // Cada vez que juega aumentamos el contador.
        const cantidadJugadas = mascota.getCountJugadas() + 1;

        mascota.setCountJugadas(cantidadJugadas);


        // ====================================================
        // HAMBRE POR JUGAR DEMASIADO
        // ====================================================
        // Cada 3 partidas la mascota empieza a necesitar
        // comida.
        // ====================================================

        if (cantidadJugadas >= 3) {

            mascota.setNecesidadComida(true);

        }


        // Actualizamos el estado visual.
        this.actualizarEstado(mascota);
    }


    // ========================================================
    // BAÑO
    // ========================================================

    banio(tamagochi) {

        const random = Math.random();

        const reduccion =
            0.5 + ((1.5 - 0.5) * random);

        tamagochi.setPeso(
            tamagochi.getPeso() - reduccion
        );

        // Reiniciamos contador de comida.
        tamagochi.setCount(0);

        tamagochi.setNecesidadBano(false);
    }


    // ========================================================
    // DESCANSAR / DORMIR
    // ========================================================

    dormir(tamagochi) {

        tamagochi.setDormir(false);

        // Dormir permite recuperar un poco de vida.
        let vida = tamagochi.getVida();

        vida += 2;

        if (vida > 100) {
            vida = 100;
        }

        tamagochi.setVida(vida);
    }


    // ========================================================
    // LASTIMAR
    // ========================================================

    lastimar(jugador) {

        const mascota = jugador.getMascota();

        let vidaActual = mascota.getVida();

        if (vidaActual > 0) {

            vidaActual--;

            if (vidaActual < 0) {
                vidaActual = 0;
            }

            mascota.setVida(vidaActual);
        }
    }


    // ========================================================
    // ACTUALIZAR ESTADO
    // ========================================================

    actualizarEstado(tamagochi) {

        const felicidad =
            tamagochi.getFelicidad();

        if (felicidad <= 10 && felicidad > 8) {

            tamagochi.setState('😀');

        } else if (felicidad <= 8 && felicidad > 5) {

            tamagochi.setState('😠');

        } else if (felicidad <= 5 && felicidad > 2) {

            tamagochi.setState('😭');

        } else {

            tamagochi.setState('💀');
        }
    }
}