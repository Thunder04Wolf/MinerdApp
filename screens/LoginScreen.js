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

export default function LoginScreen({ route }) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useContext(AuthContext);

  // Get cedula parameter from route params
  useEffect(() => {
    if (route.params?.cedula) {
      setCedula(route.params.cedula);
    }
  }, [route.params?.cedula]);

  const handleLogin = async () => {
    if (!cedula || !clave) {
      Alert.alert('Error', 'Los campos cédula y clave son requeridos.');
      return;
    }

    try {
      const url = 'https://adamix.net/minerd/def/iniciar_sesion.php';
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('clave', clave);

      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      let result = await response.json();

      if (result.exito) {
        const { token } = result.datos;

        await AsyncStorage.setItem('userToken', token);

        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        login(token); // Use AuthContext to navigate
      } else {
        Alert.alert('Error', result.mensaje);
      }

      console.log(result);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <TextInput
          placeholder="Cédula"
          value={cedula}
          onChangeText={(text) => setCedula(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Clave"
          value={clave}
          onChangeText={(text) => setClave(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
