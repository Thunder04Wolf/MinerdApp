import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

//pantalla para ver las incidencias

export default function IncidenceDetailScreen({ route }) {
  const { incidence } = route.params;
  const [sound, setSound] = useState();
  const soundRef = useRef(null);

  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      if (incidence.audioUri) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri: incidence.audioUri }
        );
        soundRef.current = loadedSound;
      }
    };
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [incidence.audioUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Incidencia</Text>
      <Text>Cédula del Director: {incidence.directorId}</Text>
      <Text>Código del Centro: {incidence.centerCode}</Text>
      <Text>Fecha: {incidence.date}</Text>
      <Text>Hora: {incidence.time}</Text>
      <Text>Comentario: {incidence.comment}</Text>
      {incidence.photoUri && <Image source={{ uri: incidence.photoUri }} style={styles.image} />}
      {incidence.audioUri && (
        <View>
          <Text>Audio:</Text>
          <Button title="Reproducir Audio" onPress={playSound} />
          <Button title="Detener Audio" onPress={stopSound} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
