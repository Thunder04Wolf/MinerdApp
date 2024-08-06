// VisitDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function VisitDetailScreen({ route }) {
  // Obtiene los detalles de la visita desde los parámetros de la ruta
  const { visit } = route.params;
  // Estado para almacenar los datos del clima y el estado de carga
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para obtener los datos del clima utilizando la API de OpenWeatherMap
  const fetchWeather = async () => {
    try {
      // Marca el inicio del proceso de carga
      setLoading(true);
      const { latitud, longitud } = visit;

      // Solicita los datos del clima a la API de OpenWeatherMap
      const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat: latitud, // Latitud de la ubicación de la visita
          lon: longitud, // Longitud de la ubicación de la visita
          appid: '13a8cab8dcd4f04646c20a3c5f17f0bc', // Clave API para autenticación
          units: 'metric', // Unidades en Celsius, usar 'imperial' para Fahrenheit
        },
      });

      // Extrae el primer resultado del pronóstico
      const weatherData = response.data.list[0];
      setWeather(weatherData); // Actualiza el estado con los datos del clima
      setLoading(false); // Marca el fin del proceso de carga
    } catch (error) {
      setLoading(false); // Marca el fin del proceso de carga en caso de error
      Alert.alert('Error', 'No se pudieron obtener los datos del clima.'); // Muestra un mensaje de error
      console.error(error); // Registra el error en la consola
    }
  };

  return (
    <View style={styles.container}>
      {/* Muestra los detalles de la visita */}
      <Text style={styles.title}>Motivo: {visit.motivo}</Text>
      <Text style={styles.detailText}>Código del Centro: {visit.codigo_centro}</Text>
      <Text style={styles.detailText}>Cédula del Director: {visit.cedula_director}</Text>
      <Text style={styles.detailText}>Fecha: {visit.fecha}</Text>
      <Text style={styles.detailText}>Hora: {visit.hora}</Text>
      <Text style={styles.detailText}>Latitud: {visit.latitud}</Text>
      <Text style={styles.detailText}>Longitud: {visit.longitud}</Text>
      <Text style={styles.detailText}>Detalle: {visit.detalle}</Text>

      {/* Botón para obtener los datos del clima */}
      <Button title="Obtener Datos del Clima" onPress={fetchWeather} disabled={loading} />

      {/* Muestra los datos del clima si están disponibles */}
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

// Estilos para la pantalla
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
