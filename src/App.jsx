// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';

// --- IMPORTACIONES ---
// Componentes UI
import Header from './components/Header';
import FiltroComuna from './components/FiltroComuna'; // Asumiendo que filtra por Comuna
//import FiltroBarrio from './components/FiltroBarrio'; // Asumiendo que filtra por Barrio
import FiltroEstado from './components/FiltroEstado';
import FiltroCategoria from './components/FiltroCategoria';
import MapaObras from './components/MapaObras';
import Summary from './components/Summary';
import RadarObras from './components/RadarObras';
import HistogramaEstados from './components/HistogramaEstados';
import TreeMapObras from './components/TreeMapObras';
import Paneles from './components/Paneles'; // Decidiremos si lo usamos o Summary lo reemplaza

// Datos
import insumosData from './data/insumos.json'; // Usamos el NUEVO JSON

// Estilos
import "leaflet/dist/leaflet.css";
import './styles.css'; // Tus estilos principales (o './styles.css' si ese era el nombre)

// --- COMPONENTE PRINCIPAL ---
const App = () => {
  // --- ESTADOS ---
  const [todasLasObras, setTodasLasObras] = useState([]);
  const [obrasFiltradas, setObrasFiltradas] = useState([]);

  // Estados para los filtros seleccionados (inicializamos como en tu ejemplo original si aplica)
  const [comunaSeleccionada, setComunaSeleccionada] = useState(''); // '' para "Todas"
  const [barrioSeleccionado, setBarrioSeleccionado] = useState('');   // '' para "Todos"
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(''); // '' para "Todos"
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // '' para "Todas"
  // Añade más si necesitas...

  // --- EFECTOS ---

  // 1. Carga inicial de datos
  useEffect(() => {
    try {
      const obrasCargadas = insumosData.features || [];
      if (!Array.isArray(obrasCargadas)) {
        console.error("Error: insumosData.features no es un array.", insumosData);
        setTodasLasObras([]);
        setObrasFiltradas([]);
        return;
      }
      console.log(`Datos cargados: ${obrasCargadas.length} obras iniciales.`);
      setTodasLasObras(obrasCargadas);
      // setObrasFiltradas(obrasCargadas); // El siguiente useEffect se encargará de esto
    } catch (error) {
      console.error("Error cargando o procesando Data:", error);
      setTodasLasObras([]);
      setObrasFiltradas([]);
    }
  }, []); // Array de dependencias vacío para que se ejecute solo una vez

  // 2. Filtrado dinámico cuando cambian los filtros o los datos base
  useEffect(() => {
    console.log("Aplicando filtros:", { comunaSeleccionada, barrioSeleccionado, estadoSeleccionado, categoriaSeleccionada });
    let resultadoFiltrado = todasLasObras;

    if (comunaSeleccionada) {
      resultadoFiltrado = resultadoFiltrado.filter(
        (obra) => obra.properties?.Comuna === comunaSeleccionada
      );
    }

    // Si hay una comuna seleccionada, filtramos los barrios DENTRO de esa comuna
    // Si no hay comuna, el filtro de barrio busca en todas las obras
    const baseParaBarrio = comunaSeleccionada ? resultadoFiltrado : todasLasObras;
     if (barrioSeleccionado) {
        // Verificamos si el barrio seleccionado existe en la base actual (todas o filtradas por comuna)
        const barrioValidoEnBase = baseParaBarrio.some(obra => obra.properties?.["Nombre Barrio"] === barrioSeleccionado);

        if (barrioValidoEnBase) {
             // Aplicamos el filtro sobre el resultado YA filtrado por comuna (si aplica)
            resultadoFiltrado = resultadoFiltrado.filter(
                (obra) => obra.properties?.["Nombre Barrio"] === barrioSeleccionado
            );
        } else if(comunaSeleccionada) {
             // Si estamos filtrando por comuna y el barrio no es válido para ESA comuna, lo reseteamos.
            console.warn(`Barrio "${barrioSeleccionado}" no es válido para la comuna "${comunaSeleccionada}". Reseteando filtro.`);
            setBarrioSeleccionado(''); // Dispara un re-render y re-ejecución de este useEffect
            // En esta pasada, no filtramos por barrio porque el seleccionado no era válido.
        }
        // Si no hay comuna seleccionada, no reseteamos, simplemente el filtro no encontrará coincidencias si el barrio no existe.
    }


    if (estadoSeleccionado) {
      resultadoFiltrado = resultadoFiltrado.filter(
        (obra) => obra.properties?.["Estado del Proyecto"] === estadoSeleccionado
      );
    }

    if (categoriaSeleccionada) {
      resultadoFiltrado = resultadoFiltrado.filter(
        (obra) => obra.properties?.Categoria === categoriaSeleccionada
      );
    }

    console.log(`Resultado del filtrado: ${resultadoFiltrado.length} obras.`);
    setObrasFiltradas(resultadoFiltrado);

  }, [
    comunaSeleccionada,
    barrioSeleccionado,
    estadoSeleccionado,
    categoriaSeleccionada,
    todasLasObras // Muy importante: re-filtrar si los datos base cambian
  ]);

  // --- CÁLCULO DE LISTAS ÚNICAS PARA SELECTS (igual que antes, con useMemo) ---
  const comunasUnicas = useMemo(() => {
    const comunas = new Set(todasLasObras.map(obra => obra.properties?.Comuna).filter(Boolean));
    return ['', ...Array.from(comunas).sort()];
  }, [todasLasObras]);

  // const barriosUnicos = useMemo(() => {
  //   const obrasDeComuna = comunaSeleccionada
  //     ? todasLasObras.filter(obra => obra.properties?.Comuna === comunaSeleccionada)
  //     : todasLasObras;
  //   const barrios = new Set(obrasDeComuna.map(obra => obra.properties?.["Nombre Barrio"]).filter(Boolean));
  //   const barriosOrdenados = Array.from(barrios).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
  //   return ['', ...barriosOrdenados];
  // }, [todasLasObras, comunaSeleccionada]);

  const estadosUnicos = useMemo(() => {
    const estados = new Set(todasLasObras.map(obra => obra.properties?.["Estado del Proyecto"]).filter(Boolean));
    return ['', ...Array.from(estados).sort()];
  }, [todasLasObras]);

  const categoriasUnicas = useMemo(() => {
    const categorias = new Set(todasLasObras.map(obra => obra.properties?.Categoria).filter(Boolean));
    return ['', ...Array.from(categorias).sort()];
  }, [todasLasObras]);

  // --- CÁLCULO DE DATOS DERIVADOS PARA GRÁFICOS Y SUMMARY (con useMemo) ---
  // Calculamos estos datos basados en 'obrasFiltradas'
  const datosDerivados = useMemo(() => {
    console.log(`Calculando datos derivados para ${obrasFiltradas.length} obras filtradas.`);
    // Valores por defecto si no hay obras filtradas
    if (!obrasFiltradas || obrasFiltradas.length === 0) {
      return {
        radarData: [],
        histogramaData: [],
        resumenData: { total: 0, estados: [], categorias: [] },
        panelData: { total: 0, ejecucion: 0, proyectado: 0, finalizadas: 0, suspendido: 0 }
      };
    }

    // Radar y TreeMap (por Categoría)
    const categoriasFiltradasUnicas = [...new Set(obrasFiltradas.map(o => o.properties?.Categoria).filter(Boolean))];
    const radarData = categoriasFiltradasUnicas.map(categoria => ({
      categoria,
      cantidad: obrasFiltradas.filter(o => o.properties?.Categoria === categoria).length,
      // fullMark: 100 // O el valor máximo que necesites para RadarChart
    }));

    // Histograma (por Estado)
    const estadosFiltradosUnicos = [...new Set(obrasFiltradas.map(o => o.properties?.["Estado del Proyecto"]).filter(Boolean))];
    const histogramaData = estadosFiltradosUnicos.map(estado => ({
      estado,
      cantidad: obrasFiltradas.filter(o => o.properties?.["Estado del Proyecto"] === estado).length,
    }));

    // Datos para Summary (similar a tu objeto 'resumen' original)
    const resumenData = {
      total: obrasFiltradas.length,
      estados: histogramaData, // Reutilizamos lo calculado
      categorias: radarData,  // Reutilizamos lo calculado
    };

    //Datos específicos para Paneles
      // El comentario anterior es un estandar para asegurar que no salga un error ya que la constante sí se usa
     const panelData = {
      total: obrasFiltradas.length,
      ejecucion: histogramaData.find(d => d.estado === 'En Ejecucion')?.cantidad || 0,
      proyectado: histogramaData.find(d => d.estado === 'Proyectado')?.cantidad || 0,
      suspendido: histogramaData.find(d => d.estado === 'Suspendido')?.cantidad || 0,
      ejecutado: histogramaData.find(d => d.estado === 'Ejecutado')?.cantidad || 0, // <--- ¡AÑADIDO!
    };
    console.log('panelData calculado:', JSON.stringify(panelData));

    // Asegúrate de retornar panelData
    return { radarData, histogramaData, resumenData, panelData };

  }, [obrasFiltradas]); // Se recalcula solo si cambian las obras filtradas

  // --- FUNCIONES CONTROLADORAS PARA LOS FILTROS ---
  // Se pasan como props a los componentes de filtro
  const handleComunaChange = (nuevaComuna) => {
    setComunaSeleccionada(nuevaComuna);
    setBarrioSeleccionado(''); // Resetea el barrio al cambiar la comuna
  };

  // const handleBarrioChange = (nuevoBarrio) => {
  //   setBarrioSeleccionado(nuevoBarrio);
  // };

  const handleEstadoChange = (nuevoEstado) => {
    setEstadoSeleccionado(nuevoEstado);
  };

  const handleCategoriaChange = (nuevaCategoria) => {
    setCategoriaSeleccionada(nuevaCategoria);
  };

  // --- RENDERIZADO ---
  // Mensaje de carga mientras los datos iniciales se procesan
   if (todasLasObras.length === 0 && !insumosData.features) { // Chequeo más robusto
     return <div>Error al cargar datos. Revisa la consola.</div>;
   }
   if (todasLasObras.length === 0 && insumosData.features) { // Si hay datos pero aún no están en el estado
       return <div>Cargando...</div>;
   }


  // Usamos la estructura de tu App anterior
  return (
    <div className="dashboard-container">
      <div className="header-container">
        <Header />
      </div>

      <div className="paneles-container"> {/* Usando la clase de tu componente original */}
         {/* Pasamos los datos calculados para los paneles */}
         {/* Usamos spread operator (...) para pasar cada propiedad de panelData como una prop individual */}
        <Paneles {...datosDerivados.panelData} />
      </div>

      { // Resumen de obras filtradas
       <div className="summary-container">
         <Summary data={datosDerivados.resumenData} />
       </div>
      }

      <div className="filtros-container">
        < FiltroComuna
          comunas={comunasUnicas}
          comunaActual={comunaSeleccionada}
          onComunaChange={handleComunaChange} // Prop corregida respecto a tu original
        />
        <FiltroEstado
          estados={estadosUnicos}
          estadoActual={estadoSeleccionado}
          onEstadoChange={handleEstadoChange}
        />
        <FiltroCategoria
          categorias={categoriasUnicas}
          categoriaActual={categoriaSeleccionada}
          onCategoriaChange={handleCategoriaChange}
        />
      </div>

      {/* Mapa - Recibe las obras ya filtradas */}
      <div className="map-container"> {/* Usando la clase de tu original */}
        <MapaObras obrasParaMostrar={obrasFiltradas} />
      </div>

      {/* Contenedor de Gráficos */}
      <div className="radar-container">
        <h3>Obras por Categoría (Radar)</h3>
        <RadarObras data={datosDerivados.radarData} />
      </div>
      <div className="treemap-container">
        <h3>Obras por Categoría (TreeMap)</h3>
        <TreeMapObras data={datosDerivados.radarData} />
      </div>
      <div className="histograma-container"> {/* Asegúrate que la clase sea esta */}
        <h3>Obras por Estado (Histograma)</h3>
        <HistogramaEstados data={datosDerivados.histogramaData} />
      </div>
    </div>
  );
};

export default App;