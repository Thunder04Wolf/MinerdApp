import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// detalles de las escuelas

export default function SchoolDetails({ route }) {
  // Desestructuramos los parámetros de la ruta para obtener la información de la escuela
  const { school } = route.params;

  // Mostramos todos los datos en el console log para ver qué estamos recibiendo
  console.log(school);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{school.nombre}</Text>

      <Text style={styles.label}>Código:</Text>
      <Text style={styles.value}>{school.codigo}</Text>

      <Text style={styles.label}>Distrito:</Text>
      <Text style={styles.value}>{school.distrito}</Text>

      {/* Otros datos disponibles, pero no visibles por defecto */}
      <Text style={styles.label}>Coordenadas:</Text>
      <Text style={styles.value}>{school.coordenadas}</Text>

      <Text style={styles.label}>Regional:</Text>
      <Text style={styles.value}>{school.regional}</Text>

      <Text style={styles.label}>D.D. Municipal:</Text>
      <Text style={styles.value}>{school.d_dmunicipal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 10,
  },
});
