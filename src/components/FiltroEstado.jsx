// src/components/FiltroEstado.jsx
import React from 'react';

const FiltroEstado = ({ estados = [], estadoActual, onEstadoChange }) => {
  const handleChange = (event) => {
    onEstadoChange(event.target.value); // Llama a la función del padre con el nuevo valor
  };

  return (
    <div className="filtro-item"> {/* Añade una clase para estilo si quieres */}
      <label htmlFor="filtro-estado">Estado del Proyecto: </label>
      <select
        id="filtro-estado"
        value={estadoActual}
        onChange={handleChange}
      >
        {/* La opción "Todos" tendrá un valor vacío '' */}
        <option value="">Todos los Estados</option>
        {estados
          .filter(estado => estado !== '') // Evita renderizar la opción vacía si ya está en la lista
          .map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroEstado;