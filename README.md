# Mascota-Ohm-Nom
# DOCUMENTACIÓN DEL PROYECTO TAMAGOCHI

## 1. Introducción

El proyecto consiste en una aplicación web de una mascota virtual tipo **Tamagochi**, donde el usuario puede crear una partida, iniciar sesión y controlar diferentes necesidades de su mascota.

La aplicación permite realizar acciones como:

* Jugar con la mascota.
* Alimentarla.
* Llevarla al baño.
* Hacerla dormir.
* Guardar el progreso.
* Cambiar entre las diferentes habitaciones.
* Cerrar sesión.
* Visualizar el estado de la mascota.
* Mostrar mensajes relacionados con el estado de la mascota.

Inicialmente, gran parte de la lógica se encontraba concentrada en un único archivo `Guardados.js`. Para mejorar la organización, mantenimiento y reutilización del código, se realizó una separación de responsabilidades utilizando diferentes clases y capas.

La estructura final se organizó de la siguiente manera:

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
│   ├── models
│   │   ├── Tamagochi.js
│   │   └── Jugador.js
│   │
│   ├── repositories
│   │   ├── IPlayerRepository.js
│   │   ├── IMessageRepository.js
│   │   ├── LocalStoragePlayerRepository.js
│   │   └── LocalStorageMessageRepository.js
│   │
│   ├── services
│   │   ├── MascotaService.js
│   │   ├── PlayerService.js
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

# 2. Arquitectura utilizada

La aplicación se dividió en diferentes responsabilidades:

```text
HTML
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ├── Models
  │
  └── Repositories
          │
          ▼
      LocalStorage
```

Cada capa tiene una función determinada.

### Models

Representan los objetos principales del sistema.

* `Tamagochi`
* `Jugador`

### Repositories

Se encargan del almacenamiento de información.

* `IPlayerRepository`
* `IMessageRepository`
* `LocalStoragePlayerRepository`
* `LocalStorageMessageRepository`

### Services

Contienen la lógica de negocio.

* `MascotaService`
* `PlayerService`
* `GameService`
* `TimerService`

### UI

Se encarga de trabajar con los elementos visuales del HTML.

* `GameView`
* `LoginView`
* `MessageView`

### Controllers

Controlan las acciones realizadas por el usuario.

* `GameController`
* `LoginController`
* `NavigationController`

### Guardados

Funciona como punto de composición y fachada de la aplicación, conectando los diferentes componentes.

---

# 3. Principio SRP - Single Responsibility Principle

El principio de responsabilidad única establece que:

> Una clase debe tener una única responsabilidad principal y una única razón importante para cambiar.

Este principio se aplicó separando la lógica que anteriormente estaba concentrada en `Guardados.js`.

---

# 4. Clase Tamagochi

Archivo:

```text
js/models/Tamagochi.js
```

## Responsabilidad

La clase `Tamagochi` representa a la mascota virtual y almacena su estado.

Entre sus propiedades se encuentran:

* Peso.
* Nivel.
* Vida.
* Felicidad.
* Hambre.
* Nombre.
* Necesidad de ir al baño.
* Necesidad de dormir.
* Contador de comidas.
* Estado de la mascota.

También proporciona métodos `get` y `set` para acceder y modificar sus atributos.

Ejemplo:

```javascript
getVida() {
    return this.vida;
}

setVida(vida) {
    this.vida = vida;
}
```

## Aplicación de SRP

`Tamagochi` únicamente representa y administra los datos de la mascota.

No se encarga de:

* Guardar datos en LocalStorage.
* Cambiar páginas.
* Manipular directamente el HTML.
* Crear jugadores.
* Controlar temporizadores.

Por esta razón, se evita mezclar el modelo con otras responsabilidades.

---

# 5. Clase Jugador

Archivo:

```text
js/models/Jugador.js
```

## Responsabilidad

La clase `Jugador` representa al usuario que posee una mascota.

Contiene:

* Nombre del jugador.
* Contraseña.
* Mascota.
* Fecha de primera conexión.
* Observadores.

Además, contiene los métodos relacionados con los observadores:

```javascript
agregarObservador(observador)
eliminarObservador(observador)
notificarObservadores()
```

## Aplicación de SRP

`Jugador` se concentra en representar al usuario y su relación con la mascota.

No contiene:

* Código HTML.
* Acceso directo a LocalStorage.
* Navegación.
* Lógica de autenticación.

---

# 6. IPlayerRepository

Archivo:

```text
js/repositories/IPlayerRepository.js
```

