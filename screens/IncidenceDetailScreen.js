// IncidenceDetailScreen.js

// Importa los módulos necesarios de React, React Native y Expo
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

// Componente principal que muestra los detalles de una incidencia
export default function IncidenceDetailScreen({ route }) {
  // Obtiene los parámetros de la ruta, en este caso la incidencia
  const { incidence } = route.params;
  // Estado para gestionar el sonido
  const [sound, setSound] = useState();
  // Referencia para el sonido
  const soundRef = useRef(null);

  // Función para reproducir el sonido
  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync(); // Reproduce el sonido
    }
  };

  // Función para detener el sonido
  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync(); // Detiene el sonido
    }
  };

  // Hook useEffect para cargar y descargar el sonido
  useEffect(() => {
    // Función para cargar el sonido
    const loadSound = async () => {
      if (incidence.audioUri) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri: incidence.audioUri } // Crea un objeto de sonido a partir de la URI
        );
        soundRef.current = loadedSound; // Guarda la referencia del sonido
      }
    };
    loadSound();
    // Cleanup: descarga el sonido cuando el componente se desmonte
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync(); // Descarga el sonido
      }
    };
  }, [incidence.audioUri]); // Dependencia para ejecutar el efecto si cambia la URI del audio

  // Renderiza la vista de detalles de la incidencia
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Incidencia</Text>
      {/* Muestra los detalles de la incidencia */}
      <Text>Cédula del Director: {incidence.directorId}</Text>
      <Text>Código del Centro: {incidence.centerCode}</Text>
      <Text>Fecha: {incidence.date}</Text>
      <Text>Hora: {incidence.time}</Text>
      <Text>Comentario: {incidence.comment}</Text>
      {/* Muestra la imagen si existe */}
      {incidence.photoUri && <Image source={{ uri: incidence.photoUri }} style={styles.image} />}
      {/* Muestra los controles de audio si existe la URI del audio */}
      {incidence.audioUri && (
        <View>
          <Text>Audio:</Text>
          <Button title="Reproducir Audio" onPress={playSound} /> {/* Botón para reproducir el audio */}
          <Button title="Detener Audio" onPress={stopSound} /> {/* Botón para detener el audio */}
        </View>
      )}
    </View>
  );
}

// Estilos para la pantalla de detalles
const styles = StyleSheet.create({
  // Estilo del contenedor principal
  container: {
    flex: 1,
    padding: 16,
  },
  // Estilo para el título
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Estilo para la imagen
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
