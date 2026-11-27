// SuperMINI - Hito 4: Productos (RIU 6) y Procesamiento (RIU 7)
// Se reutilizan únicamente las vistas presentes en los mockups del Informe 2.
let productoSeleccionado = null;
let pedidoProcesando = null;
const textoSeguro = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function modalFaltaSeleccion() {
    abrirModalAviso('Selección requerida', 'Error: Debe seleccionar una fila de la tabla antes de continuar.');
}
function selectorUnico(tbody, clase, alCambiar) {
    tbody.querySelectorAll('.' + clase).forEach(check => check.addEventListener('change', () => {
        tbody.querySelectorAll('.' + clase).forEach(otro => {
            if (otro !== check) otro.checked = false;
            otro.closest('tr').classList.toggle('fila-seleccionada', otro.checked);
        });
        check.closest('tr').classList.toggle('fila-seleccionada', check.checked);
        alCambiar(check.checked ? check.value : null);
    }));
}
function siguienteProductoId(productos) {
    const mayor = Math.max(6, ...productos.map(p => Number((p.id.match(/\d+$/) || [0])[0])));
    return 'PRO-' + String(mayor + 1).padStart(6, '0');
}
function renderizarVistaProductos(contenedor) {
    productoSeleccionado = null;
    const productos = obtenerProductos();
    contenedor.innerHTML = `<h2 class="titulo-productos">Productos</h2><div class="contenedor-tabla tabla-listado-contenedor"><table class="tabla-datos tabla-listado tabla-productos"><thead><tr>
        <th>Producto Número</th><th>Nombre</th><th>Cantidad</th><th>Valor</th><th>Estado</th>
        </tr></thead><tbody id="filasProductos"></tbody></table></div>
        <div class="grupo-botones"><button id="altaProducto" class="btn-accion btn-amarillo">Ingresar</button>
        <button id="editarProducto" class="btn-accion btn-editar-listado">Editar</button>
        <button id="eliminarProducto" class="btn-accion btn-rojo">Eliminar</button></div>`;
    const tbody = document.getElementById('filasProductos');
    tbody.innerHTML = productos.map(p => `<tr><td><label class="label-check"><input type="checkbox" class="check-producto" value="${textoSeguro(p.id)}"> ${textoSeguro(p.id)}</label></td>
    <td>${textoSeguro(p.nombre)}</td><td>${p.cantidad}</td><td>${formatearCLP(p.valor)}</td>
    <td><span class="etiqueta-estado ${p.estado === 'Habilitado' ? 'estado-habilitado' : 'estado-deshabilitado'}">${textoSeguro(p.estado)}</span></td></tr>`).join('');
    selectorUnico(tbody, 'check-producto', id => productoSeleccionado = id);
    document.getElementById('altaProducto').onclick = () => renderizarFormularioProducto(contenedor);
    document.getElementById('editarProducto').onclick = () => productoSeleccionado ? renderizarFormularioProducto(contenedor, productoSeleccionado) : modalFaltaSeleccion();
    document.getElementById('eliminarProducto').onclick = () => {
        if (!productoSeleccionado) return modalFaltaSeleccion();
        if (productoEnUsoEnPedidos(productoSeleccionado)) return abrirModalAviso('Aviso', 'No se puede eliminar el producto: está siendo usado en las vistas Pedidos, Pedido Ingresado o Procesamiento de Pedido.');
        abrirModalConfirmacion('Eliminar producto', '¿Está seguro que desea eliminar este producto?', () => {
            guardarProductos(obtenerProductos().filter(p => p.id !== productoSeleccionado));
            renderizarVistaProductos(contenedor);
        });
    };
}
function renderizarFormularioProducto(contenedor, id = null) {
    const existente = id ? obtenerProductos().find(p => p.id === id) : null;
    if (id && !existente) return renderizarVistaProductos(contenedor);
    const nuevoId = existente?.id || siguienteProductoId(obtenerProductos());
    const titulo = existente ? 'Editar Producto' : 'Ingresar Producto';
    contenedor.innerHTML = `<h2>${titulo}</h2><form id="formProducto" class="panel-formulario formulario-producto ${existente ? "formulario-editar" : "formulario-ingresar"}" novalidate>
        <div class="campos-producto">
        <div class="campo"><label for="productoNumero">Producto Número</label><input id="productoNumero" readonly value="${nuevoId}"></div>
        <div class="campo"><label for="productoNombre">Nombre</label><input id="productoNombre" required placeholder="Ingrese nombre del producto"></div>
        <div class="campo"><label for="productoCantidad">Cantidad</label><input id="productoCantidad" type="number" min="0" step="1" required></div>
        <div class="campo"><label for="productoValor">Valor</label><input id="productoValor" type="text" inputmode="numeric" required></div>
        <div class="campo"><label for="productoEstado">Estado</label><select id="productoEstado"><option>Habilitado</option><option>Deshabilitado</option></select></div>
        </div><div class="grupo-botones botones-form-producto"><button class="btn-accion btn-amarillo" type="submit">Guardar</button>
        <button class="btn-accion btn-rojo" id="borrarCamposProducto" type="button">Borrar</button>
        <button class="btn-accion btn-gris" id="volverProductos" type="button">Volver</button></div></form>`;
    const nombre = document.getElementById('productoNombre');
    const cantidad = document.getElementById('productoCantidad');
    const valor = document.getElementById('productoValor');
    const estado = document.getElementById('productoEstado');
    if (existente) { nombre.value = existente.nombre; cantidad.value = existente.cantidad; valor.value = formatearCLP(existente.valor); estado.value = existente.estado; }
    else { cantidad.value = '0'; valor.value = '$ 0'; }
    cantidad.addEventListener('input', () => { if (Number(cantidad.value) === 0) estado.value = 'Deshabilitado'; });
    document.getElementById('borrarCamposProducto').onclick = () => abrirModalConfirmacion(existente ? 'Borrar producto editado' : 'Borrar producto nuevo', '¿Desea borrar todos los datos ingresados en el formulario?', () => {
        nombre.value = ''; cantidad.value = '0'; valor.value = '$ 0'; estado.value = 'Deshabilitado';
    });
    document.getElementById('volverProductos').onclick = () => abrirModalConfirmacion('Volver', '¿Está seguro que desea volver? Los cambios no guardados se perderán.', () => renderizarVistaProductos(contenedor));
    document.getElementById('formProducto').onsubmit = evento => {
        evento.preventDefault();
        const c = Number(cantidad.value), v = Number(String(valor.value).replace(/[^0-9]/g, ""));
        if (!nombre.value.trim() || !Number.isInteger(c) || c < 0 || !Number.isInteger(v) || v <= 0) return abrirModalAviso('Error', 'Complete los campos con un nombre, cantidad entera no negativa y valor positivo.');
        const nuevoEstado = c === 0 ? 'Deshabilitado' : estado.value;
        if (existente && v !== existente.valor && (existente.estado === 'Deshabilitado' || productoEnUsoEnPedidos(existente.id))) {
            return abrirModalAviso('Aviso', 'No se puede modificar el valor del producto: está deshabilitado o se utiliza en pedidos registrados.');
        }
        if (existente && nuevoEstado === 'Deshabilitado' && productoEnUsoEnPedidos(existente.id)) {
            return abrirModalAviso('Aviso', 'No se puede deshabilitar el producto: está siendo usado en las vistas Pedidos, Pedido Ingresado o Procesamiento de Pedido.');
        }
        const lista = obtenerProductos();
        const registro = {id: nuevoId, nombre: nombre.value.trim(), cantidad: c, valor: v, estado: nuevoEstado};
        const idx = lista.findIndex(p => p.id === nuevoId);
        if (idx >= 0) lista[idx] = registro; else lista.push(registro);
        guardarProductos(lista);
        renderizarVistaProductos(contenedor);
    };
}
function renderizarVistaProcesamiento(contenedor) {
    pedidoProcesando = null;
    const pendientes = obtenerPedidos().filter(p => p.estadoProceso === 'Pendiente');
    contenedor.innerHTML = `<h2>Procesamiento de pedido - Paso 1</h2><div class="contenedor-tabla tabla-listado-contenedor"><table class="tabla-datos tabla-listado"><thead><tr><th>Número de Pedido</th><th>Nombre Completo</th><th>Correo</th><th>Teléfono</th><th>Total</th></tr></thead>
    <tbody id="pedidosProcesar"></tbody></table></div><div class="grupo-botones"><button id="procesarSeleccion" class="btn-accion btn-amarillo">Procesar</button></div>`;
    const tbody = document.getElementById('pedidosProcesar');
    tbody.innerHTML = pendientes.map(p => `<tr><td><label class="label-check"><input type="checkbox" class="check-procesamiento" value="${textoSeguro(p.id)}"> ${textoSeguro(p.id)}</label></td><td>${textoSeguro(p.cliente.nombre)}</td><td>${textoSeguro(p.cliente.correo)}</td><td>${textoSeguro(p.cliente.telefono)}</td><td>${formatearCLP(p.total)}</td></tr>`).join('');
    selectorUnico(tbody, 'check-procesamiento', id => pedidoProcesando = id);
    document.getElementById('procesarSeleccion').onclick = () => pedidoProcesando ? renderizarPasoDos(contenedor, pedidoProcesando) : modalFaltaSeleccion();
}
function renderizarPasoDos(contenedor, id) {
    const pedido = obtenerPedidos().find(p => p.id === id);
    if (!pedido) return renderizarVistaProcesamiento(contenedor);
    const c = pedido.cliente;
    contenedor.innerHTML = `<div class="vista-proceso-paso2"><h2>Procesamiento de pedido - Paso 2</h2><p class="meta-pedido">Pedido ${textoSeguro(pedido.id)} &nbsp; | &nbsp; Fecha: ${textoSeguro(pedido.fecha)}</p>
    <h3 class="subtitulo-seccion">Datos del cliente</h3><div class="panel-formulario grid-lectura">
    ${[['Nombre completo',c.nombre],['RUN',c.run],['Teléfono',c.telefono],['Correo electrónico',c.correo],['Dirección',c.direccion]].map(([t,v])=>`<div class="dato-lectura"><span>${t}</span><strong>${textoSeguro(v)}</strong></div>`).join('')}</div>
    <h3 class="subtitulo-seccion">Detalle del pedido</h3><div class="contenedor-tabla"><table class="tabla-datos tabla-detalle"><thead><tr><th>Cantidad</th><th>Producto</th><th>Valor Unitario</th><th>Valor de Venta</th></tr></thead><tbody>
    ${pedido.items.map(it=>`<tr><td>${it.cantidad}</td><td>${textoSeguro(it.producto)}</td><td>${formatearCLP(it.valorUnitario)}</td><td>${formatearCLP(it.valorVenta)}</td></tr>`).join('')}</tbody></table></div>
    <div class="barra-inferior-pedido total-procesamiento"><strong>Total</strong><div class="valor-total">${formatearCLP(pedido.total)}</div></div>
    <div class="grid-controles-proceso"><div class="campo"><label for="selectorVB">V.B.</label><select id="selectorVB"><option value="">Seleccione una opción</option><option value="Si">Sí</option><option value="No">No</option><option value="Pendiente">Pendiente</option></select></div>
    <div class="campo"><label for="selectorEnviar">Enviar</label><select id="selectorEnviar" disabled><option value="">Seleccione una opción</option><option>Producción</option><option>Bodega</option></select></div></div>
    <div class="grupo-botones acciones-procesamiento"><button id="volverProcesar" class="btn-accion btn-gris">Volver</button><button id="aceptarProcesar" class="btn-accion btn-amarillo" disabled>Aceptar</button></div></div>`;
    const vb = document.getElementById('selectorVB'), destino = document.getElementById('selectorEnviar'), aceptar = document.getElementById('aceptarProcesar');
    vb.onchange = () => { destino.disabled = !vb.value; if (destino.disabled) destino.value = ''; aceptar.disabled = !vb.value || !destino.value; };
    destino.onchange = () => aceptar.disabled = !vb.value || !destino.value;
    document.getElementById('volverProcesar').onclick = () => renderizarVistaProcesamiento(contenedor);
    aceptar.onclick = () => {
        if (!vb.value || !destino.value) return;
        const lista = obtenerPedidos(); const actual = lista.find(p=>p.id===id);
        if (!actual) return;
        actual.vb = vb.value === 'Si' ? 'Sí' : vb.value;
        actual.destino = destino.value;
        actual.estadoProceso = 'Procesado';
        guardarPedidos(lista);
        // El RIU 7 y los mockups no requieren una ventana de éxito adicional.
        renderizarVistaProcesamiento(contenedor);
    };
}
