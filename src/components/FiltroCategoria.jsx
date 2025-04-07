// src/components/FiltroCategoria.jsx
import React from 'react';

const FiltroCategoria = ({ categorias = [], categoriaActual, onCategoriaChange }) => {
  const handleChange = (event) => {
    onCategoriaChange(event.target.value); // Llama a la función del padre con el nuevo valor
  };

  return (
    <div className="filtro-item"> {/* Añade una clase para estilo si quieres */}
      <label htmlFor="filtro-categoria">Categoría: </label>
      <select
        id="filtro-categoria"
        value={categoriaActual}
        onChange={handleChange}
      >
        {/* La opción "Todas" tendrá un valor vacío '' */}
        <option value="">Todas las Categorías</option>
        {categorias
          .filter(categoria => categoria !== '') // Evita renderizar la opción vacía si ya está en la lista
          .map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroCategoria;