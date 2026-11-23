# SuperMINI — Sistema de Gestión de Pedidos

## 1. Descripción

SuperMINI es un sistema web de gestión de pedidos para una cadena de supermercados, desarrollado en la asignatura **Diseño de Interfaces de Usuario**, de Ingeniería Informática Empresarial de la Universidad de Talca.

El proyecto implementa las interfaces diseñadas previamente en Figma, de acuerdo con los Requerimientos de Interfaz de Usuario (RIU).

## 2. Tecnologías utilizadas

- **HTML5:** estructura de las interfaces.
- **CSS3:** estilos y diseño visual.
- **JavaScript:** validaciones, navegación y control de perfiles.
- **Figma:** referencia de wireframes, mockups y prototipos.

## 3. Estructura del proyecto

```text
SuperMINI/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── login.js
└── README.md
```

## 4. Instrucciones de ejecución

**Requisitos:** navegador web actualizado, preferentemente Google Chrome. No se requiere base de datos ni instalación de dependencias.

1. Clonar el repositorio mediante:

   `git clone https://github.com/Bycross24/SuperMINI.git`

   Alternativamente, descargar el proyecto desde **Code → Download ZIP** y descomprimirlo.

2. Abrir la carpeta `SuperMINI` en IntelliJ IDEA u otro editor compatible.

3. Ejecutar `index.html` en el navegador. También puede abrirse directamente desde la carpeta del proyecto.

4. Ingresar con cualquiera de las credenciales de prueba indicadas a continuación.

## 5. Credenciales de prueba

| Perfil | Usuario | Contraseña | Nombre mostrado |
|---|---|---|---|
| Administrador | `admin` | `AdminDemo123` | JuanPerez |
| Usuario | `user` | `UserDemo123` | MariaPerez |

Las credenciales corresponden exclusivamente a cuentas ficticias para demostrar el funcionamiento de las interfaces.

## 6. Funcionalidades implementadas — Semana 1

**RIU 1 — Estructura general**

- Encabezado (HEAD), contenido (BODY) y pie de página (FOOT).
- Menús y enlaces adaptados al perfil.

**RIU 2 — Login**

- Validación de campos obligatorios.
- Mensaje para usuario inexistente.
- Validación de contraseña.
- Bloqueo tras tres intentos fallidos de contraseña en una cuenta existente.
- Modal de cuenta bloqueada.
- Inicio y cierre de sesión.

**RIU 3, 8, 9 y 10 — Perfiles**

- Dashboard exclusivo para administrador y usuario.
- Menú administrador: Home, Productos y Procesamiento de Pedido.
- Menú usuario: Home, Pedidos y Pedido Ingresado.
- Restricción de navegación hacia módulos de otros perfiles.
- Nombre del usuario y botón Cerrar sesión en el encabezado.

## 7. Pruebas de funcionamiento

**Inicio de sesión correcto:** ingresar con las credenciales de `admin` o `user` y comprobar que se carga el dashboard correspondiente.

**Usuario inexistente:** ingresar un usuario no registrado y una contraseña cualquiera. El sistema debe mostrar el mensaje de usuario no encontrado.

**Contraseña incorrecta:** ingresar un usuario existente con una contraseña inválida. El sistema informa los intentos restantes.

**Bloqueo de cuenta:** ingresar tres contraseñas incorrectas consecutivas utilizando la misma cuenta. Debe mostrarse el modal «Cuenta bloqueada — Ha superado los 3 intentos».

**Restricciones de perfiles:** iniciar sesión como `user` e intentar acceder a `#productos`. El sistema debe regresar a Home. Repetir con `admin` intentando acceder a `#pedidos`.

**Cierre de sesión:** presionar «Cerrar sesión» y verificar el retorno a la pantalla de Login.

### Restablecimiento de cuentas de prueba

Los intentos fallidos se almacenan en `localStorage`, por lo que el bloqueo persiste al recargar la página.

Para repetir las pruebas, abrir las herramientas de desarrollador del navegador y eliminar las claves `intentos_admin` e `intentos_user` del almacenamiento local correspondiente al proyecto.

## 8. Estado del desarrollo

**Semana 1:** implementación del Login, dashboards y navegación por perfiles.

**Pendiente:** desarrollo funcional de Pedidos, Pedidos Ingresados, Productos y Procesamiento de Pedido.

La autenticación y el control de acceso actuales son demostrativos y se ejecutan mediante JavaScript del lado del cliente. No constituyen un mecanismo de seguridad de producción.

## 9. Repositorio

https://github.com/Bycross24/SuperMINI