## Responsabilidad

Define las operaciones que debe proporcionar un repositorio de jugadores.

Métodos:

```javascript
obtenerTodos()
guardarTodos(jugadores)
buscarPorNombre(nombre)
eliminarPorNombre(nombre)
```

La interfaz establece un contrato para cualquier sistema que quiera almacenar jugadores.

## Aplicación de DIP

Esta abstracción permite que los servicios no tengan que conocer directamente cómo se almacenan los jugadores.

Por ejemplo, `PlayerService` trabaja con un repositorio recibido mediante el constructor:

```javascript
constructor(playerRepository) {
    this.playerRepository = playerRepository;
}
```

Por lo tanto, la lógica de negocio no depende directamente de `localStorage`.

---

# 7. LocalStoragePlayerRepository

Archivo:

```text
js/repositories/LocalStoragePlayerRepository.js
```

## Responsabilidad

Implementa `IPlayerRepository` utilizando `localStorage` como mecanismo de almacenamiento.

Sus principales operaciones son:

### Obtener jugadores

```javascript
obtenerTodos()
```

Lee los datos almacenados en:

```text
datosDelJugador
```

### Guardar jugadores

```javascript
guardarTodos(jugadores)
```

Convierte los jugadores a JSON y los almacena.

### Buscar jugador

```javascript
buscarPorNombre(nombre)
```

Busca un jugador por su nombre.

### Eliminar jugador

```javascript
eliminarPorNombre(nombre)
```

Elimina un jugador del almacenamiento.

## Aplicación de SRP

La clase se encarga exclusivamente del almacenamiento de jugadores.

No contiene lógica para:

* Crear mascotas.
* Iniciar sesión.
* Cambiar de página.
* Mostrar mensajes.

## Aplicación de DIP

El sistema puede reemplazar este repositorio por otro mecanismo de almacenamiento sin modificar `PlayerService`.

Por ejemplo, en el futuro podría existir:

```text
DatabasePlayerRepository
```

o:

```text
ApiPlayerRepository
```

---

# 8. IMessageRepository

Archivo:

```text
js/repositories/IMessageRepository.js
```

## Responsabilidad

Define las operaciones para manejar los mensajes de la aplicación.

Métodos:

```javascript
obtenerTodos()
guardar(mensaje)
limpiar()
```

Esta abstracción separa el manejo de mensajes de su almacenamiento.

---

# 9. LocalStorageMessageRepository

Archivo:

```text
js/repositories/LocalStorageMessageRepository.js
```

## Responsabilidad

Implementa `IMessageRepository` utilizando `localStorage`.

Los mensajes se almacenan mediante la clave:

```text
mensajes
```

Permite:

* Obtener mensajes.
* Agregar mensajes.
* Eliminar todos los mensajes.

## Aplicación de SRP

La clase únicamente administra el almacenamiento de mensajes.

No decide cuándo debe mostrarse un mensaje ni cómo debe verse.

---

# 10. MascotaService

Archivo:

```text
js/services/MascotaService.js
```

## Responsabilidad

Contiene las reglas de negocio relacionadas directamente con la mascota.

Entre las principales operaciones se encuentran:

```text
comer()
jugar()
banio()
lastimar()
actualizarEstado()
```

---

## 10.1 Alimentación

Cuando la mascota come:

* Aumenta su peso.
* Aumenta el contador de comidas.
* Disminuye el hambre.
* Puede recuperar una pequeña cantidad de vida.

La recuperación se limita para evitar superar:

```text
100 puntos de vida
```

---

## 10.2 Juego

Cuando la mascota juega:

* Aumenta la felicidad.
* Puede aumentar el nivel.
* Aumenta el hambre.

De esta forma, jugar repetidamente provoca que la mascota tenga necesidad de comer.

Cuando el hambre alcanza un nivel determinado se muestra:

```text
Tu mascota tiene hambre. Dale de comer.
```

---

## 10.3 Vida

El servicio controla la reducción de vida.

Cuando la vida alcanza un valor bajo se muestra:

```text
La mascota está a punto de morir.
```

Se utilizan indicadores para evitar mostrar el mismo mensaje continuamente.

---

## 10.4 Baño

El método:

```javascript
banio(tamagochi)
```

reduce el peso de la mascota y reinicia el contador de comidas.

También modifica:

```text
necesidadBano = false
```

---

## 10.5 Actualización del estado

El método:

```javascript
actualizarEstado()
```

determina el estado visual de la mascota dependiendo de su felicidad.

