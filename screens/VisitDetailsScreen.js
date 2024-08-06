// VisitDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function VisitDetailScreen({ route }) {
  const { visit } = route.params;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const { latitud, longitud } = visit;

      const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat: latitud,
          lon: longitud,
          appid: '13a8cab8dcd4f04646c20a3c5f17f0bc', // Tu clave API
          units: 'metric', // Opcional: usar 'imperial' para Fahrenheit
        },
      });

      // Extraer el primer resultado de la lista
      const weatherData = response.data.list[0];
      setWeather(weatherData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'No se pudieron obtener los datos del clima.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivo: {visit.motivo}</Text>
      <Text style={styles.detailText}>Código del Centro: {visit.codigo_centro}</Text>
      <Text style={styles.detailText}>Cédula del Director: {visit.cedula_director}</Text>
      <Text style={styles.detailText}>Fecha: {visit.fecha}</Text>
      <Text style={styles.detailText}>Hora: {visit.hora}</Text>
      <Text style={styles.detailText}>Latitud: {visit.latitud}</Text>
      <Text style={styles.detailText}>Longitud: {visit.longitud}</Text>
      <Text style={styles.detailText}>Detalle: {visit.detalle}</Text>

      <Button title="Obtener Datos del Clima" onPress={fetchWeather} disabled={loading} />

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.detailText}>Temperatura: {weather.main.temp}°C</Text>
          <Text style={styles.detailText}>Descripción: {weather.weather[0].description}</Text>
          <Text style={styles.detailText}>Velocidad del Viento: {weather.wind.speed} m/s</Text>
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
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
  weatherContainer: {
    marginTop: 20,
  },
});
