# Mascota-Ohm-Nom
# Tamagochi - Mascota Virtual

Proyecto de mascota virtual desarrollado con **HTML, CSS y JavaScript**, refactorizado con el objetivo de mejorar la organización, mantenibilidad y extensibilidad del código mediante la aplicación de los **principios SOLID**, separación por capas y algunos patrones de diseño.

El sistema permite registrar jugadores, crear mascotas, iniciar sesión e interactuar con la mascota mediante diferentes habitaciones y acciones como jugar, comer, dormir e ir al baño.

---

## 1. Objetivo del proyecto

El objetivo principal del proyecto es simular el comportamiento de una mascota virtual que posee diferentes estados y necesidades.

La mascota puede:

- Comer.
- Jugar.
- Dormir.
- Ir al baño.
- Aumentar de nivel.
- Ganar y perder felicidad.
- Aumentar o disminuir de peso.
- Sentir hambre.
- Perder y recuperar vida.
- Necesitar dormir.
- Necesitar ir al baño.
- Morir si su vida llega a cero.

Además, el sistema permite almacenar diferentes jugadores y conservar el progreso de cada partida mediante `localStorage`.

---

# 2. Tecnologías utilizadas

El proyecto utiliza:

- HTML5.
- CSS3.
- JavaScript.
- LocalStorage del navegador.
- Programación Orientada a Objetos.
- Principios SOLID.
- Patrón Repository.
- Patrón Command.
- Inyección de dependencias.
- Separación Modelo - Servicio - Controlador - Vista.

No se necesita instalar una base de datos ni dependencias externas.

---

# 3. Estructura del proyecto

```text
ProyectoPoo
│
├── Banio.html
├── Cocina.html
├── mascotaprincipal.html
├── MenuPrincipal.html
├── Patio.html
├── SalaDormir.html
│
├── css
│   ├── banio.css
│   ├── cocina.css
│   ├── login.css
│   ├── menu.css
│   ├── patio.css
│   └── dormir.css
│
├── js
│   │
│   ├── models
│   │   ├── Tamagochi.js
│   │   └── Jugador.js
│   │
│   ├── repositories
│   │   ├── IPlayerRepository.js
│   │   ├── IMessageRepository.js
│   │   ├── ISessionRepository.js
│   │   ├── LocalStoragePlayerRepository.js
│   │   ├── LocalStorageMessageRepository.js
│   │   └── LocalStorageSessionRepository.js
│   │
│   ├── services
│   │   ├── MascotaService.js
│   │   ├── PlayerService.js
│   │   ├── MessageService.js
│   │   ├── GameService.js
│   │   └── TimerService.js
│   │
│   ├── ui
│   │   ├── GameView.js
│   │   ├── LoginView.js
│   │   └── MessageView.js
│   │
│   ├── controllers
│   │   ├── GameController.js
│   │   ├── LoginController.js
│   │   └── NavigationController.js
│   │
│   └── Guardados.js
│
└── imagenes
```

---

# 4. Funcionamiento general

El sistema inicia desde:

```text
MenuPrincipal.html
```

Desde esta pantalla el usuario puede:

1. Crear una nueva partida.
2. Registrar un nombre de usuario.
3. Registrar una contraseña.
4. Dar un nombre a su mascota.
5. Iniciar sesión con un jugador existente.

Después de iniciar sesión correctamente se accede a:

```text
mascotaprincipal.html
```

Desde la sala principal se puede navegar entre las diferentes habitaciones.

---

# 5. Habitaciones

## Sala principal

Archivo:

```text
mascotaprincipal.html
```

Es la pantalla principal del juego.

Desde esta habitación se puede acceder a:

- Dormitorio.
- Cocina.
- Baño.
- Patio.
- Guardar partida.
- Salir.

También muestra información como:

- Nivel.
- Estado.
- Vida.
- Felicidad.
- Peso.
- Necesidad de ir al baño.
- Necesidad de dormir.
- Mensajes y advertencias.

---

## Cocina

Archivo:

```text
Cocina.html
```

Permite alimentar a la mascota.

Cuando la mascota come:

- Aumenta su peso.
- Reduce su hambre.
- Puede recuperar una pequeña cantidad de vida.
- Se registra la cantidad de veces que ha comido.

La mascota no puede comer indefinidamente.

Después de varias comidas comienza a necesitar ir al baño.

---

## Patio

