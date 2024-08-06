import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal, FlatList, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterVisitScreen({ navigation }) {
  const [cedulaDirector, setCedulaDirector] = useState('');
  const [codigoCentro, setCodigoCentro] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fotoEvidencia, setFotoEvidencia] = useState('');
  const [comentario, setComentario] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [token, setToken] = useState('');
  const [motivos, setMotivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingMotivos, setIsLoadingMotivos] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchTokenAndMotivos = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchAllMotivos(storedToken);
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

    fetchTokenAndMotivos();
  }, [navigation]);

  const fetchAllMotivos = async (authToken) => {
    try {
      const allMotivos = [];
      const urlBase = 'https://adamix.net/minerd/def/situacion.php?token=';

      for (let id = 1; id <= 35; id++) {
        const url = `${urlBase}${authToken}&situacion_id=${id}`;
        let response = await fetch(url);
        let result = await response.json();

        // Mostrar la respuesta completa de la API en consola
        console.log(`Respuesta para ID ${id}:`, result);

        if (result.exito && result.datos && result.datos.motivo) {
          allMotivos.push(result.datos.motivo);
        }
      }

      // Eliminar duplicados
      const uniqueMotivos = Array.from(new Set(allMotivos));
      console.log('Motivos únicos:', uniqueMotivos);

      // Mapear los motivos para incluir un id ficticio para la lista
      const motivoList = uniqueMotivos.map((motivo, index) => ({
        id: index.toString(),
        motivo,
      }));

      setMotivos(motivoList);
      setIsLoadingMotivos(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
      setIsLoadingMotivos(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || hora;
    setShowTimePicker(Platform.OS === 'ios');
    setHora(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleRegisterVisit = async () => {
    if (!cedulaDirector || !codigoCentro || !motivo || !comentario || !latitud || !longitud || !fecha || !hora || !token) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    const formattedDate = fecha.toISOString().split('T')[0];
    const formattedTime = hora.toTimeString().substring(0, 5);

    try {
      const url = 'https://adamix.net/minerd/minerd/registrar_visita.php';
      let formData = new FormData();
      formData.append('cedula_director', cedulaDirector);
      formData.append('codigo_centro', codigoCentro);
      formData.append('motivo', motivo);
      formData.append('foto_evidencia', fotoEvidencia);
      formData.append('comentario', comentario);
      formData.append('nota_voz', ''); // Aquí puedes añadir el URI del audio si es necesario
      formData.append('latitud', latitud);
      formData.append('longitud', longitud);
      formData.append('fecha', formattedDate);
      formData.append('hora', formattedTime);
      formData.append('token', token);

      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Visita registrada exitosamente');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.mensaje);
      }

      console.log(result);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  const renderMotivoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setMotivo(item.motivo);
        setModalVisible(false);
      }}
    >
      <Text>{item.motivo}</Text>
    </TouchableOpacity>
  );

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
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          if (!isLoadingMotivos) {
            setModalVisible(true);
          } else {
            Alert.alert('Cargando', 'Por favor, espere mientras se cargan los motivos.');
          }
        }}
      >
        <Text>{motivo || 'Selecciona el motivo'}</Text>
      </TouchableOpacity>
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
      <Button title="Seleccionar Fecha" onPress={showDatepicker} />
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Seleccionar Hora" onPress={showTimepicker} />
      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Text>Fecha: {fecha.toISOString().split('T')[0]}</Text>
      <Text>Hora: {hora.toTimeString().substring(0, 5)}</Text>
      <Button title="Registrar Visita" onPress={handleRegisterVisit} />

      {/* Modal para seleccionar motivo */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isLoadingMotivos ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={motivos}
                renderItem={renderMotivoItem}
                keyExtractor={(item) => item.id}
              />
            )}
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});
