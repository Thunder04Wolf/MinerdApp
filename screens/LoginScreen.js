import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');

  const handleLogin = async () => {
    if (!cedula || !clave) {
      Alert.alert('Error', 'Los campos cédula y clave son requeridos.');
      return;
    }

    try {
      const url = 'https://adamix.net/minerd/def/iniciar_sesion.php'; // Cambia esto a la URL correcta si es diferente.
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('clave', clave);

      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Home'); // Navegar a Home después del inicio de sesión
      } else {
        Alert.alert('Error', result.mensaje);
      }

      // Mostrar en la consola la respuesta completa de la API
      console.log(result);

    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={(text) => setCedula(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={(text) => setClave(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  registerContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: 'gray',
  },
  registerButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 4,
  },
});
