// ===================================
// SUPERMINI - MÓDULOS PERFIL USER
// RIU 4 (Pedidos) y RIU 5 (Pedido Ingresado)
// ===================================

function validarRUNChileno(run) {
    const limpio = run.trim();
    if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(limpio)) return false;

    const cuerpo = limpio.slice(0, -2).replace(/\./g, "");
    const dv = limpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === esperado;
}

function validarTelefonoChileno(telefono) {
    return /^\+56\s?9\s?\d{4}\s?\d{4}$/.test(telefono.trim());
}

function validarCorreoElectronico(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

// ===================================
// RIU 4: INGRESO Y EDICIÓN DE PEDIDOS
// ===================================

function renderizarVistaPedidos(contenedor) {
    const pedidos = obtenerPedidos();
    const pedidoAEditar = pedidoEnEdicionId
        ? pedidos.find(p => p.id === pedidoEnEdicionId)
        : null;

    const tituloPagina = pedidoAEditar
        ? `Editar pedido — ${pedidoAEditar.id}`
        : "Ingresar nuevo pedido";

    contenedor.innerHTML = `
        <div class="modulo-pedidos"><h2 id="tituloVistaPedido">${tituloPagina}</h2>

        <form id="formPedido" novalidate>
            <h3 class="subtitulo-seccion">Datos del cliente</h3>

            <div class="grid-cliente">
                <div class="campo">
                    <label for="pedNombre">Nombre completo<span class="asterisco">*</span></label>
                    <input type="text" id="pedNombre" placeholder="Ingrese nombre completo" maxlength="255" required>
                    <p class="mensaje-error" id="errPedNombre" hidden></p>
                </div>

                <div class="campo">
                    <label for="pedRun">RUN<span class="asterisco">*</span></label>
                    <input type="text" id="pedRun" placeholder="12.345.678-9" maxlength="12" required>
                    <p class="mensaje-error" id="errPedRun" hidden></p>
                </div>

                <div class="campo">
                    <label for="pedTelefono">Teléfono<span class="asterisco">*</span></label>
                    <input type="text" id="pedTelefono" placeholder="+56 9 1234 5678" maxlength="15" required>
                    <p class="mensaje-error" id="errPedTelefono" hidden></p>
                </div>

                <div class="campo">
                    <label for="pedCorreo">Correo electrónico<span class="asterisco">*</span></label>
                    <input type="email" id="pedCorreo" placeholder="nombre@correo.cl" required>
                    <p class="mensaje-error" id="errPedCorreo" hidden></p>
                </div>

                <div class="campo">
                    <label for="pedDireccion">Dirección<span class="asterisco">*</span></label>
                    <input type="text" id="pedDireccion" placeholder="Calle, número, comuna" maxlength="255" required>
                    <p class="mensaje-error" id="errPedDireccion" hidden></p>
                </div>
            </div>

            <div class="subtitulo-seccion cabecera-detalle-pedido">
                <span>Detalle del pedido</span>
                <button type="button" id="btnAgregarFila" class="btn-accion btn-amarillo">
                    Agregar fila
                </button>
                <button type="button" id="btnEliminarFila" class="btn-accion btn-rojo">
                    Eliminar fila
                </button>
            </div>

            <div class="contenedor-tabla" id="contenedorTablaPedido">
                <table class="tabla-datos tabla-detalle">
                    <thead>
                        <tr>
                            <th style="width: 120px;">Cantidad</th>
                            <th>Producto</th>
                            <th style="width: 170px;">Valor Unitario</th>
                            <th style="width: 170px;">Valor de Venta</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyDetallePedido"></tbody>
                </table>
            </div>

            <div class="barra-inferior-pedido total-y-envio">
                <div class="caja-total">
                    <span>Total</span>
                    <div class="valor-total" id="totalPedido">$ 0</div>
                </div>

                <div class="grupo-botones" style="margin-top: 0;">
                    <button type="button" id="btnBorrarPedido" class="btn-accion btn-rojo">
                        Borrar
                    </button>
                    <button type="submit" id="btnEnviarPedido" class="btn-accion btn-amarillo">
                        Enviar
                    </button>
                </div>
            </div>
        </form></div>
    `;

    const tbody = document.getElementById("tbodyDetallePedido");
    const contenedorTabla = document.getElementById("contenedorTablaPedido");
    const totalEl = document.getElementById("totalPedido");
    const inputRun = document.getElementById("pedRun");

    // Auto-formato puntos y guión en RUN
    inputRun.addEventListener("input", function () {
        let val = inputRun.value.replace(/[^0-9kK]/g, "").toUpperCase();
        if (val.length > 1) {
            const dv = val.slice(-1);
            let num = val.slice(0, -1);
            num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            inputRun.value = `${num}-${dv}`;
        } else {
            inputRun.value = val;
        }
    });

    function actualizarScrollTabla() {
        if (tbody.rows.length > 10) {
            contenedorTabla.classList.add("scroll-filas");
        } else {
            contenedorTabla.classList.remove("scroll-filas");
        }
    }

    function recalcularTotales() {
        let sumaTotal = 0;
        Array.from(tbody.rows).forEach(fila => {
            const cant = Math.max(0, Number(fila.querySelector(".input-cant").value) || 0);
            const precioUnit = Number(fila.dataset.precioUnitario || 0);
            const subtotal = cant * precioUnit;
            fila.querySelector(".input-venta").value = formatearCLP(subtotal);
            sumaTotal += subtotal;
        });
        totalEl.textContent = formatearCLP(sumaTotal);
    }

    function agregarFilaDetalle(itemPrecargado = null) {
        const tr = document.createElement("tr");
        tr.dataset.productId = itemPrecargado ? itemPrecargado.productId : "";
        tr.dataset.precioUnitario = itemPrecargado ? String(itemPrecargado.valorUnitario) : "0";

        tr.innerHTML = `
            <td>
                <input type="number" class="input-tabla input-cant" min="0"
                       value="${itemPrecargado ? itemPrecargado.cantidad : 0}">
            </td>
            <td class="celda-buscador">
                <input type="text" class="input-tabla input-prod"
                       placeholder="Ingrese producto"
                       value="${itemPrecargado ? textoSeguro(itemPrecargado.producto) : ""}"
                       autocomplete="off">
                <div class="lista-sugerencias" hidden></div>
            </td>
            <td>
                <input type="text" class="input-tabla input-unit"
                       value="${itemPrecargado ? formatearCLP(itemPrecargado.valorUnitario) : "$ 0"}"
                       disabled>
            </td>
            <td>
                <input type="text" class="input-tabla input-venta"
                       value="${itemPrecargado ? formatearCLP(itemPrecargado.valorVenta) : "$ 0"}"
                       disabled>
            </td>
        `;

        const inputCant = tr.querySelector(".input-cant");
        const inputProd = tr.querySelector(".input-prod");
        const cajaSugerencias = tr.querySelector(".lista-sugerencias");
        const inputUnit = tr.querySelector(".input-unit");

        inputCant.addEventListener("input", recalcularTotales);

        // Buscador desde 3 letras: solo productos Habilitados con cantidad > 0
        inputProd.addEventListener("input", function () {
            const texto = inputProd.value.trim().toLowerCase();
            tr.dataset.productId = "";
            tr.dataset.precioUnitario = "0";
            inputUnit.value = "$ 0";
            recalcularTotales();

            if (texto.length < 3) {
                cajaSugerencias.hidden = true;
                cajaSugerencias.innerHTML = "";
                return;
            }

            const disponibles = obtenerProductos().filter(p =>
                p.estado === "Habilitado" &&
                p.cantidad > 0 &&
                p.nombre.toLowerCase().includes(texto)
            );

            if (disponibles.length === 0) {
                cajaSugerencias.innerHTML = `
                    <div class="item-sugerencia-vacio">Sin coincidencias habilitadas</div>
                `;
                cajaSugerencias.hidden = false;
                return;
            }

            cajaSugerencias.innerHTML = disponibles.map(p => `
                <div class="item-sugerencia"
                     data-id="${p.id}"
                     data-nombre="${p.nombre}"
                     data-valor="${p.valor}">
                    <span>&#128269; ${p.nombre}</span>
                    <strong>${formatearCLP(p.valor)}</strong>
                </div>
            `).join("");

            cajaSugerencias.hidden = false;

            cajaSugerencias.querySelectorAll(".item-sugerencia").forEach(opcion => {
                opcion.addEventListener("click", function () {
                    inputProd.value = opcion.dataset.nombre;
                    tr.dataset.productId = opcion.dataset.id;
                    tr.dataset.precioUnitario = opcion.dataset.valor;
                    inputUnit.value = formatearCLP(opcion.dataset.valor);
                    if (Number(inputCant.value) === 0) {
                        inputCant.value = 1;
                    }
                    cajaSugerencias.hidden = true;
                    recalcularTotales();
                });
            });
        });

        document.addEventListener("click", function (e) {
            if (!tr.contains(e.target)) {
                cajaSugerencias.hidden = true;
            }
        });

        tbody.appendChild(tr);
        actualizarScrollTabla();
    }

    function limpiarFormularioPedido() {
        document.getElementById("formPedido").reset();
        document.querySelectorAll("#formPedido .mensaje-error").forEach(el => {
            el.hidden = true;
            el.textContent = "";
        });
        document.querySelectorAll("#formPedido input").forEach(el => {
            el.classList.remove("input-error");
        });
        tbody.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            agregarFilaDetalle();
        }
        recalcularTotales();
    }

    // Cargar datos si viene desde Editar en Pedido Ingresado
    if (pedidoAEditar) {
        document.getElementById("pedNombre").value = pedidoAEditar.cliente.nombre;
        document.getElementById("pedRun").value = pedidoAEditar.cliente.run;
        document.getElementById("pedTelefono").value = pedidoAEditar.cliente.telefono;
        document.getElementById("pedCorreo").value = pedidoAEditar.cliente.correo;
        document.getElementById("pedDireccion").value = pedidoAEditar.cliente.direccion;

        pedidoAEditar.items.forEach(item => agregarFilaDetalle(item));
        recalcularTotales();
    } else {
        limpiarFormularioPedido();
    }

    document.getElementById("btnAgregarFila").addEventListener("click", function () {
        agregarFilaDetalle();
    });

    document.getElementById("btnEliminarFila").addEventListener("click", function () {
        // RIU 4: solo se pueden eliminar filas vacías; una fila con producto no se borra.
        // Se conserva siempre al menos una fila en blanco.
        const filas = Array.from(tbody.rows);
        const vacias = filas.filter(f => !f.dataset.productId && !f.querySelector('.input-prod').value.trim() && Number(f.querySelector('.input-cant').value || 0) === 0);
        if (vacias.length <= 1) return;
        vacias[vacias.length - 1].remove();
        actualizarScrollTabla();
        recalcularTotales();
    });

    document.getElementById("btnBorrarPedido").addEventListener("click", function () {
        abrirModalConfirmacion(
            "Confirmar acción",
            "¿Desea borrar todos los datos ingresados en el pedido?",
            function () {
                pedidoEnEdicionId = null;
                document.getElementById("tituloVistaPedido").textContent = "Ingresar nuevo pedido";
                limpiarFormularioPedido();
            }
        );
    });

    document.getElementById("formPedido").addEventListener("submit", function (e) {
        e.preventDefault();

        const elNombre = document.getElementById("pedNombre");
        const elTel = document.getElementById("pedTelefono");
        const elCorreo = document.getElementById("pedCorreo");
        const elDir = document.getElementById("pedDireccion");

        let esValido = true;

        function validarCampo(input, idError, condicion, textoError) {
            const pErr = document.getElementById(idError);
            if (!condicion) {
                input.classList.add("input-error");
                pErr.textContent = textoError;
                pErr.hidden = false;
                esValido = false;
            } else {
                input.classList.remove("input-error");
                pErr.hidden = true;
            }
        }

        validarCampo(elNombre, "errPedNombre", /^[\p{L}\s]+$/u.test(elNombre.value.trim()) && elNombre.value.trim().length >= 3 && elNombre.value.trim().length <= 255, "Requerido: solo letras y espacios (3 a 255 caracteres)");
        validarCampo(inputRun, "errPedRun", validarRUNChileno(inputRun.value), "RUN inválido (ej: 12.345.678-9)");
        validarCampo(elTel, "errPedTelefono", validarTelefonoChileno(elTel.value), "Formato requerido: +56912345678 o +56 9 1234 5678");
        validarCampo(elCorreo, "errPedCorreo", validarCorreoElectronico(elCorreo.value), "Correo electrónico inválido");
        validarCampo(elDir, "errPedDireccion", elDir.value.trim().length >= 5, "Dirección requerida");

        const itemsValidos = [];
        let filasInvalidas = false;
        const cantidadesPorProducto = new Map();
        Array.from(tbody.rows).forEach(fila => {
            const cant = Number(fila.querySelector(".input-cant").value) || 0;
            const productId = fila.dataset.productId;
            const unit = Number(fila.dataset.precioUnitario || 0);
            const textoProducto = fila.querySelector(".input-prod").value.trim();
            const stock = obtenerProductos().find(p => p.id === productId)?.cantidad ?? 0;
            if (!productId && (textoProducto || cant > 0)) filasInvalidas = true;
            if (productId && (!Number.isInteger(cant) || cant <= 0 || cant > stock)) filasInvalidas = true;
            if (productId && Number.isInteger(cant) && cant > 0 && cant <= stock) {
                cantidadesPorProducto.set(productId, (cantidadesPorProducto.get(productId) || 0) + cant);
                if (cantidadesPorProducto.get(productId) > stock) filasInvalidas = true;
                itemsValidos.push({
                    productId,
                    producto: fila.querySelector(".input-prod").value,
                    cantidad: cant,
                    valorUnitario: unit,
                    valorVenta: cant * unit
                });
            }
        });

        if (!esValido || itemsValidos.length === 0 || filasInvalidas) {
            const faltanObligatorios = [elNombre, inputRun, elTel, elCorreo, elDir]
                .some(el => !el.value.trim());
            // La variante 158:219 añade tarjeta y mensajes bajo los campos.
            contenedor.querySelector('.modulo-pedidos').classList.add('estado-error');
            abrirModalAviso(
                'Error de validación',
                faltanObligatorios
                    ? 'Error: Existen campos obligatorios sin completar'
                    : filasInvalidas
                    ? 'Revise las cantidades, el stock disponible y la selección de productos de cada fila.'
                    : !esValido
                    ? 'Revise los formatos de los datos del cliente.'
                    : 'Debe ingresar al menos un producto habilitado con cantidad mayor a 0.',
                'alerta'
            );
            return;
        }

        const totalCalculado = itemsValidos.reduce((acc, it) => acc + it.valorVenta, 0);
        const listaPedidos = obtenerPedidos();

        if (pedidoAEditar) {
            const idx = listaPedidos.findIndex(p => p.id === pedidoAEditar.id);
            if (idx !== -1) {
                listaPedidos[idx].cliente = {
                    nombre: elNombre.value.trim(),
                    run: inputRun.value.trim(),
                    telefono: elTel.value.trim(),
                    correo: elCorreo.value.trim(),
                    direccion: elDir.value.trim()
                };
                listaPedidos[idx].items = itemsValidos;
                listaPedidos[idx].total = totalCalculado;
            }
            guardarPedidos(listaPedidos);
            pedidoEnEdicionId = null;

            location.hash = "pedidos-ingresados";
        } else {
            const correlativo = Math.max(1026, ...listaPedidos.map(p => Number((p.id.match(/\d+$/) || [0])[0]))) + 1;
            const nuevoPedido = {
                id: `PED-00${correlativo}`,
                fecha: new Date().toLocaleDateString("es-CL"),
                cliente: {
                    nombre: elNombre.value.trim(),
                    run: inputRun.value.trim(),
                    telefono: elTel.value.trim(),
                    correo: elCorreo.value.trim(),
                    direccion: elDir.value.trim()
                },
                items: itemsValidos,
                total: totalCalculado,
                estadoProceso: "Pendiente",
                vb: "",
                destino: ""
            };

            listaPedidos.unshift(nuevoPedido);
            guardarPedidos(listaPedidos);

            location.hash = "pedidos-ingresados";
        }
    });
}

