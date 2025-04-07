// import React from "react";
// import {
//   Treemap,
//   Tooltip,
//   ResponsiveContainer,
//   //LabelList se importa pero no se usa, innesaria linea 
// } from "recharts";
// import "../styles.css";

// // 🎨 Diccionario de colores por categoría
// const coloresPorCategoria = {
//   "Cicloparquederos": "#8dd1e1",
//   "Presupuesto Participativo": "#82ca9d",
//   "Vías Urbanas": "#ffc658",
//   "Espacios Públicos y Recreación": "#a4de6c",
//   "Andenes y Pasarelas": "#d0ed57",
//   "Otros": "#d28fd0"
// };

// // 👉 Añadir propiedad "fill" según categoría
// const colorearDatos = (data) =>
//   data.map((item) => ({
//     ...item,
//     fill: coloresPorCategoria[item.categoria] || "#ccc",
//     name: `${item.categoria} (${item.cantidad})` // nombre que se muestra en tooltip y bloque
//   }));

// // const CustomTooltip = ({ active, payload }) => {
// //   if (active && payload?.length) {
// //     const { payload: p } = payload[0];
// //     return (
// //       <div className="custom-tooltip">
// //         <strong>{p.categoria}</strong>
// //         <br />
// //         Obras: {p.cantidad}
// //       </div>
// //     );
// //   }
// //   return null;
// // };

// const TreeMapObras = ({ data }) => {
//   const dataConColor = colorearDatos(data);

//   return (
//     <div className="treemap-container">
//       <h3>Obras por Categoría (Visual Treemap)</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <Treemap
//           data={dataConColor}
//           dataKey="cantidad"
//           stroke="#fff"
//           isAnimationActive
//           aspectRatio={4 / 3}
//           content={({ depth, x, y, width, height, name, fill }) => (
//             depth === 1 ? (
//               <g>
//                 <rect
//                   x={x}
//                   y={y}
//                   width={width}
//                   height={height}
//                   style={{
//                     fill,
//                     stroke: "#fff",
//                     strokeWidth: 2
//                   }}
//                 />
//                 <text
//                   x={x + 5}
//                   y={y + 20}
//                   fill="#fff"
//                   fontSize={12}
//                   fontWeight="bold"
//                 >
//                   {name}
//                 </text>
//               </g>
//             ) : null
//           )}
//         >
//           <Tooltip content={<CustomTooltip />} />
//         </Treemap>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TreeMapObras;
// src/components/TreeMapObras.jsx
import React from "react";
import {
  Treemap,
  Tooltip,
  ResponsiveContainer
} from "recharts";
//import "../styles.css"; // Asumiendo que los estilos son globales o definidos en App.css
import "../App.css"; // Asegúrate de que los estilos de App.css estén disponibles aquí
/**
 * Componente para renderizar un nodo individual dentro del Treemap.
 * Se pasa como prop 'content' al componente Treemap de Recharts.
 */
const RenderTreeMapNode = ({ depth, x, y, width, height, payload, name }) => {
  // Solo renderizamos los bloques principales (profundidad 1)
  if (depth === 1) {
    // Construimos la etiqueta directamente desde el payload (datos originales del item)
    // Asume que 'payload' tiene las propiedades 'categoria' y 'cantidad'
    const label = payload?.categoria ? `${payload.categoria} (${payload.cantidad || 0})` : name;

    // Condición para mostrar texto solo si el rectángulo es suficientemente grande
    const showLabel = width > 60 && height > 25; // Ajusta estos valores según necesites

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          className={`treemap-node treemap-node-${depth}`} // Clase base + profundidad
          // El 'fill' ahora se controlará idealmente por CSS usando selectores
          // como .treemap-node y quizás clases específicas por categoría si las añades
          // o un color base definido en el CSS.
          style={{
            stroke: '#fff', // Borde blanco entre bloques
            strokeWidth: 1,
            //fill: '#8884d8' // Color de relleno base si no se usa CSS específico
            
          }}
        />
        {showLabel && (
          <text
            x={x + width / 2} // Centrar horizontalmente
            y={y + height / 2} // Centrar verticalmente
            dy="0.35em" // Ajuste fino vertical
            textAnchor="middle" // Alinear al centro
            className="treemap-label" // Clase para estilizar el texto vía CSS
            //fill="#fff" // Color de texto predeterminado (puede sobrescribirse en CSS)
            fontSize={11}
          >
            {label}
          </text>
        )}
      </g>
    );
  }
  // No renderizar nodos en otras profundidades (si los hubiera)
  return null;
};

/**
 * Componente TreeMapObras: Muestra un Treemap basado en los datos recibidos.
 * Asume que la prop 'data' es un array de objetos con 'categoria' y 'cantidad'.
 */
const TreeMapObras = ({ data = [] }) => { // Prop 'data' con valor por defecto

  // Manejo por si no hay datos o son inválidos
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="treemap-container chart-placeholder"> {/* Clase para indicar vacío */}
        {/* El título ahora está fuera, en App.jsx */}
        <p>No hay datos de categorías para mostrar.</p>
      </div>
    );
  }

  // Los datos ya vienen calculados de App.jsx (ej: [{ categoria: 'A', cantidad: 10 }, ...])
  // No necesitamos la función colorearDatos ni el diccionario de colores aquí.

  return (
    // Contenedor responsivo para ajustar tamaño
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={data} // Usamos directamente la data recibida
        dataKey="cantidad" // La clave numérica que define el tamaño del área
        nameKey="categoria" // La clave que identifica el nombre (usado por Tooltip por defecto)
        stroke="#fff"
        // fill="#8884d8" // Un color base si no se definen en CSS
        isAnimationActive={false} // Desactivar animación para mejor rendimiento inicial
        aspectRatio={4 / 3} // Mantiene la proporción
        content={<RenderTreeMapNode />} // Usamos nuestro componente custom para renderizar cada bloque
      >
        {/* Tooltip estándar de Recharts.
            Mostrará 'categoria: cantidad' por defecto gracias a nameKey y dataKey.
            Puedes personalizarlo más con la prop 'formatter' si es necesario.
        */}
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreeMapObras;