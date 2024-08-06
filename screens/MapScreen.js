// MapScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

// URL del API para obtener las visitas
const API_URL = 'https://adamix.net/minerd/def/situaciones.php?token=675c960f996d475d0af19b45a2da9757';

// Componente principal para la pantalla del mapa
const MapScreen = ({ navigation }) => {
  // Estado para almacenar las visitas y el estado de carga
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook useEffect para obtener las visitas cuando el componente se monta
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        // Realiza la solicitud GET para obtener las visitas
        const response = await fetch(API_URL);
        const result = await response.json();

        // Verifica si la respuesta fue exitosa y contiene datos
        if (result.exito && result.datos) {
          setVisits(result.datos);
        } else {
          Alert.alert('Error', 'No se encontraron visitas.');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
        console.error(error); // Muestra el error en la consola
      } finally {
        setLoading(false); // Actualiza el estado de carga
      }
    };

    fetchVisits(); // Llama a la función para obtener las visitas
  }, []);

  // Función para manejar el evento de presionar el callout del marcador
  const handleCalloutPress = (visit) => {
    // Navega a la pantalla de detalles de la visita
    navigation.navigate('VisitDetailsScreen', { visit });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        // Muestra un indicador de carga mientras se obtienen las visitas
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: visits.length > 0 ? parseFloat(visits[0].latitud) : 0,
            longitude: visits.length > 0 ? parseFloat(visits[0].longitud) : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Mapea las visitas y crea un marcador para cada una */}
          {visits.map((visit) => (
            <Marker
              key={visit.id}
              coordinate={{
                latitude: parseFloat(visit.latitud),
                longitude: parseFloat(visit.longitud),
              }}
            >
              <Callout onPress={() => handleCalloutPress(visit)}>
                <View>
                  <Text>{`Motivo: ${visit.motivo}`}</Text>
                  <Text>{`Fecha: ${visit.fecha}`}</Text>
                  <Text>{`Hora: ${visit.hora}`}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

// Estilos para la pantalla del mapa
const styles = StyleSheet.create({
  container: {
    flex: 1, // El contenedor ocupa todo el espacio disponible
  },
  map: {
    ...StyleSheet.absoluteFillObject, // El mapa ocupa todo el contenedor
  },
});

export default MapScreen;
