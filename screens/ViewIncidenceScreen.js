import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ver todas las incidencias

export default function ViewIncidentsScreen({ navigation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const storedIncidents = await AsyncStorage.getItem('incidents');
      if (storedIncidents) {
        setIncidents(JSON.parse(storedIncidents));
      }
    };

    fetchIncidents();
  }, []);

  const renderIncidence = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IncidenceDetail', { incidence: item })}
      style={styles.incidence}
    >
      <Text>Código del Centro: {item.centerCode}</Text>
      <Text>Fecha: {item.date}</Text>
      <Text>Hora: {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={incidents}
        renderItem={renderIncidence}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  incidence: {
    padding: 16,
    borderBottomWidth: 1,
  },
});
