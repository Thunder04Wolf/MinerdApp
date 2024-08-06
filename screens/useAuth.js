import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Hook personalizado para la autenticación
export const useAuth = (navigation, onAuthSuccess) => {
  // Estado para almacenar el token de autenticación
  const [token, setToken] = useState('');

  // Hook useEffect que se ejecuta al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener el token almacenado
    const fetchToken = async () => {
      try {
        // Intentamos obtener el token desde el almacenamiento asíncrono
        const storedToken = await AsyncStorage.getItem('userToken');
        
        if (storedToken) {
          // Si hay un token, lo guardamos en el estado y llamamos a la función de éxito de autenticación
          setToken(storedToken);
          onAuthSuccess(storedToken);
        } else {
          // Si no hay token, mostramos un mensaje de error y navegamos a la pantalla de inicio de sesión
          Alert.alert('Error', 'No se encontró un token de autenticación.');
          navigation.navigate('Login');
        }
      } catch (e) {
        // En caso de error al obtener el token, mostramos un mensaje de error y navegamos a la pantalla de inicio de sesión
        console.error(e);
        Alert.alert('Error', 'Hubo un problema al obtener el token.');
        navigation.navigate('Login');
      }
    };

    // Llamamos a la función para obtener el token
    fetchToken();
  }, [navigation, onAuthSuccess]);

  // Devolvemos el token, que puede ser utilizado por el componente que use este hook
  return token;
};
