import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
  const navigationRef = useRef(null); // Referencia para la navegación

  // Efecto para comprobar el estado de autenticación al montar el componente
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Obtener el token almacenado
        setIsAuthenticated(!!token); // Si hay un token, el usuario está autenticado
      } catch (error) {
        console.error('Error checking authentication status', error); // Manejo de errores
      }
    };
    checkAuthStatus(); // Llamar a la función para verificar el estado de autenticación
  }, []);

  // Función para manejar el inicio de sesión
  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token); // Almacenar el token en AsyncStorage
      setIsAuthenticated(true); // Actualizar el estado de autenticación
      if (navigationRef.current) {
        navigationRef.current.reset({ // Restablecer la navegación
          index: 0,
          routes: [{ name: 'Home' }], // Redirigir a la pantalla principal después de iniciar sesión
        });
      }
    } catch (error) {
      console.error('Error logging in', error); // Manejo de errores
    }
  };

  // Función para manejar el cierre de sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Eliminar el token de AsyncStorage
      setIsAuthenticated(false); // Actualizar el estado de autenticación
      if (navigationRef.current) {
        navigationRef.current.reset({ // Restablecer la navegación
          index: 0,
          routes: [{ name: 'Login' }], // Redirigir a la pantalla de inicio de sesión después de cerrar sesión
        });
      }
    } catch (error) {
      console.error('Error logging out', error); // Manejo de errores
    }
  };

  // Proporcionar el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, navigationRef }}>
      {children}
    </AuthContext.Provider>
  );
};
