import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

// ver todas las escuelas por region

export default function SearchSchoolsByRegion({ navigation }) {
  const [regionCode, setRegionCode] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSchoolsByRegion = async () => {
    if (!regionCode.trim()) {
      Alert.alert('Error', 'Por favor, ingrese un código de región válido.');
      return;
    }

    try {
      setLoading(true);
      const url = `https://adamix.net/minerd/minerd/centros.php?regional=${regionCode}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.exito && result.datos.length > 0) {
        setSchools(result.datos);
      } else {
        Alert.alert('Error', 'No se encontraron escuelas para esta región.');
        setSchools([]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderSchoolItem = ({ item }) => (
    <TouchableOpacity
      style={styles.schoolItem}
      onPress={() => navigation.navigate('SchoolDetails', { school: item })}
    >
      <Text style={styles.schoolName}>{item.nombre}</Text>
      <Text style={styles.schoolInfo}>Código: {item.codigo}</Text>
      <Text style={styles.schoolInfo}>Distrito: {item.distrito}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese el Código de la Región:</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de Región"
        value={regionCode}
        onChangeText={setRegionCode}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={searchSchoolsByRegion} color="#6200EE" />
      {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}

      <FlatList
        data={schools}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={renderSchoolItem}
        style={styles.schoolList}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay escuelas disponibles.</Text>}
      />
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
  schoolList: {
    marginTop: 16,
  },
  schoolItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  schoolInfo: {
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
