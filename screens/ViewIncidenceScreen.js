import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewIncidentsScreen({ navigation }) {
  // Estado para almacenar los incidentes
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Función para obtener los incidentes almacenados
    const fetchIncidents = async () => {
      try {
        // Obtiene los incidentes almacenados en AsyncStorage
        const storedIncidents = await AsyncStorage.getItem('incidents');
        if (storedIncidents) {
          // Actualiza el estado con los incidentes obtenidos
          setIncidents(JSON.parse(storedIncidents));
        }
      } catch (error) {
        console.error('Error al obtener incidentes:', error);
      }
    };

    fetchIncidents();
  }, []); // El array vacío asegura que esta función se ejecute solo una vez al montar el componente

  // Función para renderizar cada incidencia en la lista
  const renderIncidence = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IncidenceDetail', { incidence: item })}
      style={styles.incidence}
    >
      <Text>Código del Centro: {item.centerCode}</Text>
      <Text>Fecha: {item.date}</Text>
      <Text>Hora: {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={incidents} // Los datos que se mostrarán en la lista
        renderItem={renderIncidence} // Función que renderiza cada ítem
        keyExtractor={(item, index) => index.toString()} // Genera una clave única para cada ítem
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  incidence: {
    padding: 16,
    borderBottomWidth: 1, // Agrega una línea en la parte inferior de cada ítem
  },
});
