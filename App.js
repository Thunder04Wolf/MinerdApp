import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterIncidenceScreen from './screens/RegisterIncidenceScreen';
import ViewIncidenceScreen from './screens/ViewIncidenceScreen';
import IncidenceDetailScreen from './screens/IncidenceDetailScreen';
import AboutScreen from './screens/AboutScreen'; 
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: null,
          gestureEnabled: false,
        }} />
        <Stack.Screen name="Registerincidents" component={RegisterIncidenceScreen} />
        <Stack.Screen name="Viewincidents" component={ViewIncidenceScreen} />
        <Stack.Screen name="incidentsDetail" component={IncidenceDetailScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
