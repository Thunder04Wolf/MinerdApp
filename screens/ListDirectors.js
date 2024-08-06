import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

// pantalla para ver el listado de directores

const API_URL = 'https://adamix.net/minerd/def/situacion.php?token=675c960f996d475d0af19b45a2da9757';

const fetchDirectorsCedulas = async (situacionId) => {
  try {
    const url = `${API_URL}&situacion_id=${situacionId}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.exito && result.datos) {
      return result.datos.cedula_director || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching director cedula:', error);
    return null;
  }
};

export default function ListDirectors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDirectors = async () => {
      try {
        const allCedulas = [];
        const numberOfRequests = 50;

        for (let id = 1; id <= numberOfRequests; id++) {
          const cedula = await fetchDirectorsCedulas(id);
          if (cedula && !allCedulas.includes(cedula)) {
            allCedulas.push(cedula);
          }
        }

        setDirectors(allCedulas);
      } catch (error) {
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDirectors();
  }, []);

  const renderDirectorItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <FlatList
          data={directors}
          keyExtractor={(item) => item}
          renderItem={renderDirectorItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay cédulas disponibles.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
