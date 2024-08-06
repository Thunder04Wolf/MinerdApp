import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from './useAuth';

export default function ViewOurVisits({ navigation }) {
  // Estado para almacenar la lista de visitas y el estado de carga
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las visitas desde el servidor
  const fetchVisits = async (authToken) => {
    try {
      // Solicitud para obtener las visitas usando el token de autenticación
      const response = await fetch(`https://adamix.net/minerd/def/situaciones.php?token=${authToken}`);
      const result = await response.json();

      // Verifica si la respuesta fue exitosa y actualiza el estado con los datos de visitas
      if (result.exito) {
        setVisits(result.datos);
      } else {
        Alert.alert('Error', 'No se pudieron cargar las visitas.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    } finally {
      // Termina el estado de carga independientemente del resultado
      setLoading(false);
    }
  };

  // Usa el hook de autenticación y pasa la función de obtención de visitas
  useAuth(navigation, fetchVisits);

  // Función para renderizar cada ítem de visita
  const renderVisitItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => Alert.alert('Detalle de la visita', 
        `Cédula Director: ${item.cedula_director}\n` +
        `Código Centro: ${item.codigo_centro}\n` +
        `Motivo: ${item.motivo}\n` +
        `Latitud: ${item.latitud}\n` +
        `Longitud: ${item.longitud}\n` +
        `Fecha: ${item.fecha}\n` +
        `Hora: ${item.hora}`
      )}
    >
      <Text style={styles.itemTitle}>Fecha: {item.fecha}</Text>
      <Text style={styles.itemSubtitle}>Motivo: {item.motivo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        // Muestra un indicador de carga mientras se obtienen los datos
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Cargando visitas...</Text>
        </View>
      ) : (
        // Muestra la lista de visitas o un mensaje si no hay visitas
        <FlatList
          data={visits}
          renderItem={renderVisitItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay visitas registradas.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Sombra para el efecto de profundidad
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
