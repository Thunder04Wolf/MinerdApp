import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterIncidenceScreen from "./screens/RegisterIncidenceScreen";
import ViewIncidenceScreen from "./screens/ViewIncidenceScreen";
import IncidenceDetailScreen from "./screens/IncidenceDetailScreen";
import AboutScreen from "./screens/AboutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import TechMenu from "./screens/TechMenu";
import RegisterVisit from "./screens/RegisterVisitScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerBackVisible: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerBackVisible: true }}
          name="TechMenu"
          component={TechMenu}
        />
        <Stack.Screen
          name="RegisterIncidents"
          component={RegisterIncidenceScreen}
        />
        <Stack.Screen name="ViewIncidents" component={ViewIncidenceScreen} />
        <Stack.Screen
          name="incidentsDetail"
          component={IncidenceDetailScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterVisit" component={RegisterVisit} />

        <Stack.Screen name="Login" component={LoginScreen} 
          options={{ headerBackVisible: false }}
          />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