Por ejemplo:

```text
😀  felicidad alta
😠  felicidad media
😭  felicidad baja
💀  felicidad crítica
```

## Aplicación de SRP

Toda esta clase está relacionada con una única responsabilidad:

> Administrar las reglas de comportamiento de la mascota.

No se encarga de guardar partidas ni de manipular directamente el HTML.

---

# 11. PlayerService

Archivo:

```text
js/services/PlayerService.js
```

## Responsabilidad

Contiene la lógica relacionada con los jugadores.

Sus principales operaciones son:

```text
crearJugador()
buscarJugador()
eliminarJugador()
guardarJugador()
```

---

## Crear jugador

Primero obtiene los jugadores almacenados:

```javascript
const jugadores = this.playerRepository.obtenerTodos();
```

Luego comprueba si el nombre ya existe.

Si no existe:

1. Crea el jugador.
2. Asigna la fecha.
3. Agrega el jugador.
4. Guarda los datos.

## Aplicación de SRP

`PlayerService` administra las operaciones de los jugadores.

No almacena directamente la información.

Para almacenar utiliza:

```text
playerRepository
```

Esto permite separar:

```text
Reglas de negocio
```

de:

```text
Persistencia
```

---

# 12. GameService

Archivo:

```text
js/services/GameService.js
```

## Responsabilidad

Funciona como servicio principal para coordinar las operaciones del juego.

Permite:

```text
guardar()
eliminar()
jugar()
comer()
banio()
lastimar()
```

Por ejemplo, para jugar utiliza:

```javascript
this.mascotaService.jugar(jugador);
```

Para comer:

```javascript
this.mascotaService.comer(jugador);
```

## Aplicación de SRP

`GameService` coordina las operaciones del juego, mientras que la lógica específica de la mascota permanece en `MascotaService`.

De esta forma no se coloca toda la lógica en una sola clase.

---

# 13. TimerService

Archivo:

```text
js/services/TimerService.js
```

## Responsabilidad

Controla los eventos automáticos relacionados con el tiempo.

Entre ellos:

* Disminución periódica de felicidad.
* Necesidad de dormir.
* Pérdida de vida cuando la felicidad es demasiado baja.
* Guardado automático de la partida.

También mantiene los identificadores de los temporizadores para poder detenerlos.

```javascript
this.intervalos = [];
```

## Importante

Se eliminó la recuperación automática de vida.

Anteriormente la mascota podía recuperar vida automáticamente.

La recuperación ahora está relacionada con la alimentación, haciendo que la acción del jugador tenga una función más clara dentro del juego.

## Aplicación de SRP

`TimerService` solamente administra comportamientos basados en el tiempo.

No se encarga de:

* Autenticar usuarios.
* Cambiar páginas.
* Crear jugadores.
* Dibujar la interfaz.

---

# 14. GameView

Archivo:

```text
js/ui/GameView.js
```

## Responsabilidad

Actualiza la información visual de la mascota en la interfaz.

Modifica elementos como:

```text
Nivel
Estado
Vida
Felicidad
Peso
Necesidad de baño
Necesidad de dormir
Nombre
Usuario
```

Por ejemplo:

```javascript
if (vida) {
    vida.innerHTML =
        `<img src="imagenes/corazonPixeles.png"> ${mascota.getVida()}`;
}
```

## Aplicación de SRP

`GameView` solamente se preocupa por presentar información del juego.

No realiza operaciones de almacenamiento ni reglas de negocio.

---

# 15. LoginView

Archivo:

```text
js/ui/LoginView.js
```

## Responsabilidad

Obtiene y administra los datos de los formularios de inicio de sesión y creación de partidas.

Por ejemplo:

```javascript
obtenerLogin()
```

obtiene:

```text
username
password
```

Mientras que:

```javascript
obtenerNuevaPartida()
```

obtiene:

```text
username
password
confirmPassword
petName
```

También permite:

```text
mostrarLogin()
mostrarCreacion()
limpiarNuevaPartida()
```

## Aplicación de SRP

La clase solamente administra la interfaz relacionada con el login.

La autenticación real se encuentra en `LoginController`.

---

# 16. MessageView

Archivo:

```text
js/ui/MessageView.js
```

## Responsabilidad

Muestra los mensajes almacenados en el elemento:

```html
<div id="mensajes"></div>
```

Recibe una colección de mensajes y los presenta en la interfaz.

## Aplicación de SRP

`MessageView` se encarga únicamente de la presentación de mensajes.

El almacenamiento pertenece a:

