import React from 'react';
import { View, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('userToken');
    Alert.alert("Has cerrado sesión correctamente");
    navigation.navigate('Home');
  } catch (e) {
    Alert.alert("Error al cerrar sesión");
    console.error(e);
  }
};

export default function TechMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a la pantalla de técnico</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterVisit')}
      >
        <Text style={styles.buttonText}>Registrar Incidencia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewOurVisits')}
      >
        <Text style={styles.buttonText}>Ver Visitas Registradas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewAllVisits')}
      >
        <Text style={styles.buttonText}>Ver Todas las Visitas Registradas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchSchoolsByRegion')}
      >
        <Text style={styles.buttonText}>Busqueda de escuela por su código</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListDirectors')}
      >
        <Text style={styles.buttonText}>Lista de Cédulas de Directores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapScreen')}
      >
        <Text style={styles.buttonText}>MapScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={() => handleLogout(navigation)}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#FF4136",
  },
});
