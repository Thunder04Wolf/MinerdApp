import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from './useAuth'; // Importa el hook de autenticación personalizado

export default function ViewAllVisits({ navigation }) {
  // Estado para almacenar los tipos de visitas
  const [visitTypes, setVisitTypes] = useState([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // Función para obtener todos los tipos de visitas
  const fetchAllVisitTypes = async (authToken) => {
    try {
      // Array para almacenar los tipos de visitas
      const allVisitTypes = [];
      const urlBase = 'https://adamix.net/minerd/def/situacion.php?token=';

      // Itera desde el ID 1 hasta 35 para construir las URLs de solicitud
      for (let id = 1; id <= 35; id++) {
        const url = `${urlBase}${authToken}&situacion_id=${id}`;
        let response = await fetch(url);
        let result = await response.json();

        // Verifica si la respuesta es exitosa y si hay datos
        if (result.exito && result.datos) {
          allVisitTypes.push({
            id: id.toString(),
            motivo: result.datos.motivo,
            detalle: result.datos.detalle,
            cedula_director: result.datos.cedula_director,
            codigo_centro: result.datos.codigo_centro,
            fecha: result.datos.fecha,
            hora: result.datos.hora,
            latitud: result.datos.latitud,
            longitud: result.datos.longitud,
          });
        }
      }

      // Actualiza el estado con los tipos de visitas obtenidos
      setVisitTypes(allVisitTypes);
    } catch (error) {
      // Muestra un mensaje de error si la solicitud falla
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    } finally {
      // Deja de mostrar el indicador de carga
      setLoading(false);
    }
  };

  // Usa el hook de autenticación para obtener el token y cargar los datos
  useAuth(navigation, fetchAllVisitTypes);

  // Renderiza un elemento de la lista de tipos de visitas
  const renderVisitTypeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('VisitDetailsScreen', { visit: item })}
    >
      <Text style={styles.itemTitle}>{item.motivo}</Text>
      <Text style={styles.itemSubtitle}>Centro: {item.codigo_centro}</Text>
      <Text style={styles.itemSubtitle}>Fecha: {item.fecha} - Hora: {item.hora}</Text>
      <Text style={styles.itemSubtitle}>Latitud: {item.latitud}, Longitud: {item.longitud}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        // Muestra un indicador de carga mientras los datos se están cargando
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Cargando tipos de visitas...</Text>
        </View>
      ) : (
        // Muestra la lista de tipos de visitas si no está cargando
        <FlatList
          data={visitTypes}
          renderItem={renderVisitTypeItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay tipos de visitas registrados.</Text>}
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
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#555',
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
