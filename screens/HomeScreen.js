// HomeScreen.js

// Importa los módulos necesarios de React, React Native y otros paquetes
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para borrar todos los registros almacenados en AsyncStorage
const clearStorage = async () => {
  try {
    await AsyncStorage.clear(); // Limpia el almacenamiento asíncrono
    Alert.alert('Todos los registros han sido borrados'); // Muestra un mensaje de éxito
  } catch (e) {
    Alert.alert('Error al borrar los registros'); // Muestra un mensaje de error en caso de fallo
  }
};

// Componente principal de la pantalla de inicio
export default function HomeScreen({ navigation }) {
  // Obtiene la función de cierre de sesión del contexto de autenticación
  const { logout } = useContext(AuthContext);

  // Configura las opciones de navegación cuando el componente se monta
  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    await logout(); // Llama a la función de cierre de sesión
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Redirige a la pantalla de inicio de sesión
    });
  };

  // Renderiza la vista principal de la pantalla de inicio
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a la pantalla de inicio</Text>
      {/* Botón para navegar a la pantalla de registrar visita */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterVisit')}
      >
        <Text style={styles.buttonText}>Registrar Visita</Text>
      </TouchableOpacity>
      {/* Botón para navegar a la pantalla de ver todas las visitas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewAllVisits')}
      >
        <Text style={styles.buttonText}>Ver Visitas Registradas</Text>
      </TouchableOpacity>
      {/* Botón para navegar a las opciones de técnico */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TechMenu')}
      >
        <Text style={styles.buttonText}>Opciones de Técnico</Text>
      </TouchableOpacity>
      {/* Botón para navegar a la pantalla de noticias */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Noticias')}
      >
        <Text style={styles.buttonText}>Noticias minerd</Text>
      </TouchableOpacity>
      {/* Botón para navegar a la pantalla de información acerca de la aplicación */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>Acerca de</Text>
      </TouchableOpacity>
      {/* Botón para borrar todos los registros almacenados */}
      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={clearStorage}
      >
        <Text style={styles.buttonText}>Borrar Todos los Registros</Text>
      </TouchableOpacity>
      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  // Estilo del contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  // Estilo para el texto de bienvenida
  welcomeText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  // Estilo para los botones
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  // Estilo para el texto dentro de los botones
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilo para el botón de advertencia (borrar registros)
  dangerButton: {
    backgroundColor: '#FF4136',
  },
  // Estilo para el botón de cerrar sesión
  logoutButton: {
    backgroundColor: '#FF4136',
    marginTop: 20,
  },
});