Archivo:

```text
Patio.html
```

Permite jugar con la mascota.

Jugar puede:

- Aumentar la felicidad.
- Aumentar el nivel.
- Incrementar progresivamente el hambre.
- Registrar la cantidad de veces que la mascota ha jugado.

Cuando el hambre alcanza un nivel elevado se muestra el mensaje:

```text
Tu mascota tiene hambre. Dale de comer.
```

De esta manera, jugar tiene consecuencias sobre otras necesidades de la mascota.

---

## Baño

Archivo:

```text
Banio.html
```

Permite llevar a la mascota al baño.

Cuando realmente necesita ir al baño:

- Se reduce parte de su peso.
- Se reinicia el contador de comidas.
- Se elimina la necesidad de ir al baño.

Si se intenta realizar la acción cuando la mascota no la necesita, el juego muestra una advertencia y puede afectar su vida.

---

## Dormitorio

Archivo:

```text
SalaDormir.html
```

Permite atender la necesidad de sueño de la mascota.

Después de determinado tiempo la mascota comienza a necesitar dormir.

Cuando necesita dormir, el sistema informa al jugador mediante un mensaje.

Si el jugador intenta realizar determinadas acciones cuando no corresponden, la mascota puede perder vida.

---

# 6. Sistema de vida

La mascota comienza con:

```text
Vida = 100
```

La vida está limitada entre:

```text
0 - 100
```

La mascota puede perder vida debido a diferentes situaciones, especialmente cuando sus necesidades no son atendidas correctamente.

Cuando la vida se encuentra entre `1` y `10`, el sistema muestra la advertencia:

```text
La mascota está a punto de morir.
```

Esta advertencia se controla para evitar mostrar el mismo mensaje constantemente.

---

# 7. Recuperación de vida

En la versión actual se eliminó la recuperación automática de vida.

Anteriormente existía un temporizador encargado de recuperar vida automáticamente.

Este comportamiento fue eliminado.

Ahora la mascota recupera una pequeña cantidad de vida mediante la alimentación.

Por ejemplo:

```text
Comer -> +2 de vida
```

La vida nunca puede superar el máximo establecido de `100`.

Esto hace que alimentar correctamente a la mascota tenga una función adicional dentro del juego.

---

# 8. Muerte de la mascota

Cuando la vida llega a:

```text
Vida = 0
```

la mascota muere.

Cuando esto sucede:

1. Se detienen los temporizadores.
2. Se elimina el jugador/partida correspondiente del almacenamiento.
3. Se elimina la sesión activa.
4. Se limpian los mensajes.
5. Se informa al usuario.
6. Se regresa al menú principal.

De esta manera se recupera el comportamiento de eliminación de partida que tenía la versión original.

---

# 9. Sistema de felicidad

La felicidad de la mascota utiliza valores entre:

```text
0 - 10
```

La felicidad disminuye automáticamente con el paso del tiempo.

Jugar permite aumentar la felicidad.

Dependiendo de su nivel de felicidad, la mascota puede mostrar diferentes estados:

```text
😀 Feliz
😠 Molesta
😭 Triste
💀 Estado crítico
```

Cuando la felicidad es demasiado baja, la mascota comienza a perder vida periódicamente.

---

# 10. Sistema de hambre

La mascota posee un nivel de hambre entre:

```text
0 - 10
```

Inicialmente:

```text
Hambre = 0
```

Cada vez que la mascota juega, su hambre aumenta.

Cuando alcanza aproximadamente:

```text
Hambre >= 7
```

se activa su necesidad de comida y aparece la advertencia:

```text
Tu mascota tiene hambre. Dale de comer.
```

Cuando la mascota come:

- Disminuye el hambre.
- Se reinicia el contador relacionado con las jugadas.
- Puede desactivarse la necesidad de comida.
- Puede recuperar vida.

---

# 11. Sistema de sueño

La mascota también posee una necesidad de dormir.

Mediante `TimerService` se controla el paso del tiempo.

Después de aproximadamente dos minutos, si la mascota todavía no necesita dormir, se activa esta necesidad.

El sistema muestra un mensaje similar a:

```text
NombreMascota ya quiere dormir
```

El estado también se refleja en la interfaz.

---

# 12. Necesidad de ir al baño

Cada vez que la mascota come se incrementa un contador.

Después de varias comidas se activa:

```text
necesidadBano = true
```

