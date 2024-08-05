import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import VisitaScreen from './screens/VisitaScreen';
import EscuelaScreen from './screens/EscuelaScreen';
import DirectorScreen from './screens/DirectorScreen';
import NoticiasScreen from './screens/NoticiasScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Visita" component={VisitaScreen} />
        <Stack.Screen name="Escuela" component={EscuelaScreen} />
        <Stack.Screen name="Director" component={DirectorScreen} />
        <Stack.Screen name='Noticias' component={NoticiasScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
