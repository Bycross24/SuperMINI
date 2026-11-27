# SuperMINI — Registro y propuestas de prompts RECETA

> **Trazabilidad:** Los prompts 01–05 se transcriben del archivo aportado por el equipo (*Prompts código interfaz.docx*). Los prompts 06–09 son **propuestas de redacción para documentar y reproducir el avance 2**; no son evidencia de que se hayan ejecutado literalmente. Antes de entregar, registrar fechas, herramientas y resultados reales de los prompts efectivamente utilizados.

## Parte A. Prompts del equipo — avance 1


### Prompt 01 — Maquetación base de SuperMINI

Rol: Actúa como desarrollador frontend especializado en HTML5, CSS3 y JavaScript.  
Enfoque: Implementa la estructura base del sistema de gestión de pedidos SuperMINI, considerando el RIU 1 y los mockups desarrollados en Figma.  
Claridad: La interfaz debe contener tres secciones: HEAD, con el logotipo SuperMINI y el menú horizontal debajo; BODY, destinado a formularios y vistas del sistema; y FOOT, con enlaces de navegación, contacto, redes sociales y copyright. Mantén la paleta corporativa azul grisáceo (#3F4E5F), amarillo (#FFD43B) y blanco.  
Estructura: Organiza el código en index.html, css/estilos.css y js/login.js, utilizando HTML semántico y estilos reutilizables.  
Tono: Genera código ordenado, comprensible y consistente con el diseño original.  
Audiencia: Equipo de desarrollo de SuperMINI y usuarios finales del sistema.  
Resultado solicitado: Entregar la maquetación base, manteniendo una estructura común entre las distintas interfaces.  

### Prompt 02 — Implementación del Login de SuperMINI

Rol: Actúa como desarrollador frontend con experiencia en formularios, validaciones y manejo de sesiones de demostración.  
Enfoque: Implementa el Login del sistema SuperMINI, respetando los RIU 2 y 3 y los mockups de inicio de sesión, error y cuenta bloqueada.  
Claridad: Incorpora campos de usuario y contraseña, validación de campos obligatorios, mensaje específico para usuario inexistente y bloqueo de la cuenta después de tres intentos fallidos. El bloqueo debe informarse mediante un modal. Considera dos perfiles, admin y user, con credenciales ficticias.  
Estructura: Utiliza HTML5, CSS3 y JavaScript. Evita que las credenciales aparezcan en la URL y utiliza almacenamiento del navegador únicamente para demostrar el manejo de sesiones e intentos fallidos.  
Tono: Genera código claro, modular y fácil de mantener.  
Audiencia: Equipo de desarrollo encargado de implementar las funcionalidades del sistema.  
Resultado solicitado: Entregar un Login funcional con estados de error y bloqueo, manteniendo fidelidad visual con Figma.  

### Prompt 03 — Dashboards y control de acceso por perfiles

Rol: Actúa como desarrollador frontend especializado en interfaces web con distintos perfiles de usuario.  
Enfoque: Implementa los dashboards de SuperMINI correspondientes a los perfiles administrador y usuario, respetando los RIU 8, 9 y 10.  
Claridad: El perfil admin debe visualizar Home, Productos y Procesamiento de Pedido; el perfil user debe visualizar Home, Pedidos y Pedido Ingresado. Ambos dashboards deben mostrar un mensaje de bienvenida con el nombre del usuario y un botón Cerrar sesión visible en la esquina superior derecha. Impide la navegación hacia vistas que no correspondan al perfil.  
Estructura: Utiliza JavaScript para mostrar dinámicamente los menús y dashboards, manteniendo los archivos HTML, CSS y JavaScript organizados.  
Tono: Genera código claro, reutilizable y coherente con el diseño de Figma.  
Audiencia: Administradores y usuarios del sistema SuperMINI.  
Resultado solicitado: Implementar navegación diferenciada, dashboards según perfil y cierre de sesión.  

### Prompt 04 — Corrección de estilos y fidelidad visual

Rol: Actúa como desarrollador frontend especializado en implementación de interfaces a partir de mockups.  
Enfoque: Revisa y corrige la apariencia de las interfaces programadas de SuperMINI para aproximarlas a los diseños originales de Figma.  
Claridad: Mantén el encabezado de 160 px, el footer de 96 px, la tarjeta Login de 480 px y las tarjetas de dashboards con dimensiones de referencia de 820 × 360 px. Utiliza texto azul grisáceo (#3F4E5F), botones amarillos (#FFD43B), títulos alineados a la izquierda y botones ubicados en la zona inferior izquierda de las tarjetas. Respeta las etiquetas y la distribución de cada mockup.  
Estructura: Modifica los estilos CSS existentes, eliminando reglas repetidas y utilizando variables para los colores corporativos.  
Tono: Código limpio, organizado y consistente.  
Audiencia: Equipo de desarrollo de SuperMINI.  
Resultado solicitado: Mejorar la fidelidad visual respecto de Figma sin alterar el funcionamiento implementado.  

### Prompt 05 — Refinamiento de estados de error y bloqueo

Rol: Actúa como desarrollador frontend especializado en validación de formularios y retroalimentación visual.  
Enfoque: Corrige los estados de error y bloqueo del Login de SuperMINI, tomando como referencia los mockups de Figma y el RIU 2.  
Claridad: Los mensajes de error deben ubicarse debajo del campo correspondiente y destacar el campo afectado. El bloqueo debe activarse después de tres contraseñas incorrectas asociadas a una misma cuenta de demostración. El modal debe presentar fondo oscurecido, ventana de 400 × 162 px, ícono de candado y el mensaje «Cuenta bloqueada. Ha superado los 3 intentos», sin botones adicionales, de acuerdo con el mockup original.  
Estructura: Ajusta HTML, CSS y JavaScript conservando la lógica de validación existente. Utiliza localStorage para registrar los intentos fallidos durante las pruebas locales.  
Tono: Código claro, conciso y coherente con los requerimientos.  
Audiencia: Equipo de desarrollo y usuarios del sistema SuperMINI.  
Resultado solicitado: Corregir los estados visuales del Login, manteniendo el bloqueo funcional y la correspondencia con Figma.  

## Parte B. Prompts propuestos — avance 2

### Prompt 06 — Pedidos: ingreso y edición — RIU 4

**Rol:** Actúa como desarrollador frontend de interfaces y validaciones de formularios chilenos.  
**Enfoque:** Implementa Ingresar Pedidos y Editar Pedidos dentro del único index.html, siguiendo exclusivamente los mockups existentes de SuperMINI y el RIU 4.  
**Claridad:** Incluye datos del cliente (nombre, RUN, teléfono, correo y dirección), cinco filas iniciales, cantidad, buscador predictivo desde tres caracteres para productos habilitados, valor unitario y valor de venta de solo lectura, cálculo total en CLP, agregar filas, restricciones al eliminar filas, desplazamiento al superar diez filas, errores y confirmación de Borrar. No agregues pantallas que no estén diseñadas.  
**Estructura:** Reutiliza index.html y css/estilos.css; implementa la vista en js/pedidos.js y comparte productos y pedidos mediante js/datos.js.  
**Tono:** Preciso, comprensible y consistente con los mockups.  
**Audiencia:** Perfil User, equipo desarrollador y evaluadores de la asignatura.  
**Resultado solicitado:** Vista de pedidos funcional, con validaciones y estados visuales asociados al RIU 4.  

### Prompt 07 — Pedido Ingresado — RIU 5

**Rol:** Actúa como desarrollador frontend especializado en tablas de gestión y confirmaciones.  
**Enfoque:** Implementa la vista Pedido Ingresado según los mockups del equipo y el RIU 5.  
**Claridad:** Muestra Número de Pedido, Nombre Completo, Correo, Teléfono y Total; una sola fila seleccionable; botones Editar (azul grisáceo #3F4E5F) y Eliminar (rojo); aviso al actuar sin selección y confirmación antes de eliminar. La edición debe recuperar los datos del pedido sin abrir una pantalla ajena al diseño.  
**Estructura:** Mantén el único index.html; utiliza js/pedidos.js, js/datos.js y estilos reutilizables en css/estilos.css.  
**Tono:** Claro, consistente y orientado a evitar errores.  
**Audiencia:** Perfil User y evaluadores.  
**Resultado solicitado:** Listado editable y eliminable con los estados existentes de Figma.  

### Prompt 08 — Productos: ingreso, edición y restricciones — RIU 6

**Rol:** Actúa como desarrollador frontend de mantenimiento de inventario y reglas de negocio.  
**Enfoque:** Implementa Productos, Ingresar Producto y Editar Producto usando los mockups del perfil Admin y el RIU 6.  
**Claridad:** Presenta la tabla con selección única y columnas Producto Número, Nombre, Cantidad, Valor y Estado. Usa botones Ingresar amarillo (#FFD43B), Editar azul grisáceo (#3F4E5F) y Eliminar rojo. Respeta que Ingresar Producto y Editar Producto tienen composiciones diferentes; incorpora los modales de Borrar y Volver que sí existen. Aplica reglas de cantidad cero, deshabilitación y protección de productos utilizados en pedidos. No afirmes que un aviso adaptado de eliminación tenga mockup propio.  
**Estructura:** Reutiliza index.html, css/estilos.css, js/admin.js y js/datos.js.  
**Tono:** Técnico, consistente y preventivo.  
**Audiencia:** Perfil Admin y evaluadores.  
**Resultado solicitado:** Gestión funcional de productos respetando los estados visuales disponibles.  

### Prompt 09 — Procesamiento de pedido en dos pasos — RIU 7

**Rol:** Actúa como desarrollador frontend especializado en flujos secuenciales con validación.  
**Enfoque:** Implementa los dos pasos de Procesamiento de Pedido del perfil Admin de acuerdo con Figma y el RIU 7.  
**Claridad:** En el Paso 1 muestra pedidos seleccionables y el botón Procesar; sin selección, utiliza el aviso diseñado. En el Paso 2 presenta referencia del pedido, datos de cliente y detalle de solo lectura, total resaltado a la derecha, los selectores V.B. y Enviar, y botones Volver y Aceptar. Enviar se habilita al seleccionar una opción no vacía de V.B. y Aceptar al completar ambos. No generes un modal de éxito que no exista entre los mockups.  
**Estructura:** Mantén el único index.html y gestiona estado y datos con js/admin.js y js/datos.js; usa css/estilos.css.  
**Tono:** Preciso y coherente con la navegación administrativa.  
**Audiencia:** Perfil Admin y docentes evaluadores.  
**Resultado solicitado:** Flujo funcional de procesamiento en dos pasos con estados disponibles de Figma.  
