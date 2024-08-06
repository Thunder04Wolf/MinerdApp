import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VisitDetails({ route }) {
  const { visit } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{visit.motivo}</Text>
      <Text style={styles.detailText}>Código del Centro: {visit.codigo_centro}</Text>
      <Text style={styles.detailText}>Cédula del Director: {visit.cedula_director}</Text>
      <Text style={styles.detailText}>Fecha: {visit.fecha}</Text>
      <Text style={styles.detailText}>Hora: {visit.hora}</Text>
      <Text style={styles.detailText}>Latitud: {visit.latitud}</Text>
      <Text style={styles.detailText}>Longitud: {visit.longitud}</Text>
      <Text style={styles.detailText}>Detalle: {visit.detalle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
});
