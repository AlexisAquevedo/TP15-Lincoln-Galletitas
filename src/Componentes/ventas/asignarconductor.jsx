import React, { useEffect, useState } from 'react';

const AsignarConductor = ({ pedidoID, onComplete }) => {
    const [conductores, setConductores] = useState([]);
    const [puntosDeControl, setPuntosDeControl] = useState([]);
    const [conductorID, setConductorID] = useState('');
    const [puntoDeControlID, setPuntoDeControlID] = useState('');

    useEffect(() => {
        const fetchConductores = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/conductores'); 
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setConductores(data);
            } catch (error) {
                console.error("Error fetching conductores:", error);
            }
        };

        const fetchPuntosDeControl = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/puntosDeControl'); 
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setPuntosDeControl(data);
            } catch (error) {
                console.error("Error fetching puntos de control:", error);
            }
        };

        fetchConductores();
        fetchPuntosDeControl();
    }, []);

    const handleAsignar = async () => {
        if (!conductorID || !puntoDeControlID) {
            alert("Por favor, selecciona un conductor y un punto de control.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/asignarConductor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pedidoID, conductorID, puntoDeControlID }), 
            });

            if (response.ok) {
                alert("Conductor asignado exitosamente.");
                onComplete();
            } else {
                const errorText = await response.text();
                console.error("Error al asignar conductor:", errorText);
                alert("Error al asignar el conductor.");
            }
        } catch (error) {
            console.error("Error al asignar el conductor:", error);
        }
    };

    return (
        <div>
            <h2>Asignar Conductor</h2>
            <select value={conductorID} onChange={(e) => setConductorID(e.target.value)}>
                <option value="">Seleccionar conductor</option>
                {conductores.map(conductor => (
                    <option key={conductor.ID} value={conductor.ID}>
                        {conductor.NombreCompleto} - {conductor.Telefono}
                    </option>
                ))}
            </select>

            <select value={puntoDeControlID} onChange={(e) => setPuntoDeControlID(e.target.value)}>
                <option value="">Seleccionar punto de control</option>
                {puntosDeControl.map(punto => (
                    <option key={punto.ID} value={punto.ID}>
                        {punto.Direccion}
                    </option>
                ))}
            </select>

            <button onClick={handleAsignar} disabled={!conductorID || !puntoDeControlID} className='boton-elegante'>
                Asignar Conductor
            </button>
        </div>
    );
};

export default AsignarConductor;
