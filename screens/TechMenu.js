import React from 'react';
import { View, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para manejar el cierre de sesión
const handleLogout = async (navigation) => {
  try {
    // Eliminamos el token de usuario del almacenamiento asíncrono
    await AsyncStorage.removeItem('userToken');
    Alert.alert("Has cerrado sesión correctamente"); // Mensaje de éxito
    navigation.navigate('Home'); // Navegamos a la pantalla de inicio
  } catch (e) {
    Alert.alert("Error al cerrar sesión"); // Mensaje de error en caso de fallo
    console.error(e); // Imprimimos el error en la consola para depuración
  }
};

// Componente principal de menú técnico
export default function TechMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a la pantalla de técnico</Text>
      
      {/* Botón para registrar una incidencia */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterVisit')}
      >
        <Text style={styles.buttonText}>Registrar Incidencia</Text>
      </TouchableOpacity>

      {/* Botón para ver visitas registradas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewOurVisits')}
      >
        <Text style={styles.buttonText}>Ver Visitas Registradas</Text>
      </TouchableOpacity>

      {/* Botón para ver todas las visitas registradas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewAllVisits')}
      >
        <Text style={styles.buttonText}>Ver Todas las Visitas Registradas</Text>
      </TouchableOpacity>

      {/* Botón para búsqueda de escuela por código */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchSchoolsByRegion')}
      >
        <Text style={styles.buttonText}>Busqueda de escuela por su código</Text>
      </TouchableOpacity>

      {/* Botón para listar cédulas de directores */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListDirectors')}
      >
        <Text style={styles.buttonText}>Lista de Cédulas de Directores</Text>
      </TouchableOpacity>

      {/* Botón para abrir la pantalla del mapa */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapScreen')}
      >
        <Text style={styles.buttonText}>MapScreen</Text>
      </TouchableOpacity>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={() => handleLogout(navigation)}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para los diferentes componentes
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
