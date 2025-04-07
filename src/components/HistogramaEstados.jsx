// src/components/HistogramaEstados.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";
import "../styles.css"; // Asumiendo que los estilos son globales o definidos en App.css
/**
 * HistogramaEstados: Muestra un gráfico de barras con la cantidad de obras por estado.
 * Asume que la prop 'data' es un array de objetos con 'estado' y 'cantidad'.
 * Ejemplo: [{ estado: 'En Ejecucion', cantidad: 15 }, { estado: 'Proyectado', cantidad: 25 }, ...]
 */
const HistogramaEstados = ({ data = [] }) => { // Prop 'data' con valor por defecto

  // Manejo si no hay datos válidos
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="histograma-container chart-placeholder"> {/* Clase para indicar vacío */}
        {/* Título ahora en App.jsx */}
        <p>No hay datos de estados para mostrar.</p>
      </div>
    );
  }

  // La lógica de colores (getBarColor) se elimina. El color de las barras se definirá vía CSS en App.css.

  return (
    // Contenedor responsivo
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data} // Usamos directamente la data recibida de App.jsx
        margin={{
          top: 20, // Más espacio arriba para LabelList
          right: 30,
          left: 0, // Ajusta si necesitas más espacio para etiquetas YAxis
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} /> {/* Quitamos líneas verticales */}
        {/* Eje X muestra los nombres de los estados */}
        <XAxis
          dataKey="estado"
          tick={{ fontSize: 10 }} // Tamaño de fuente más pequeño si hay muchos estados
          interval={0} // Mostrar todas las etiquetas (si caben)
          // angle={-30} // Rotar etiquetas si son muy largas
          // textAnchor="end" // Alinear texto si se rotan
         />
        {/* Eje Y muestra las cantidades */}
        <YAxis allowDecimals={false} /> {/* No mostrar decimales en el eje Y */}

        {/* Tooltip estándar que muestra "estado: cantidad" al pasar el mouse */}
        <Tooltip />

        {/*
          Definimos UNA SOLA barra. Recharts mapeará la 'data' a esta barra.
          Cada segmento de la barra (para cada estado) se dibujará automáticamente.
          El 'fill' se asignará vía CSS a la clase .recharts-bar-rectangle .bar-color-{estado} o similar
          o con un color base para todas las barras.
        */}
        <Bar
            dataKey="cantidad" // La clave que define la altura de la barra
            // fill="#8884d8" // Color base si no usamos CSS específico
            barSize={40} // Ancho de las barras (ajusta según necesites)
            className="custom-bar" // Clase base para estilos CSS
            isAnimationActive={false}
        >
            {/* Muestra el valor numérico encima de cada barra */}
            <LabelList dataKey="cantidad" position="top" style={{ fill: '#666', fontSize: 11 }}/>
        </Bar>

         {/*
            NOTA SOBRE COLORES CON CSS:
            Recharts añade clases a los elementos <rect> dentro de la barra.
            Puedes usar algo como:
            .custom-bar .recharts-bar-rectangle:nth-child(1) { fill: #color1; }
            .custom-bar .recharts-bar-rectangle:nth-child(2) { fill: #color2; }
            O idealmente, si puedes agregar una clase basada en el 'estado' al componente Bar
            (requeriría mapear o usar una función en 'cell', lo cual complica un poco),
            podrías hacer .bar-en-ejecucion { fill: #colorEjecucion; }
            Por ahora, un color base para .custom-bar .recharts-bar-rectangle es lo más simple.
         */}

      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramaEstados;