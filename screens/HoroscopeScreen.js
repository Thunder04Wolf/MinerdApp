// HoroscopeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getZodiacSign } from './ZodiacSign'; // Asegúrate de tener esta función en el archivo ZodiacSign.js

export default function HoroscopeScreen() {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        setLoading(true);
        const fechaNacimiento = await AsyncStorage.getItem('fechaNacimiento');
        
        if (fechaNacimiento) {
          const birthDate = new Date(fechaNacimiento);
          const sign = getZodiacSign(birthDate);
          
          if (sign) {
            const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily`, {
              params: {
                sign: sign,
                day: 'TODAY'
              }
            });

            setHoroscope(response.data.data.horoscope_data);
          } else {
            Alert.alert('Error', 'No se pudo determinar el signo zodiacal.');
          }
        } else {
          Alert.alert('Error', 'No se encontró la fecha de nacimiento.');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'No se pudo obtener el horóscopo.');
        console.error(error);
      }
    };

    fetchHoroscope();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horóscopo del Día</Text>
      {loading ? <Text>Cargando...</Text> : <Text>{horoscope}</Text>}
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
});
