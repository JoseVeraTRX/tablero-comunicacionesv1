// import React from "react";
// import {
//   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip
// } from "recharts";

// const RadarObras = ({ data }) => {
//   return (
//     <RadarChart cx="50%" cy="50%" outerRadius="80%" width={400} height={300} data={data}>
//       <PolarGrid />
//       <PolarAngleAxis dataKey="categoria" />
//       <PolarRadiusAxis />
//       <Tooltip />
//       <Radar name="Categoría" dataKey="cantidad" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//     </RadarChart>
//   );
// };

// export default RadarObras;
// src/components/RadarObras.
// Nuevo script para RadarObras.jsx
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer, // Para hacerlo adaptable al contenedor
  Tooltip
} from "recharts";
import "../styles.css"; // Asumiendo que los estilos son globales o definidos en App.css
/**
 * RadarObras: Muestra un gráfico de radar con la cantidad de obras por categoría.
 * Asume que la prop 'data' es un array de objetos con 'categoria' y 'cantidad'.
 * Ejemplo: [{ categoria: 'Cicloparquederos', cantidad: 5 }, { categoria: 'Otros', cantidad: 12 }, ...]
 */
const RadarObras = ({ data = [] }) => { // Prop 'data' con valor por defecto

  // Manejo si no hay datos válidos o suficientes para un radar útil (necesitamos al menos 3 puntos)
  if (!data || !Array.isArray(data) || data.length < 3) {
    return (
      <div className="radar-container chart-placeholder"> {/* Clase para indicar vacío */}
        {/* Título ahora en App.jsx */}
        <p>No hay suficientes datos de categorías ({data?.length || 0}) para mostrar el gráfico radar.</p>
      </div>
    );
  }

  // Los datos ya vienen calculados de App.jsx. No se necesita más lógica aquí.
  // Renombramos 'categoria' a 'subject' como lo espera PolarAngleAxis por defecto internamente
  // y 'cantidad' a 'A' como espera Radar por defecto (o le indicamos dataKey='cantidad')
  // Hacemos un mapeo rápido para adaptarlo si es necesario, o podemos ajustar las props del gráfico
  const radarChartData = data.map(item => ({
      subject: item.categoria, // El texto que va en cada ángulo
      A: item.cantidad,      // El valor para ese ángulo (usado por dataKey="A")
      fullMark: Math.max(...data.map(d => d.cantidad), 1) * 1.1 // Calcula un máximo razonable para la escala
  }));


  return (
    // Usamos ResponsiveContainer para que se ajuste al tamaño del div padre
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart
        cx="50%" // Centrado horizontal
        cy="50%" // Centrado vertical
        outerRadius="80%" // Qué tan grande es el radar (respecto al contenedor)
        data={radarChartData} // Usamos los datos adaptados
      >
        {/* Rejilla polar (círculos y líneas radiales) */}
        <PolarGrid />

        {/* Eje de los ángulos (muestra las categorías/subjects) */}
        <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10 }} // Ajusta tamaño de fuente si es necesario
        />

        {/* Eje radial (la escala numérica) - podemos ocultarlo si no aporta mucho */}
        {/* <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} /> */}
        <PolarRadiusAxis tick={false} axisLine={false} /> {/* Ocultamos el eje radial */}


        {/* El componente Radar dibuja el área del gráfico */}
        <Radar
          name="Obras" // Nombre que aparece en el Tooltip
          dataKey="A"      // La clave que define el valor para cada ángulo
          stroke="#8884d8" // Color de la línea exterior
          //fill="#8884d8"   // Color del relleno
          fillOpacity={0.6} // Transparencia del relleno
          // isAnimationActive={false} // Desactivar animación si prefieres
        />

        {/* Tooltip estándar que muestra "Obras: valor" al pasar el mouse */}
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarObras;