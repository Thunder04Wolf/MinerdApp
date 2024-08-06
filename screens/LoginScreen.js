// LoginScreen.js

// Importa los módulos necesarios de React, React Native y AsyncStorage
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

// Componente principal para la pantalla de inicio de sesión
export default function LoginScreen({ route }) {
  // Estado para almacenar los valores de cédula y clave
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  // Contexto de autenticación para manejar el inicio de sesión
  const { login } = useContext(AuthContext);

  // Hook useEffect para inicializar el campo de cédula si se pasa como parámetro en la ruta
  useEffect(() => {
    if (route.params?.cedula) {
      setCedula(route.params.cedula);
    }
  }, [route.params?.cedula]);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    // Verifica si los campos de cédula y clave no están vacíos
    if (!cedula || !clave) {
      Alert.alert('Error', 'Los campos cédula y clave son requeridos.');
      return;
    }

    try {
      // URL del API para el inicio de sesión
      const url = 'https://adamix.net/minerd/def/iniciar_sesion.php';
      // Crea un objeto FormData para enviar los datos del formulario
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('clave', clave);

      // Realiza la solicitud POST para iniciar sesión
      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      // Convierte la respuesta a JSON
      let result = await response.json();

      // Verifica si el inicio de sesión fue exitoso
      if (result.exito) {
        const { token } = result.datos;

        // Guarda el token del usuario en AsyncStorage
        await AsyncStorage.setItem('userToken', token);

        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        login(token); // Llama a la función de inicio de sesión del contexto para navegar
      } else {
        Alert.alert('Error', result.mensaje);
      }

      console.log(result); // Muestra el resultado en la consola
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.'); // Muestra una alerta en caso de error
      console.error(error); // Muestra el error en la consola
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        {/* Campo para ingresar la cédula */}
        <TextInput
          placeholder="Cédula"
          value={cedula}
          onChangeText={(text) => setCedula(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        {/* Campo para ingresar la clave */}
        <TextInput
          placeholder="Clave"
          value={clave}
          onChangeText={(text) => setClave(text)}
          secureTextEntry
          style={styles.input}
        />
        {/* Botón para iniciar sesión */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {/* Contenedor para registro de nuevos usuarios */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerButton}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Estilos para la pantalla de inicio de sesión
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Color de fondo para el contenedor
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Color del título
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerButton: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 4,
  },
});
