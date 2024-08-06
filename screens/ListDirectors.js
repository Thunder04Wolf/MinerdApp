// Importa los módulos necesarios de React y React Native
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

// URL de la API para obtener la información de los directores
const API_URL = 'https://adamix.net/minerd/def/situacion.php?token=675c960f996d475d0af19b45a2da9757';

// Función asíncrona para obtener las cédulas de los directores basadas en el ID de situación
const fetchDirectorsCedulas = async (situacionId) => {
  try {
    // Construye la URL con el ID de situación
    const url = `${API_URL}&situacion_id=${situacionId}`;
    const response = await fetch(url); // Realiza la solicitud HTTP
    const result = await response.json(); // Convierte la respuesta a JSON

    // Verifica si la solicitud fue exitosa y si hay datos disponibles
    if (result.exito && result.datos) {
      return result.datos.cedula_director || null; // Retorna la cédula del director si está disponible
    } else {
      return null; // Retorna null si no hay datos
    }
  } catch (error) {
    console.error('Error fetching director cedula:', error); // Muestra el error en la consola
    return null; // Retorna null en caso de error
  }
};

// Componente principal que muestra una lista de directores
export default function ListDirectors() {
  const [directors, setDirectors] = useState([]); // Estado para almacenar las cédulas de los directores
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  // Hook useEffect para realizar la carga de datos al montar el componente
  useEffect(() => {
    const fetchAllDirectors = async () => {
      try {
        const allCedulas = []; // Array para almacenar todas las cédulas
        const numberOfRequests = 50; // Número de solicitudes a realizar

        // Realiza solicitudes para obtener las cédulas de los directores
        for (let id = 1; id <= numberOfRequests; id++) {
          const cedula = await fetchDirectorsCedulas(id);
          if (cedula && !allCedulas.includes(cedula)) {
            allCedulas.push(cedula); // Agrega la cédula si no está ya en el array
          }
        }

        setDirectors(allCedulas); // Actualiza el estado con las cédulas obtenidas
      } catch (error) {
        Alert.alert('Error', 'No se pudo conectar con el servidor.'); // Muestra una alerta en caso de error
        console.error(error); // Muestra el error en la consola
      } finally {
        setLoading(false); // Indica que la carga ha finalizado
      }
    };

    fetchAllDirectors(); // Llama a la función para obtener los datos
  }, []); // Dependencias vacías para ejecutar el efecto solo una vez al montar el componente

  // Función para renderizar cada ítem de la lista
  const renderDirectorItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );

  // Renderiza la vista de la lista de directores
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" /> // Muestra un indicador de carga mientras se obtienen los datos
      ) : (
        <FlatList
          data={directors} // Datos a mostrar en la lista
          keyExtractor={(item) => item} // Extrae una clave única para cada ítem
          renderItem={renderDirectorItem} // Función para renderizar cada ítem
          ListEmptyComponent={<Text style={styles.emptyText}>No hay cédulas disponibles.</Text>} // Mensaje cuando no hay datos
        />
      )}
    </View>
  );
}

// Estilos para la pantalla de la lista de directores
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Fondo blanco para el contenedor
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Línea divisoria entre ítems
  },
  text: {
    fontSize: 16,
    color: '#333', // Color del texto
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555', // Color del texto cuando no hay datos
  },
});
