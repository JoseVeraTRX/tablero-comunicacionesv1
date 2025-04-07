// src/components/FiltroComuna.jsx
import React from 'react';

// Recibe las props desde App.jsx
const FiltroComuna = ({ comunas = [], comunaActual, onComunaChange }) => {

  // Función que se ejecuta cada vez que el usuario cambia la opción del select
  const handleChange = (event) => {
    const nuevoValor = event.target.value;
    // Llama a la función que nos pasaron como prop (handleComunaChange en App.jsx)
    // para actualizar el estado en el componente padre (App.jsx)
    onComunaChange(nuevoValor);
  };

  return (
    <div className="filtro-item"> {/* Clase opcional para darle estilo */}
      <label htmlFor="filtro-comuna">Comuna: </label>
      <select
        id="filtro-comuna"
        value={comunaActual} // El valor seleccionado está controlado por el estado de App.jsx
        onChange={handleChange} // Llama a nuestra función cuando cambia la selección
        className="filtro-select" // Clase opcional para estilos
      >
        {/* Opción por defecto para mostrar todas las comunas */}
        <option value="">Todas las Comunas</option>

        {/*
          Mapeamos el array de comunas únicas.
          Filtramos primero para asegurarnos de no renderizar una opción vacía
          si 'comunas' ya la incluye por error (aunque en App.jsx la añadimos al inicio).
        */}
        {comunas
            .filter(comuna => comuna !== '') // Nos aseguramos de no duplicar la opción "vacía"
            .map((comuna) => (
              // Usamos la comuna como key (asumiendo que son únicas) y como valor
              <option key={comuna} value={comuna}>
                {comuna} {/* El texto visible para el usuario */}
              </option>
         ))}
      </select>
    </div>
  );
};

// ¡Importante! Exportar por defecto para que `import FiltroComuna from ...` funcione
export default FiltroComuna;