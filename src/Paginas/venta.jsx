import { useState } from 'react';
import NavBar from '../Componentes/navbar';
import NuevoCliente from '../Componentes/ventas/nuevo-cliente';
import SelectProducto from '../Componentes/ventas/SelectPedido';
import NuevoPedido from '../Componentes/ventas/pedido';
import AsignarConductor from '../Componentes/ventas/asignarconductor';

import '../css/Venta.css';

const Venta = () => {
    const [clienteID, setClienteID] = useState(null);
    const [productoID, setProductoID] = useState(null);
    const [precio, setPrecio] = useState(0);
    const [pedidoID, setPedidoID] = useState(null);

    // Nuevo estado para controlar el flujo
    const [step, setStep] = useState(1);

    // Función para reiniciar todo
    const resetSteps = () => {
        setClienteID(null);
        setProductoID(null);
        setPrecio(0);
        setPedidoID(null);
        setStep(1); // Reiniciar al paso 1
    };

    return (
        <>
            <NavBar />
            <div>
                <h1 style={{ margin: "2rem" }}>Proceso de Venta</h1>

                {step === 1 && (
                    <>
                        <h2>Paso 1: Añadir Cliente</h2>
                        <NuevoCliente setClienteID={setClienteID} />
                        {clienteID && setStep(2)} {/* Mover al paso 2 si hay cliente */}
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Paso 2: Seleccionar Producto</h2>
                        <SelectProducto setProductoID={setProductoID} setPrecio={setPrecio} />
                        {productoID && setStep(3)} {/* Mover al paso 3 si hay producto */}
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Paso 3: Añadir Pedido</h2>
                        <NuevoPedido clienteID={clienteID} productoID={productoID} precio={precio} setPedidoID={setPedidoID} />
                        {pedidoID && setStep(4)} {/* Mover al paso 4 si hay pedido */}
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2>Paso 4: Asignar Conductor</h2>
                        <AsignarConductor pedidoID={pedidoID} onComplete={resetSteps} /> {/* Pasar función al componente */}
                    </>
                )}
            </div>
        </>
    );
};

export default Venta;