// ===================================
// RIU 5: PEDIDO INGRESADO
// ===================================

function renderizarVistaPedidosIngresados(contenedor) {
    let pedidoSeleccionadoId = null;

    contenedor.innerHTML = `
        <h2>Pedidos ingresados</h2>

        <div class="contenedor-tabla tabla-listado-contenedor">
            <table class="tabla-datos tabla-listado">
                <thead>
                    <tr>
                        <th>Número de Pedido</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="tbodyPedidosIngresados"></tbody>
            </table>
        </div>

        <div class="grupo-botones">
            <button type="button" id="btnEditarPedidoIngresado" class="btn-accion btn-editar-listado">
                Editar
            </button>
            <button type="button" id="btnEliminarPedidoIngresado" class="btn-accion btn-rojo">
                Eliminar
            </button>
        </div>
    `;

    const tbody = document.getElementById("tbodyPedidosIngresados");

    function cargarTablaPedidos() {
        const pedidos = obtenerPedidos();
        pedidoSeleccionadoId = null;

        tbody.innerHTML = pedidos.map(p => `
            <tr>
                <td>
                    <label class="label-check">
                        <input type="checkbox" class="check-pedido" value="${p.id}">
                        <span>${p.id}</span>
                    </label>
                </td>
                <td>${textoSeguro(p.cliente.nombre)}</td>
                <td>${textoSeguro(p.cliente.correo)}</td>
                <td>${textoSeguro(p.cliente.telefono)}</td>
                <td>${formatearCLP(p.total)}</td>
            </tr>
        `).join("");

        tbody.querySelectorAll(".check-pedido").forEach(cb => {
            cb.addEventListener("change", function () {
                tbody.querySelectorAll(".check-pedido").forEach(otro => {
                    if (otro !== cb) otro.checked = false;
                    otro.closest("tr").classList.remove("fila-seleccionada");
                });
                if (cb.checked) {
                    pedidoSeleccionadoId = cb.value;
                    cb.closest("tr").classList.add("fila-seleccionada");
                } else {
                    pedidoSeleccionadoId = null;
                }
            });
        });
    }

    cargarTablaPedidos();

    document.getElementById("btnEditarPedidoIngresado").addEventListener("click", function () {
        if (!pedidoSeleccionadoId) {
            abrirModalAviso(
                "Selección requerida",
                "Error: Debe seleccionar una fila de la tabla antes de continuar.",
                "alerta"
            );
            return;
        }
        pedidoEnEdicionId = pedidoSeleccionadoId;
        location.hash = "pedidos";
    });

    document.getElementById("btnEliminarPedidoIngresado").addEventListener("click", function () {
        if (!pedidoSeleccionadoId) {
            abrirModalAviso(
                "Selección requerida",
                "Error: Debe seleccionar una fila de la tabla antes de continuar.",
                "alerta"
            );
            return;
        }

        abrirModalConfirmacion(
            "Eliminar pedido",
            "¿Desea eliminar el pedido seleccionado de la lista?",
            function () {
                const restantes = obtenerPedidos().filter(p => p.id !== pedidoSeleccionadoId);
                guardarPedidos(restantes);
                cargarTablaPedidos();
            }
        );
    });
}