import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleRegister = async () => {
    if (!cedula || !nombre || !apellido || !clave || !correo || !telefono || !fechaNacimiento) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    } else {
      await saveUser();
    }
  }

  const saveUser = async () => {
    const url = "https://adamix.net/minerd/def/registro.php";
    
    try {
      let formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('clave', clave);
      formData.append('correo', correo);
      formData.append('telefono', telefono);
      formData.append('fecha_nacimiento', fechaNacimiento);

      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Registro exitoso');
      } else {
        Alert.alert('Error', result.mensaje);
      }
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
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={(text) => setClave(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={(text) => setCorreo(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
        value={fechaNacimiento}
        onChangeText={(text) => setFechaNacimiento(text)}
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
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
});
