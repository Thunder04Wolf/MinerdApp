// screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

//presentacion e info de cada integrante del grupo

const data = [
  { name: 'Isaac Alexander Polonio Lorenzo', matricula: '2022-1934' },
  { name: 'Pedro Antonio García Encarnación', matricula: '2022-2033' },
  { name: 'Eleazar David Moreta Almonte', matricula: '2022-1925' },
  { name: 'Alexis José Ramírez Taveras', matricula: '2022-1995' },
  { name: 'Brahiam Isai Montero Santillán', matricula: '2022-2034' },
  { name: 'Mario Alfredo Baez Segura', matricula: '2022-1997' },
];

export default function AboutScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
      <Text style={styles.phrase}>
        "La vigilancia efectiva es el arte de proteger lo que valoramos, asegurando el bienestar de todos a través de la observación y el compromiso."
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.matricula}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  matricula: {
    fontSize: 16,
    marginBottom: 8,
  },
  phrase: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});