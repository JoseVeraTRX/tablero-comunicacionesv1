// import React from "react";
// import "../styles.css";

// const Paneles = () => {
//   return (
//     <div className="paneles-container">
//       <div className="panel-card">
//         <h4>Obras Totales</h4>
//         <p>10</p>
//       </div>
//       <div className="panel-card">
//         <h4>En Ejecución</h4>
//         <p>5</p>
//       </div>
//       <div className="panel-card">
//         <h4>Proyectadas</h4>
//         <p>3</p>
//       </div>
//       <div className="panel-card">
//         <h4>Finalizadas</h4>
//         <p>2</p>
//       </div>
//     </div>
//   );
// };

// export default Paneles;
// src/components/Paneles.jsx
import React from "react";

/**
 * Paneles: Muestra tarjetas de resumen con cifras clave.
 * Recibe props individuales calculadas en App.jsx según los estados
 * presentes en insumos.json (incluyendo 'Ejecutado').
 */
const Paneles = ({
  total = 0,
  ejecucion = 0,
  proyectado = 0,
  suspendido = 0,
  ejecutado = 0, // <--- Prop añadida
}) => {
  return (
    <div className="paneles-container">
      {/* Panel Total */}
      <div className="panel-card panel-total">
        <h4>Obras Totales💯</h4>
        <p className="panel-value">{total}</p>
      </div>

      {/* Panel En Ejecución */}
      <div className="panel-card panel-ejecucion">
        <h4>En Ejecución🚧</h4>
        <p className="panel-value">{ejecucion}</p>
      </div>

      {/* Panel Proyectado */}
      <div className="panel-card panel-proyectado">
        <h4>Proyectadas🕖</h4>
        <p className="panel-value">{proyectado}</p>
      </div>

      {/* Panel Ejecutado */}
      {/* Mostrar solo si hay obras ejecutadas */}
      {ejecutado > 0 && ( // <--- Nuevo Panel Añadido
        <div className="panel-card panel-ejecutado"> {/* Clase específica */}
          <h4>Ejecutadas✅</h4>
          <p className="panel-value">{ejecutado}</p>
        </div>
      )}

      {/* Panel Suspendido */}
      {/* Mostrar solo si hay obras suspendidas */}
      {suspendido > 0 && (
        <div className="panel-card panel-suspendido">
          <h4>Suspendidas🔐</h4>
          <p className="panel-value">{suspendido}</p>
        </div>
      )}

    </div>
  );
};

export default Paneles;