// HomeScreen.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert('Todos los registros han sido borrados');
  } catch (e) {
    Alert.alert('Error al borrar los registros');
  }
};

export default function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a la pantalla de inicio</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterVisit')}
      >
        <Text style={styles.buttonText}>Registrar Visita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewAllVisits')}
      >
        <Text style={styles.buttonText}>Ver Visitas Registradas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TechMenu')}
      >
        <Text style={styles.buttonText}>Opciones de Técnico</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Noticias')}
      >
        <Text style={styles.buttonText}>Noticias minerd</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>Acerca de</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={clearStorage}
      >
        <Text style={styles.buttonText}>Borrar Todos los Registros</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#FF4136',
  },
  logoutButton: {
    backgroundColor: '#FF4136',
    marginTop: 20,
  },
});
