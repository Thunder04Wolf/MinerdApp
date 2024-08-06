import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const useAuth = (navigation, onAuthSuccess) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          onAuthSuccess(storedToken);
        } else {
          Alert.alert('Error', 'No se encontró un token de autenticación.');
          navigation.navigate('Login');
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Hubo un problema al obtener el token.');
        navigation.navigate('Login');
      }
    };

    fetchToken();
  }, [navigation, onAuthSuccess]);

  return token;
};