Cuando esto ocurre, la mascota debe visitar el baño.

Al utilizar correctamente el baño:

- Disminuye el peso.
- El contador de comidas vuelve a cero.
- `necesidadBano` vuelve a `false`.

---

# 13. Temporizadores

La clase:

```text
TimerService.js
```

administra los comportamientos automáticos relacionados con el tiempo.

Entre ellos se encuentran:

### Reducción de felicidad

Cada cierto tiempo disminuye la felicidad.

### Necesidad de dormir

Después de determinado tiempo se activa la necesidad de sueño.

### Pérdida de vida

Si la felicidad permanece demasiado baja, la mascota comienza a perder vida.

### Guardado automático de sesión

La sesión activa se almacena periódicamente.

El servicio ya no utiliza directamente `localStorage`, sino `ISessionRepository`.

### Recuperación automática

La recuperación automática de vida fue eliminada.

Actualmente la recuperación de vida se realiza mediante la alimentación.

---

# 14. Persistencia de información

El proyecto utiliza `localStorage`.

Sin embargo, las clases de negocio y los controladores no necesitan conocer directamente cómo se almacenan los datos.

Para ello se utiliza el patrón Repository.

Existen tres tipos principales de almacenamiento.

---

## Repositorio de jugadores

Interfaz:

```text
IPlayerRepository
```

Implementación:

```text
LocalStoragePlayerRepository
```

Permite:

- Obtener jugadores.
- Guardar jugadores.
- Buscar por nombre.
- Eliminar jugadores.

La información utiliza la clave:

```text
datosDelJugador
```

---

## Repositorio de mensajes

Interfaz:

```text
IMessageRepository
```

Implementación:

```text
LocalStorageMessageRepository
```

Permite:

- Guardar mensajes.
- Recuperar mensajes.
- Limpiar mensajes.

---

## Repositorio de sesión

Interfaz:

```text
ISessionRepository
```

Implementación:

```text
LocalStorageSessionRepository
```

Se encarga exclusivamente de la partida activa.

Utiliza internamente:

```text
partidaJugador
```

Esto evita que `GameController`, `LoginController`, `GameService` y `TimerService` accedan directamente a `localStorage`.

---

# 15. MessageService

Se agregó:

```text
MessageService.js
```

Su responsabilidad es centralizar el manejo de mensajes.

Anteriormente varias clases repetían operaciones similares:

```text
guardar mensaje
obtener mensajes
mostrar mensajes
```

Ahora `MessageService` se encarga de coordinar estas operaciones.

Esto reduce duplicación de código y mejora el principio de responsabilidad única.

---

# 16. Eliminación del Singleton

La versión anterior utilizaba un Singleton dentro de:

```text
Tamagochi.js
```

Este comportamiento fue eliminado.

Anteriormente podía ocurrir que:

```text
Jugador 1 -> Mascota A
Jugador 2 -> Mascota A
```

si se creaban diferentes jugadores durante la misma ejecución.

Ahora cada llamada:

```javascript
new Tamagochi(nombre)
```

crea una instancia independiente.

Por ejemplo:

```text
Jugador 1 -> Firulais
Jugador 2 -> OmNom
```

Cada jugador conserva su propia mascota.

---

# 17. Patrón Command

La versión anterior utilizaba un `switch` dentro de:

```text
accionarBotonesDidacticos()
```

con casos como:

```text
jugar
comer
dormir
usarBanio
guardar
salir
```

Este `switch` fue reemplazado por un conjunto de comandos.

Conceptualmente:

```javascript
this.comandos = {
    jugar: ...,
    comer: ...,
    dormir: ...,
    usarBanio: ...,
    guardar: ...,
    salir: ...
};
```

Cuando se recibe una acción se busca y ejecuta el comando correspondiente.

Esto disminuye la necesidad de modificar una estructura condicional central para gestionar las acciones.

---

# 18. Aplicación de SOLID

## S - Single Responsibility Principle

Cada clase posee una responsabilidad específica.

Ejemplos:

```text
Tamagochi
    -> Estado de la mascota.

Jugador
    -> Estado del jugador.

MascotaService
    -> Reglas de negocio de la mascota.

PlayerService
    -> Operaciones relacionadas con jugadores.

MessageService
    -> Manejo de mensajes.

TimerService
    -> Eventos automáticos por tiempo.

GameView
    -> Representación visual del juego.

LoginView
    -> Interfaz del login.

GameController
    -> Coordinación de acciones del juego.

LoginController
    -> Coordinación del inicio de sesión.

NavigationController
    -> Navegación entre habitaciones.
```

