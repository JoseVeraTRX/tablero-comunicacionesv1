// import React from "react";
// import "../styles.css";

// const Summary = ({ data }) => {
//   return (
//     <div className="summary-container">
//       <h3>Resumen General</h3>

//       <p><strong>Total de obras:</strong> {data.total}</p>

//       <h4>Por Estado:</h4>
//       <ul>
//         {data.estados.map((e, i) => (
//           <li key={i}>
//             {e.estado}: {e.cantidad}
//           </li>
//         ))}
//       </ul>

//       <h4>Por Categoría:</h4>
//       <ul>
//         {data.categorias.map((c, i) => (
//           <li key={i}>
//             {c.categoria}: {c.cantidad}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Summary;
// src/components/Summary.jsx
import React from "react";
import "../styles.css"; // Asumiendo que los estilos son globales o definidos en App.css

/**
 * Summary: Muestra un resumen textual del total de obras y su distribución
 * por estado y categoría.
 * La prop 'data' debe tener la forma:
 * {
 *   total: number,
 *   estados: [{ estado: string, cantidad: number }, ...],
 *   categorias: [{ categoria: string, cantidad: number }, ...]
 * }
 */
const Summary = ({ data }) => {

  // Verificación inicial de la data para evitar errores si no está definida
  // o no tiene la estructura esperada.
  const totalObras = data?.total ?? 0; // Usamos ?? (Nullish coalescing) para mostrar 0 si es null o undefined
  const estados = Array.isArray(data?.estados) ? data.estados : []; // Asegura que sea un array
  const categorias = Array.isArray(data?.categorias) ? data.categorias : []; // Asegura que sea un array

  return (
    // Usamos la clase que ya tenías
    <div className="summary-container card"> {/* Añadí 'card' como ejemplo para estilo */}

      {/* Título principal del resumen */}
      <h3>Resumen General📌</h3>

      {/* Mostramos el total general */}
      <p className="summary-total">
        <strong>Total de obras filtradas:</strong> {totalObras}
      </p>

      {/* Sección por Estado */}
      <div className="summary-section">
        <h4>Por Estado:</h4>
        {/* Si no hay estados, muestra un mensaje */}
        {estados.length === 0 ? (
            <p className="summary-empty">No hay datos de estados.</p>
        ) : (
            <ul className="summary-list">
              {/* Usamos 'estado' como key si es único, sino el índice */}
              {estados.map((e, i) => (
                <li key={e.estado || i}>
                  <span className="summary-label">{e.estado || 'Desconocido'}:</span>
                  <span className="summary-value">{e.cantidad ?? 0}</span>
                </li>
              ))}
            </ul>
        )}
      </div>

      {/* Sección por Categoría */}
      <div className="summary-section">
        <h4>Por Categoría:</h4>
        {/* Si no hay categorías, muestra un mensaje */}
        {categorias.length === 0 ? (
            <p className="summary-empty">No hay datos de categorías.</p>
        ) : (
          <ul className="summary-list">
            {/* Usamos 'categoria' como key si es única, sino el índice */}
            {categorias.map((c, i) => (
              <li key={c.categoria || i}>
                <span className="summary-label">{c.categoria || 'Desconocida'}:</span>
                <span className="summary-value">{c.cantidad ?? 0}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Summary;