```text
LocalStorageMessageRepository
```

---

# 17. LoginController

Archivo:

```text
js/controllers/LoginController.js
```

## Responsabilidad

Controla las acciones relacionadas con:

* Inicio de sesión.
* Creación de partidas.
* Regreso al formulario de login.

---

## Inicio de sesión

Obtiene los datos mediante:

```javascript
this.loginView.obtenerLogin();
```

Después busca al jugador mediante:

```javascript
this.playerService.buscarJugador(datos.username);
```

Si las credenciales son correctas, guarda la partida actual y redirige a:

```text
mascotaprincipal.html
```

---

## Creación de partida

Valida:

* Campos vacíos.
* Contraseña de confirmación.
* Disponibilidad del nombre de usuario.

Después solicita al `PlayerService` la creación del jugador.

## Aplicación de SRP

`LoginController` controla las acciones del usuario relacionadas con el login.

No almacena directamente jugadores ni implementa las reglas de la mascota.

---

# 18. NavigationController

Archivo:

```text
js/controllers/NavigationController.js
```

## Responsabilidad

Controla exclusivamente la navegación entre las diferentes interfaces.

Métodos:

```text
goToDormir()
goToSalaPrincipal()
goToComer()
goToBanio()
goToJugar()
cerrarSesion()
```

Cada método llama a:

```javascript
navegar(pagina, mensaje)
```

Por ejemplo:

```javascript
goToDormir() {
    this.navegar(
        'SalaDormir.html',
        'dormitorio'
    );
}
```

## Aplicación de SRP

La clase no conoce las reglas de la mascota.

Su única responsabilidad es:

> Gestionar el cambio entre páginas.

---

# 19. GameController

Archivo:

```text
js/controllers/GameController.js
```

## Responsabilidad

Es el controlador encargado de recibir las acciones realizadas durante la partida.

Controla:

```text
jugar()
comer()
dormir()
usarBanio()
guardar()
salir()
```

También carga la información de la partida almacenada.

---

## Carga de partida

Obtiene:

```javascript
localStorage.getItem('partidaJugador');
```

Luego reconstruye:

```text
Tamagochi
Jugador
```

y recupera los valores almacenados anteriormente.

Esto permite que la partida continúe con los mismos datos.

---

## Aplicación de SRP

`GameController` controla las acciones del usuario relacionadas con la partida.

No implementa directamente las reglas internas de la mascota.

Para eso utiliza:

```text
GameService
```

---

# 20. Guardados.js

Archivo:

```text
js/Guardados.js
```

## Responsabilidad

`Guardados.js` funciona como punto central de composición de la aplicación.

Aquí se crean las diferentes dependencias:

```javascript
const playerRepository =
    new LocalStoragePlayerRepository();

const messageRepository =
    new LocalStorageMessageRepository();

const playerService =
    new PlayerService(playerRepository);

const mascotaService =
    new MascotaService();

const gameService =
    new GameService(
        playerService,
        mascotaService
    );
```

También se crean las vistas y controladores.

Finalmente se crea:

```javascript
const gameController =
    new GameController(...);
```

y:

```javascript
const loginController =
    new LoginController(...);
```

La clase `Guardados` expone las operaciones necesarias para que los HTML puedan comunicarse con los controladores.

---

# 21. Solución del acceso desde los HTML

Uno de los problemas encontrados fue:

```text
Uncaught TypeError:
guardados.goToDormir is not a function
```

Esto ocurría porque los botones HTML utilizaban:

```html
onclick="guardados.goToDormir()"
```

pero `guardados` no estaba correctamente disponible en el ámbito global.

La solución utilizada fue:

```javascript
window.guardados = new Guardados();
```

En lugar de:

```javascript
let guardados = new Guardados();
```

De esta manera los eventos `onclick` pueden acceder correctamente a la instancia.

---

# 22. Aplicación del principio OCP

El principio Open/Closed establece:

> Las entidades de software deben estar abiertas para extensión, pero cerradas para modificación.

En el proyecto se favorece este principio mediante la utilización de repositorios.

Por ejemplo:

```text
IPlayerRepository
        │
        └── LocalStoragePlayerRepository
```

El servicio:

```text
PlayerService
```

trabaja con un repositorio recibido mediante el constructor.

Por lo tanto, es posible agregar una nueva forma de almacenamiento sin modificar la lógica principal.

Por ejemplo:

```text
IPlayerRepository
       │
       ├── LocalStoragePlayerRepository
       │
       └── ApiPlayerRepository
```