---

## O - Open/Closed Principle

El código se encuentra organizado para facilitar extensiones sin modificar innecesariamente componentes existentes.

Un ejemplo es el manejo de acciones mediante Command.

También las implementaciones de repositorios pueden reemplazarse manteniendo sus contratos.

Por ejemplo:

```text
ISessionRepository
        |
        +-- LocalStorageSessionRepository
```

En el futuro podría existir:

```text
DatabaseSessionRepository
```

sin cambiar las clases que utilizan la abstracción.

---

## L - Liskov Substitution Principle

Las implementaciones concretas respetan el comportamiento definido por sus abstracciones.

Por ejemplo:

```text
IPlayerRepository
        |
        +-- LocalStoragePlayerRepository
```

y:

```text
ISessionRepository
        |
        +-- LocalStorageSessionRepository
```

Las clases consumidoras trabajan con las operaciones definidas por los contratos sin necesitar conocer los detalles del almacenamiento.

---

## I - Interface Segregation Principle

Las responsabilidades de persistencia están divididas en interfaces pequeñas.

```text
IPlayerRepository
IMessageRepository
ISessionRepository
```

En lugar de crear una interfaz grande que obligue a todas las implementaciones a manejar jugadores, mensajes y sesiones al mismo tiempo.

---

## D - Dependency Inversion Principle

Los componentes de mayor nivel no necesitan depender directamente de `localStorage`.

Por ejemplo, la sesión utiliza:

```text
ISessionRepository
```

y su implementación concreta es:

```text
LocalStorageSessionRepository
```

La creación e inyección de las dependencias se realiza principalmente desde:

```text
Guardados.js
```

Esto permite cambiar detalles de almacenamiento con un impacto menor en el resto de la aplicación.

---

# 19. Separación de reglas de negocio

Las reglas relacionadas con la mascota se encuentran principalmente en:

```text
MascotaService.js
```

Por ejemplo:

- Aumentar felicidad.
- Perder vida.
- Recuperar vida.
- Aumentar hambre.
- Disminuir hambre.
- Controlar necesidad de comida.
- Controlar necesidad de baño.
- Modificar peso.
- Determinar estados.

`GameController` se concentra principalmente en coordinar la interacción entre servicios, vistas y repositorios.

---

# 20. Separación de la interfaz

La manipulación visual está separada mediante:

```text
GameView
LoginView
MessageView
```

### GameView

Actualiza:

- Nivel.
- Estado.
- Vida.
- Felicidad.
- Peso.
- Necesidad de baño.
- Necesidad de dormir.
- Nombre de mascota.
- Nombre del jugador.

### LoginView

Gestiona:

- Campos del login.
- Campos de registro.
- Limpieza de formularios.
- Cambio entre formulario de login y registro.

### MessageView

Muestra los mensajes generados durante el juego.

Esto evita colocar manipulación directa del DOM dentro de las reglas principales del negocio.

---

# 21. Flujo principal de una acción

Por ejemplo, cuando el jugador presiona **Jugar**:

```text
HTML
  ↓
Guardados
  ↓
Command "jugar"
  ↓
GameController
  ↓
GameService
  ↓
MascotaService
  ↓
Tamagochi
```

Después se actualiza la interfaz:

```text
GameController
      ↓
GameView
      ↓
HTML
```

Y si existe una advertencia:

```text
MascotaService
      ↓
GameController
      ↓
MessageService
      ↓
MessageRepository
      +
MessageView
```

---

# 22. Flujo de inicio de sesión

```text
MenuPrincipal.html
        ↓
Guardados
        ↓
LoginController
        ↓
PlayerService
        ↓
IPlayerRepository
        ↓
LocalStoragePlayerRepository
```

Si las credenciales son correctas:

```text
LoginController
        ↓
ISessionRepository
        ↓
LocalStorageSessionRepository
        ↓
partidaJugador
```

Posteriormente se abre:

```text
mascotaprincipal.html
```

---

# 23. Mejoras realizadas respecto al proyecto original

Durante la refactorización se realizaron las siguientes mejoras:

