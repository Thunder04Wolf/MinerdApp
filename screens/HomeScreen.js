import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert("Todos los registros han sido borrados");
  } catch (e) {
    Alert.alert("Error al borrar los registros");
  }
};

const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('userToken');
    Alert.alert("Has cerrado sesión correctamente");
    navigation.navigate('Login');
  } catch (e) {
    Alert.alert("Error al cerrar sesión");
    console.error(e);
  }
};

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title=""
          onPress={() => null}
          color="transparent"
          borderColor="transparent"
        />
      ),
      headerRight: () => (
        <Button
          title="Cerrar Sesión"
          onPress={() => handleLogout(navigation)}
          color="red"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a la pantalla de inicio</Text>
      <Button title="Registrar Visita" onPress={() => navigation.navigate('RegisterVisit')} />
      <Button title="Ver Visitas Registradas" onPress={() => navigation.navigate('ViewVisits')} />
      <Button title="Acerca de" onPress={() => navigation.navigate('About')} />
      <Button title="Borrar Todos los Registros" onPress={clearStorage} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
