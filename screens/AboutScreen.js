// screens/AboutScreen.js

// Importa los módulos necesarios de React y React Native
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define un array de datos con información de personas
const data = [
  { name: 'Isaac Alexander Polonio Lorenzo', matricula: '2022-1934' },
  { name: 'Pedro Antonio García Encarnación', matricula: '2022-2033' },
  { name: 'Eleazar David Moreta Almonte', matricula: '2022-1925' },
  { name: 'Alexis José Ramírez Taveras', matricula: '2022-1995' },
  { name: 'Brahiam Isai Montero Santillán', matricula: '2022-2034' },
  { name: 'Mario Alfredo Baez Segura', matricula: '2022-1997' },
];

// Función que define la pantalla "AboutScreen"
export default function AboutScreen() {
  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Muestra el nombre de la persona */}
      <Text style={styles.name}>{item.name}</Text>
      {/* Muestra la matrícula de la persona */}
      <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
      {/* Muestra una frase inspiradora */}
      <Text style={styles.phrase}>
        "La vigilancia efectiva es el arte de proteger lo que valoramos, asegurando el bienestar de todos a través de la observación y el compromiso."
      </Text>
    </View>
  );

  // Renderiza la vista principal de la pantalla
  return (
    <View style={styles.container}>
      <FlatList
        // Proporciona los datos a mostrar en la lista
        data={data}
        // Especifica cómo renderizar cada elemento
        renderItem={renderItem}
        // Define una clave única para cada elemento de la lista
        keyExtractor={(item) => item.matricula}
        // Aplica estilos al contenedor de la lista
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  // Estilo del contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Estilo para el contenedor de la lista
  list: {
    padding: 16,
  },
  // Estilo para cada tarjeta de la lista
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
  // Estilo para el nombre de la persona
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // Estilo para la matrícula
  matricula: {
    fontSize: 16,
    marginBottom: 8,
  },
  // Estilo para la frase inspiradora
  phrase: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});