1. Separación del CSS de los archivos HTML.
2. Separación del código JavaScript por responsabilidades.
3. Eliminación del Singleton de `Tamagochi`.
4. Corrección del problema de mascotas compartidas entre jugadores.
5. Creación de interfaces para repositorios.
6. Creación de `ISessionRepository`.
7. Eliminación de accesos directos dispersos a la sesión de `localStorage`.
8. Creación de `MessageService`.
9. Reducción de código duplicado para mensajes.
10. Separación del DOM mediante Views.
11. Eliminación del acceso del `LoginController` al repositorio interno del servicio.
12. Implementación del patrón Command para las acciones.
13. Movimiento de reglas de negocio hacia `MascotaService`.
14. Implementación del sistema de hambre.
15. Advertencia de hambre.
16. Advertencia de vida crítica.
17. Eliminación de recuperación automática de vida.
18. Recuperación de vida mediante comida.
19. Eliminación de la partida cuando la mascota muere.
20. Organización de la creación de dependencias desde `Guardados.js`.
21. Conservación de la interfaz y comportamiento general del proyecto original.

---

# 24. Cómo ejecutar el proyecto

No se requiere instalación de dependencias.

Se puede ejecutar utilizando un servidor local, por ejemplo **Live Server** de Visual Studio Code.

Abrir:

```text
MenuPrincipal.html
```

y crear una nueva partida.

---

# 25. Pruebas recomendadas

## Prueba 1 - Crear jugador

Crear:

```text
Usuario: jugador1
Mascota: OmNom
```

Verificar que el jugador quede almacenado.

---

## Prueba 2 - Segundo jugador

Sin depender de una única instancia global de mascota, crear otro jugador:

```text
Usuario: jugador2
Mascota: Max
```

Verificar que:

```text
jugador1 -> OmNom
jugador2 -> Max
```

Esto demuestra que el Singleton fue eliminado correctamente.

---

## Prueba 3 - Iniciar sesión

Ingresar con las credenciales registradas y comprobar que se carga la mascota correspondiente.

---

## Prueba 4 - Jugar

Presionar varias veces la acción de jugar.

Comprobar:

- Aumento de felicidad cuando corresponde.
- Aumento de nivel.
- Incremento de hambre.
- Aparición de la advertencia de hambre.

---

## Prueba 5 - Comer

Alimentar a la mascota.

Comprobar:

- Aumento de peso.
- Reducción de hambre.
- Recuperación de una pequeña cantidad de vida.
- Incremento del contador de comidas.

---

## Prueba 6 - Baño

Alimentar varias veces a la mascota hasta activar la necesidad de baño.

Posteriormente utilizar el baño.

Comprobar:

- Disminución del peso.
- Reinicio del contador.
- Eliminación de la necesidad de baño.

---

## Prueba 7 - Sueño

Esperar hasta que `TimerService` active la necesidad de dormir.

Comprobar que se muestra la advertencia correspondiente.

---

## Prueba 8 - Vida crítica

Permitir que la mascota pierda vida.

Cuando su vida se encuentre entre:

```text
1 - 10
```

debe mostrarse:

```text
La mascota está a punto de morir.
```

---

## Prueba 9 - Muerte

Permitir que la vida llegue a:

```text
0
```

Comprobar que:

- Se detienen los temporizadores.
- Se elimina la partida.
- Se limpia la sesión.
- Se regresa al menú principal.

---

## Prueba 10 - Persistencia

Guardar la partida y cambiar entre habitaciones.

Verificar que se conservan:

- Nombre.
- Vida.
- Felicidad.
- Peso.
- Nivel.
- Hambre.
- Necesidad de baño.
- Necesidad de sueño.

---

# 26. Conclusión

La refactorización permitió conservar el funcionamiento principal de la mascota virtual mientras se reorganizó el código en componentes con responsabilidades más específicas.

La aplicación separa actualmente modelos, repositorios, servicios, vistas y controladores, reduciendo el acoplamiento entre la lógica del juego, la persistencia y la interfaz.

También se corrigieron problemas existentes, como el Singleton de la mascota, accesos directos a la sesión desde diferentes clases, duplicación en el manejo de mensajes y reglas de negocio ubicadas en controladores.

Finalmente, la mascota posee comportamientos relacionados entre sí, como felicidad, hambre, alimentación, peso, sueño, baño y vida, haciendo que las decisiones del jugador tengan consecuencias dentro de la partida.