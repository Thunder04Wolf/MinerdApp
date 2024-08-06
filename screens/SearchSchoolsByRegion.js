import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

// Componente principal para buscar escuelas por código de región
export default function SearchSchoolsByRegion({ navigation }) {
  // Estado para almacenar el código de región ingresado por el usuario
  const [regionCode, setRegionCode] = useState('');
  // Estado para almacenar la lista de escuelas obtenidas de la API
  const [schools, setSchools] = useState([]);
  // Estado para controlar el estado de carga durante la búsqueda
  const [loading, setLoading] = useState(false);

  // Función asincrónica para buscar escuelas por código de región
  const searchSchoolsByRegion = async () => {
    // Validación: asegurarse de que el código de región no esté vacío
    if (!regionCode.trim()) {
      Alert.alert('Error', 'Por favor, ingrese un código de región válido.');
      return;
    }

    try {
      // Indicar que la búsqueda está en proceso
      setLoading(true);
      // URL para hacer la solicitud a la API, usando el código de región
      const url = `https://adamix.net/minerd/minerd/centros.php?regional=${regionCode}`;
      // Hacer la solicitud a la API
      const response = await fetch(url);
      // Convertir la respuesta a formato JSON
      const result = await response.json();

      // Verificar si la solicitud fue exitosa y si se encontraron datos
      if (result.exito && result.datos.length > 0) {
        setSchools(result.datos); // Actualizar el estado con la lista de escuelas
      } else {
        Alert.alert('Error', 'No se encontraron escuelas para esta región.');
        setSchools([]); // Limpiar la lista de escuelas si no se encuentran resultados
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error); // Imprimir el error en la consola para depuración
    } finally {
      setLoading(false); // Indicar que la búsqueda ha terminado
    }
  };

  // Renderiza cada elemento de la lista de escuelas
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
        keyboardType="numeric" // Solo permite la entrada de números
      />
      <Button title="Buscar" onPress={searchSchoolsByRegion} color="#6200EE" />
      {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loading} />}
      
      <FlatList
        data={schools}
        keyExtractor={(item) => item.codigo.toString()} // Clave única para cada ítem
        renderItem={renderSchoolItem} // Función para renderizar cada ítem
        style={styles.schoolList}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay escuelas disponibles.</Text>} // Mensaje cuando no hay resultados
      />
    </View>
  );
}

// Estilos para los diferentes componentes
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
