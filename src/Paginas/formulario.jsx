import React, { useState, useEffect } from 'react';
import NavBar from '../Componentes/navbar';

function Encuesta() {
    const [respuesta1, setRespuesta1] = useState(0);
    const [respuesta2, setRespuesta2] = useState(0);
    const [respuesta3, setRespuesta3] = useState(0);
    const [observaciones, setObservaciones] = useState('');
    const [estadoMercancia, setEstadoMercancia] = useState('');
    const [conductores, setConductores] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [selectedConductor, setSelectedConductor] = useState('');
    const [selectedSucursal, setSelectedSucursal] = useState('');

    // Cargar conductores y sucursales al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch conductores
                const conductoresResponse = await fetch('http://localhost:5000/sinencuesta'); 
                if (!conductoresResponse.ok) {
                    throw new Error('Error al obtener los conductores');
                }
                const conductoresData = await conductoresResponse.json();
                setConductores(Array.isArray(conductoresData) ? conductoresData : []);
                
                // Fetch sucursales
                const sucursalesResponse = await fetch('http://localhost:5000/api/puntosDeControl');
                if (!sucursalesResponse.ok) {
                    throw new Error('Error al obtener las sucursales');
                }
                const sucursalesData = await sucursalesResponse.json();
                setSucursales(Array.isArray(sucursalesData) ? sucursalesData : []);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (respuesta1 === 0 || respuesta2 === 0 || respuesta3 === 0 || estadoMercancia === '' || !selectedConductor || !selectedSucursal) {
            alert('Por favor, responde todas las preguntas y selecciona el estado de la mercancía, conductor y sucursal.');
            return;
        }

        const data = {
            conductorId: selectedConductor,
            sucursalId: selectedSucursal,
            respuestas: [respuesta1, respuesta2, respuesta3],
            observaciones,
            estadoMercancia,
        };

        try {
            const response = await fetch('http://localhost:5000/encuesta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert(`Encuesta enviada exitosamente. Promedio de satisfacción: ${result.promedio}`);
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error al enviar la encuesta:', error);
            alert('Hubo un error al enviar la encuesta.');
        }
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '10px', width: '900px', height: '850px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h2>Evaluación de la entrega</h2>
                        <h2>de</h2>
                        <h2>las galletitas Lincolm</h2>
                    </div>
                    
                    <div style={{ marginTop: '20px' }}>
                        <label htmlFor="conductor">Selecciona un conductor:</label>
                        <select
                            id="conductor"
                            value={selectedConductor}
                            onChange={(e) => setSelectedConductor(e.target.value)}
                            style={{ width: '100%', borderRadius: '5px', border: '1px solid black' }}
                        >
                            <option value="">Selecciona un conductor</option>
                            {conductores.length > 0 ? (
                                conductores.map((conductor) => (
                                    <option key={conductor.ID} value={conductor.ID}>{conductor.NombreCompleto}</option>
                                ))
                            ) : (
                                <option disabled>No hay conductores disponibles</option>
                            )}
                        </select>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label htmlFor="sucursal">Selecciona una sucursal:</label>
                        <select
                            id="sucursal"
                            value={selectedSucursal}
                            onChange={(e) => setSelectedSucursal(e.target.value)}
                            style={{ width: '100%', borderRadius: '5px', border: '1px solid black' }}
                        >
                            <option value="">Selecciona una sucursal</option>
                            {sucursales.length > 0 ? (
                                sucursales.map((sucursal) => (
                                    <option key={sucursal.ID} value={sucursal.ID}>{sucursal.Direccion}</option>
                                ))
                            ) : (
                                <option disabled>No hay sucursales disponibles</option>
                            )}
                        </select>
                    </div>

                    <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                        <p>1. ¿Cómo calificarías el tiempo de llegada de la carga?</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button key={num} type="button" onClick={() => setRespuesta1(num)} style={{ backgroundColor: num <= 3 ? 'red' : num <= 7 ? 'yellow' : 'green', color: num <= 7 ? 'black' : 'white', border: 'none', width: '20px' }}>
                                {num}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                        <p>2. ¿Cómo calificarías la calidad de empaque de las galletas?</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button key={num} type="button" onClick={() => setRespuesta2(num)} style={{ backgroundColor: num <= 3 ? 'red' : num <= 7 ? 'yellow' : 'green', color: num <= 7 ? 'black' : 'white', border: 'none', width: '20px' }}>
                                {num}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                        <p>3. ¿Cómo calificarías el estado del empleado?</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button key={num} type="button" onClick={() => setRespuesta3(num)} style={{ backgroundColor: num <= 3 ? 'red' : num <= 7 ? 'yellow' : 'green', color: num <= 7 ? 'black' : 'white', border: 'none', width: '20px' }}>
                                {num}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label htmlFor="observaciones">Observaciones adicionales:</label>
                        <textarea
                            id="observaciones"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            style={{ width: '100%', height: '100px', borderRadius: '5px', border: '1px solid black' }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label htmlFor="estado">Estado de la mercancía:</label>
                        <select
                            id="estado"
                            value={estadoMercancia}
                            onChange={(e) => setEstadoMercancia(e.target.value)}
                            style={{ width: '100%', borderRadius: '5px', border: '1px solid black' }}
                        >
                            <option value="">Selecciona el estado</option>
                            <option value="Buena">Buena</option>
                            <option value="Regular">Regular</option>
                            <option value="Mala">Mala</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" style={{ width: '150px', height: '50px', borderRadius: '10px', backgroundColor: 'green', color: 'white', fontSize: '20px', border: 'none' }}>
                            Enviar Encuesta
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Encuesta;