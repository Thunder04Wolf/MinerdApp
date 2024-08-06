import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterVisitScreen({ navigation }) {
  // Estados para manejar los datos de la visita
  const [cedulaDirector, setCedulaDirector] = useState("");
  const [codigoCentro, setCodigoCentro] = useState("");
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [fotoUri, setFotoUri] = useState("");
  const [audioUri, setAudioUri] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [token, setToken] = useState("");
  const [motivos, setMotivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingMotivos, setIsLoadingMotivos] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Efecto para obtener el token y los motivos al cargar el componente
  useEffect(() => {
    const fetchTokenAndMotivos = async () => {
      try {
        // Obtener el token almacenado
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }

        // Obtener los motivos desde la API
        const response = await fetch("https://adamix.net/minerd/def/motivos.php");
        const data = await response.json();
        if (data.motivos) {
          setMotivos(data.motivos);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingMotivos(false);
      }
    };

    fetchTokenAndMotivos();
  }, []);

  // Maneja el cambio de fecha en el DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === "ios"); // Mostrar el picker solo en iOS
    setFecha(currentDate);
  };

  // Maneja el cambio de hora en el DateTimePicker
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || hora;
    setShowTimePicker(Platform.OS === "ios"); // Mostrar el picker solo en iOS
    setHora(currentTime);
  };

  // Maneja el registro de la visita
  const handleRegister = async () => {
    // Verificar que todos los campos requeridos estén llenos
    if (!cedulaDirector || !codigoCentro || !motivo || !comentario) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    const url = "https://adamix.net/minerd/def/visitas.php";
    const fechaString = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;
    const horaString = `${('0' + hora.getHours()).slice(-2)}:${('0' + hora.getMinutes()).slice(-2)}`;

    try {
      let formData = new FormData();
      formData.append("cedula_director", cedulaDirector);
      formData.append("codigo_centro", codigoCentro);
      formData.append("motivo", motivo);
      formData.append("comentario", comentario);
      formData.append("fecha", fechaString);
      formData.append("hora", horaString);
      formData.append("latitud", latitud);
      formData.append("longitud", longitud);

      // Agregar foto si está disponible
      if (fotoUri) {
        formData.append("foto", {
          uri: fotoUri,
          type: "image/jpeg",
          name: "foto.jpg",
        });
      }

      // Agregar audio si está disponible
      if (audioUri) {
        formData.append("audio", {
          uri: audioUri,
          type: "audio/mpeg",
          name: "audio.mp3",
        });
      }

      // Enviar los datos al servidor
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let result = await response.json();
      // Manejar la respuesta del servidor
      if (result.exito) {
        Alert.alert("Éxito", "Visita registrada exitosamente");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", result.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Visita</Text>
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
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.input}>
        <Text style={styles.selectText}>{motivo || "Seleccionar Motivo"}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{`${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>{`${('0' + hora.getHours()).slice(-2)}:${('0' + hora.getMinutes()).slice(-2)}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegister} color="#007BFF" />
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {isLoadingMotivos ? (
            <ActivityIndicator size="large" color="#007BFF" />
          ) : (
            <FlatList
              data={motivos}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setMotivo(item.descripcion);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.descripcion}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Estilos para la pantalla de registro de visita
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  selectText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 50,
    textAlign: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 50,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalItem: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 12,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