La lógica de `PlayerService` puede mantenerse.

---

# 23. Aplicación del principio LSP

El principio de sustitución de Liskov establece:

> Una implementación concreta debe poder sustituir a la abstracción que implementa sin romper el funcionamiento esperado.

En el proyecto se utiliza mediante las abstracciones:

```text
IPlayerRepository
IMessageRepository
```

Por ejemplo:

```javascript
class LocalStoragePlayerRepository
    extends IPlayerRepository
```

La clase concreta implementa las operaciones definidas por el repositorio.

Esto permite que el código que trabaja con `IPlayerRepository` pueda utilizar una implementación concreta del almacenamiento.

El objetivo es que el resto de la aplicación dependa del comportamiento definido por el contrato y no de una implementación específica.

---

# 24. Aplicación del principio ISP

El principio Interface Segregation establece:

> Los clientes no deben depender de métodos que no necesitan.

En el proyecto se evitó crear una única interfaz gigante para todas las operaciones.

Se separaron las responsabilidades:

```text
IPlayerRepository
```

para jugadores.

Y:

```text
IMessageRepository
```

para mensajes.

Esto evita tener una interfaz como:

```text
IRepository
```

que contenga operaciones de jugadores, mensajes, mascotas y otras funcionalidades que no corresponden al mismo componente.

Cada abstracción contiene operaciones relacionadas con una responsabilidad concreta.

---

# 25. Aplicación del principio DIP

El principio de inversión de dependencias establece:

> Los módulos de alto nivel deben depender de abstracciones y no directamente de módulos de bajo nivel.

Este principio se observa principalmente en:

```text
PlayerService
        │
        ▼
IPlayerRepository
        │
        ▼
LocalStoragePlayerRepository
```

`PlayerService` no necesita conocer directamente cómo funciona `localStorage`.

Recibe el repositorio mediante:

```javascript
constructor(playerRepository) {
    this.playerRepository = playerRepository;
}
```

Por lo tanto, la dependencia se inyecta desde el exterior.

También ocurre una separación similar entre:

```text
GameController
       ↓
GameService
       ↓
MascotaService
```

Esto evita colocar toda la funcionalidad directamente dentro del controlador.

---

# 26. Inyección de dependencias

La aplicación utiliza inyección de dependencias principalmente mediante constructores.

Ejemplo:

```javascript
class PlayerService {

    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
}
```

La instancia del repositorio se proporciona desde fuera.

Otro ejemplo:

```javascript
class GameService {

    constructor(playerService, mascotaService) {
        this.playerService = playerService;
        this.mascotaService = mascotaService;
    }
}
```

Esto permite reducir el acoplamiento entre las clases.

---

# 27. Separación entre lógica y presentación

Antes de la refactorización, la lógica estaba más concentrada.

Después de aplicar la estructura actual:

```text
HTML
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
LocalStorage
```

Por ejemplo, cuando el usuario presiona el botón de comer:

```text
HTML
 ↓
Guardados
 ↓
GameController
 ↓
GameService
 ↓
MascotaService
 ↓
Tamagochi
```

La interfaz no necesita conocer cómo se modifica internamente la mascota.

---

# 28. Flujo de una acción: jugar

Cuando el usuario presiona el botón de jugar:

```text
Patio.html
      ↓
guardados.accionarBotonesDidacticos('jugar')
      ↓
GameController.jugar()
      ↓
GameService.jugar()
      ↓
MascotaService.jugar()
      ↓
Tamagochi
```

Después:

```text
GameView.actualizar()
```

actualiza la información mostrada en pantalla.

También se guarda el estado actualizado de la partida.

---

# 29. Flujo de una acción: comer

El proceso de alimentación funciona de manera similar:

```text
Cocina.html
      ↓
Guardados
      ↓
GameController.comer()
      ↓
GameService.comer()
      ↓
MascotaService.comer()
      ↓
Tamagochi
      ↓
GameView
```

La mascota puede:

* Aumentar su peso.
* Reducir hambre.
* Recuperar vida.
* Incrementar el contador de comidas.

Si alcanza el límite de comidas, se establece la necesidad de ir al baño.

---

# 30. Flujo de navegación

Cuando el usuario selecciona un icono:

```text
Botón HTML
     ↓
guardados.goToDormir()
     ↓
NavigationController
     ↓
navegar()
     ↓
SalaDormir.html
```

Las rutas utilizadas son:

```text
SalaDormir.html
Cocina.html
Banio.html
Patio.html
mascotaprincipal.html
MenuPrincipal.html
```

Los iconos utilizan los archivos existentes dentro de:

```text
imagenes/
```

por ejemplo:

```text
dormirr.png
comida.png
baño.png
pelota.png
guarda.png
salir.png
```

---

# 31. Organización de las interfaces HTML

Las interfaces mantienen su diseño original, pero se adaptaron para trabajar con la nueva arquitectura.

Las páginas principales son:

### MenuPrincipal.html

Permite:

* Iniciar sesión.
* Crear una partida.
* Regresar al login.

### mascotaprincipal.html

Representa la sala principal.

Permite:

* Visualizar el estado de la mascota.
* Ir a otras habitaciones.
* Guardar.
* Salir.
* Jugar.

### Cocina.html

Permite alimentar a la mascota.

### Banio.html

Permite llevar a la mascota al baño.

### Patio.html

Permite jugar con la mascota.

### SalaDormir.html

Permite poner a dormir o despertar a la mascota.

---

# 32. Organización de los archivos CSS

Cada interfaz posee su propio archivo CSS para separar la presentación de la lógica JavaScript.

Por ejemplo:

```text
css/banio.css
css/cocina.css
css/login.css
css/menu.css
css/patio.css
css/dormir.css
```

Los CSS controlan principalmente:

* Fondo.
* Posición de los elementos.
* Tamaño de los iconos.
* Tamaño de la mascota.
* Panel de información.
* Botones.
* Mensajes.
* Posición del nombre.
* Posición del usuario.

Esto evita colocar toda la presentación directamente dentro de los archivos JavaScript.

---

# 33. Manejo de imágenes

Las imágenes se mantienen en la carpeta:

```text
imagenes/
```

Se utilizan diferentes recursos dependiendo de la habitación.

Por ejemplo:

```text
fondosala.png
Cocina.jpg
Baniootro.jpg
Patio.jpg
Dormitoriootro.jpg
```

Las mascotas también cambian dependiendo de la acción:

```text
om nom sala.gif
om nom comiendo.gif
om nom banio.gif
om nom jugando.gif
om nom durmiendo.gif
```

Los iconos utilizan imágenes independientes para permitir que el usuario identifique visualmente cada acción.

---

# 34. Beneficios obtenidos con SOLID

La refactorización proporciona varios beneficios.

## Mantenimiento

Si se modifica la lógica de alimentación, se puede trabajar principalmente sobre:

```text
MascotaService
```

sin modificar las páginas HTML.

## Reutilización

Los servicios pueden ser utilizados desde diferentes controladores.

## Menor acoplamiento

Las clases dependen de otras clases de manera controlada.

## Facilidad para cambiar almacenamiento

El almacenamiento de jugadores está abstraído mediante:

```text
IPlayerRepository
```

## Separación de responsabilidades

Cada componente tiene una función concreta.

## Mayor facilidad para detectar errores

Al estar separadas las responsabilidades, resulta más sencillo localizar dónde ocurre un problema.

---

# 35. Resumen de SOLID aplicado

| Principio | Aplicación en el proyecto                                                 |
| --------- | ------------------------------------------------------------------------- |
| **SRP**   | Cada clase tiene una responsabilidad específica                           |
| **OCP**   | Se pueden agregar nuevas implementaciones de repositorios                 |
| **LSP**   | Las implementaciones de repositorios siguen el contrato definido          |
| **ISP**   | Se separaron las interfaces de jugadores y mensajes                       |
| **DIP**   | Los servicios reciben sus dependencias mediante abstracciones e inyección |

---

# 36. Conclusión

La aplicación fue reorganizada aplicando los principios SOLID para separar las responsabilidades que anteriormente se encontraban concentradas en un único archivo.

La utilización de modelos, repositorios, servicios, vistas y controladores permite obtener una estructura más organizada:

```text
Models
Repositories
Services
Views
Controllers
```

Esta organización facilita el mantenimiento y la modificación del proyecto, ya que cada componente se concentra en una responsabilidad específica.

Además, el uso de interfaces como `IPlayerRepository` e `IMessageRepository` permite reducir el acoplamiento y facilita cambiar la implementación del almacenamiento en el futuro.

Finalmente, `Guardados.js` funciona como punto de composición de las dependencias, mientras que los controladores gestionan las acciones del usuario y los servicios contienen las reglas de negocio.

De esta manera, la aplicación conserva su funcionamiento original, pero cuenta con una estructura más modular, mantenible y alineada con los principios de diseño SOLID.
