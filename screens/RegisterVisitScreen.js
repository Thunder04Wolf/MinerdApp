import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterVisitScreen({ navigation }) {
  const [cedulaDirector, setCedulaDirector] = useState('');
  const [codigoCentro, setCodigoCentro] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fotoEvidencia, setFotoEvidencia] = useState(''); // Este campo puede ser un URI a una imagen subida.
  const [comentario, setComentario] = useState('');
  const [notaVoz, setNotaVoz] = useState(''); // Similar al fotoEvidencia, un URI a un archivo de audio.
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Obtener el token de AsyncStorage o cualquier otra fuente de almacenamiento seguro
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Error', 'No se encontró un token de autenticación.');
          navigation.navigate('Login');
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Hubo un problema al obtener el token.');
        navigation.navigate('Login');
      }
    };

    fetchToken();
  }, [navigation]);

  const handleRegisterVisit = async () => {
    if (!cedulaDirector || !codigoCentro || !motivo || !comentario || !latitud || !longitud || !fecha || !hora || !token) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    try {
      const url = 'https://adamix.net/minerd/minerd/registrar_visita.php';
      let formData = new FormData();
      formData.append('cedula_director', cedulaDirector);
      formData.append('codigo_centro', codigoCentro);
      formData.append('motivo', motivo);
      formData.append('foto_evidencia', fotoEvidencia); // Deberías subir un archivo en lugar de un texto vacío.
      formData.append('comentario', comentario);
      formData.append('nota_voz', notaVoz); // Similar a foto_evidencia
      formData.append('latitud', latitud);
      formData.append('longitud', longitud);
      formData.append('fecha', fecha);
      formData.append('hora', hora);
      formData.append('token', token);

      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Visita registrada exitosamente');
        navigation.navigate('Home'); // Redirigir a la pantalla de inicio o cualquier otra pantalla
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
        placeholder="Cédula del Director"
        value={cedulaDirector}
        onChangeText={setCedulaDirector}
        style={styles.input}
      />
      <TextInput
        placeholder="Código del Centro"
        value={codigoCentro}
        onChangeText={setCodigoCentro}
        style={styles.input}
      />
      <TextInput
        placeholder="Motivo"
        value={motivo}
        onChangeText={setMotivo}
        style={styles.input}
      />
      <TextInput
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />
      <TextInput
        placeholder="Latitud"
        value={latitud}
        onChangeText={setLatitud}
        style={styles.input}
      />
      <TextInput
        placeholder="Longitud"
        value={longitud}
        onChangeText={setLongitud}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
      />
      <TextInput
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
      />
      <Button title="Registrar Visita" onPress={handleRegisterVisit} />
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
