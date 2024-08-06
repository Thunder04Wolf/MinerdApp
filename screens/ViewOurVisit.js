import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewOurVisits({ navigation }) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTokenAndVisits = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchVisits(storedToken);
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

    fetchTokenAndVisits();
  }, [navigation]);

  const fetchVisits = async (authToken) => {
    try {
      const response = await fetch(`https://adamix.net/minerd/def/situaciones.php?token=${authToken}`);
      const result = await response.json();

      if (result.exito) {
        setVisits(result.datos);
      } else {
        Alert.alert('Error', 'No se pudieron cargar las visitas.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando visitas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visits}
        renderItem={renderVisitItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay visitas registradas.</Text>}
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
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
