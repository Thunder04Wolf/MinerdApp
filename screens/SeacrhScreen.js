import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchSchool({ navigation }) {
  const [schoolCode, setSchoolCode] = useState('');
  const [schoolDetails, setSchoolDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchSchoolByCode = async () => {
    if (!schoolCode.trim()) {
      Alert.alert('Error', 'Por favor, ingrese un código de escuela válido.');
      return;
    }

    try {
      setLoading(true);
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        Alert.alert('Error', 'No se encontró un token de autenticación.');
        navigation.navigate('Login');
        return;
      }

      const url = `https://adamix.net/minerd/def/situacion.php?token=${storedToken}&situacion_id=${schoolCode}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.exito && result.datos) {
        setSchoolDetails(result.datos);
      } else {
        Alert.alert('Error', 'No se encontraron detalles para este código de escuela.');
        setSchoolDetails(null);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese el Código de la Escuela:</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de Escuela"
        value={schoolCode}
        onChangeText={setSchoolCode}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={searchSchoolByCode} color="#6200EE" />
      {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}

      {schoolDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detalles de la Escuela</Text>
          <Text style={styles.detailsText}>Motivo: {schoolDetails.motivo}</Text>
          <Text style={styles.detailsText}>Cédula del Director: {schoolDetails.cedula_director}</Text>
          <Text style={styles.detailsText}>Código del Centro: {schoolDetails.codigo_centro}</Text>
          <Text style={styles.detailsText}>Fecha: {schoolDetails.fecha}</Text>
          <Text style={styles.detailsText}>Hora: {schoolDetails.hora}</Text>
          <Text style={styles.detailsText}>Latitud: {schoolDetails.latitud}</Text>
          <Text style={styles.detailsText}>Longitud: {schoolDetails.longitud}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  loading: {
    marginTop: 16,
  },
  detailsContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
