import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ver todas las visitas

export default function ViewAllVisits({ navigation }) {
  const [visitTypes, setVisitTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTokenAndVisitTypes = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchAllVisitTypes(storedToken);
        } else {
          Alert.alert('Error', 'No se encontró un token de autenticación.');
          navigation.navigate('Login');
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Hubo un problema al obtener el token.');
        navigation.navigate('Login');
      }
    };

    fetchTokenAndVisitTypes();
  }, [navigation]);

  const fetchAllVisitTypes = async (authToken) => {
    try {
      const allVisitTypes = [];
      const urlBase = 'https://adamix.net/minerd/def/situacion.php?token=';

      for (let id = 1; id <= 35; id++) {
        const url = `${urlBase}${authToken}&situacion_id=${id}`;
        let response = await fetch(url);
        let result = await response.json();

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

      setVisitTypes(allVisitTypes);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando tipos de visitas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visitTypes}
        renderItem={renderVisitTypeItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay tipos de visitas registrados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
});
