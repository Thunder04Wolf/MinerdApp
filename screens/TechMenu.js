import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function TechMenu({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
    //   headerLeft: () => (
    //     <Button
    //       title=""
    //       onPress={() => null}
    //       color="transparent"
    //       borderColor="transparent"
    //     />
    //   ),
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
      <Button title="Registrar Incidencia" onPress={() => navigation.navigate('RegisterVisit')} />
      <Button title="Ver Incidencias Registradas" onPress={() => navigation.navigate('ViewVisits')} />
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
