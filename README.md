# SuperMINI — Evaluación 3 | Avance 2

Prototipo académico de gestión de pedidos de una cadena de supermercados, desarrollado para **Diseño de Interfaces de Usuario** de Ingeniería Informática Empresarial, Universidad de Talca. Implementa los requerimientos de interfaz de usuario (RIU) y toma como referencia los mockups de la Evaluación 2.

## 1. Ejecutar el proyecto

1. Descarga este repositorio mediante **Code → Download ZIP** o clónalo.
2. Descomprime el ZIP y abre **la carpeta completa** en IntelliJ IDEA con **File → Open**.
3. Abre `index.html` en Chrome (desde IntelliJ o directamente en el navegador).
4. Inicia sesión con alguna de las cuentas de demostración.

No requiere instalación de bibliotecas, servidor de aplicación ni base de datos externa. Utiliza JavaScript y `localStorage` para almacenar los productos y pedidos en **ese navegador**. La tipografía Inter puede cargarse desde Google Fonts si hay conexión; existe un tipo de letra de respaldo.

### Credenciales de demostración

| Perfil | Usuario | Contraseña |
|---|---|---|
| Administrador | `admin` | `AdminDemo123` |
| Usuario | `user` | `UserDemo123` |

## 2. Archivos del proyecto

```text
SuperMINI/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   ├── datos.js
│   ├── pedidos.js
│   ├── admin.js
│   └── login.js
├── README.md
└── PROMPTS_RECETA.md
```

La aplicación usa **un único `index.html`**; sus pantallas se presentan por navegación interna (`#home`, `#pedidos`, `#pedidos-ingresados`, `#productos`, `#procesamiento`). No hay páginas HTML separadas para cada vista. Los documentos de revisión que acompañan algunas copias de trabajo son materiales auxiliares, no requisitos para ejecutar el sitio.

## 3. Funcionalidades por perfil

**Compartidas (RIU 1, 2, 3, 8, 9 y 10):** encabezado y pie comunes; Login con errores y bloqueo por intentos; dashboards y navegación diferenciada; cierre de sesión; restricción de vistas según perfil.

**Perfil User:**
- **RIU 4 — Pedidos:** formulario del cliente, RUN, contacto, buscador de productos habilitados desde tres caracteres, cantidades, valores y total CLP, filas dinámicas y confirmación al borrar.
- **RIU 5 — Pedido Ingresado:** listado de pedidos, selección única, edición y eliminación con confirmación.

**Perfil Admin:**
- **RIU 6 — Productos:** listado, ingreso, edición y eliminación, con restricciones de stock y productos vinculados a pedidos.
- **RIU 7 — Procesamiento:** selección de pedido, revisión en dos pasos, datos en lectura, V.B. y destino Enviar con habilitación condicionada.

La implementación reproduce las vistas y estados disponibles en los mockups; ciertas alertas de restricciones son adaptaciones funcionales de los RIU y no necesariamente tienen un mockup propio.

## 4. Datos de ejemplo y reinicio

Esta entrega utiliza claves de demostración nuevas (v6) para que puedas recuperar los productos eliminados en versiones anteriores **sin borrar el almacenamiento v5**. En una primera ejecución, el navegador carga los **seis productos** y **seis pedidos** iniciales de demostración, siguiendo el material de referencia. Después, los cambios permanecen guardados en el navegador.

Claves de `localStorage` de esta versión:
- `supermini_productos_figma_v6`
- `supermini_pedidos_figma_v6`

Si usas esta entrega por primera vez desde la misma dirección de localhost, los seis productos (incluidos Azúcar y Café deshabilitados) aparecerán automáticamente. Al eliminar un producto de nuevo, el cambio persistirá en v6. Para **restablecer los datos iniciales**, abre Chrome → Herramientas para desarrolladores → **Application → Local Storage**, selecciona la dirección desde la que abres SuperMINI y elimina *solo* esas dos claves. Después recarga. **Esto elimina los pedidos y productos que hayas cambiado o creado en esa versión**; no lo hagas si necesitas conservarlos. Los bloqueos por intentos usan otras claves (`intentos_admin` y `intentos_user`).

## 5. Pruebas manuales sugeridas

1. Inicia sesión como `user`; busca `lec` en Pedidos y selecciona **Leche entera 1 L**. Comprueba que aparecen su precio y los cálculos en CLP.
2. Intenta enviar un pedido con campos incompletos y comprueba los mensajes de validación.
3. Agrega más de diez filas y revisa el desplazamiento de la tabla. Comprueba las restricciones al eliminar filas con productos.
4. En **Pedido Ingresado**, comprueba la selección, edición y confirmación de eliminación.
5. Inicia sesión como `admin`; comprueba ingresar, editar y eliminar productos, y la restricción sobre productos asociados a pedidos.
6. En **Procesamiento de Pedido**, selecciona un pedido, entra al Paso 2 y comprueba la habilitación de V.B., Enviar y Aceptar.
7. Intenta abrir la ruta de Admin desde User y viceversa; verifica que no acceda a funciones de otro perfil.

## 6. Registro de prompts y evidencia

Los prompts de la semana 1 y las propuestas del avance 2 se organizan en [`PROMPTS_RECETA.md`](PROMPTS_RECETA.md). Los prompts 01–05 fueron aportados por el equipo; los prompts 06–09 son **redacciones propuestas a partir del código y los requerimientos**, y deben identificarse como tales hasta que exista evidencia de su uso real.

Las capturas comparativas, pruebas ejecutadas y matriz de trazabilidad pueden incorporarse a la documentación de la Evaluación 3 conforme a la pauta de la asignatura.

## 7. Limitaciones

Es un prototipo **sin backend, cuentas reales ni controles de seguridad de producción**. Los datos, credenciales y sesiones son demostrativos: no introducir información real o sensible. La fidelidad visual depende de la resolución y tipografías; no se afirma equivalencia exacta píxel a píxel para todos los estados. No se deben confundir estados implementados por reglas del RIU con mockups originales inexistentes.


## Ajuste solicitado por el profesor

En el encabezado y en los dashboards se muestran los nombres **Juan** (perfil admin) y **Maria** (perfil user). Las credenciales de inicio de sesión `admin` y `user` no cambian. Este ajuste sustituye los nombres de demostración JuanPerez y MariaPerez que aparecen en los mockups de Evaluación 2.
