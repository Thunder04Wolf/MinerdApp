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
import NoticiasScreen from "./screens/NoticiasScreen";
import ViewOurVisit from "./screens/ViewOurVisit";
import ViewAllVisit from "./screens/ViewAllVisit";
import VisitDetailsScreen from "./screens/VisitDetailsScreen";
import SearchSchoolsByRegion from "./screens/SearchSchoolsByRegion";
import SchoolDetails from "./screens/SchoolDetails";
import ListDirectors from "./screens/ListDirectors";
import MapScreen from "./screens/MapScreen";




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
        <Stack.Screen name="Noticias" component={NoticiasScreen} />

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
        <Stack.Screen name="ViewOurVisits" component={ViewOurVisit} />
        <Stack.Screen name="ViewAllVisits" component={ViewAllVisit} />
        <Stack.Screen name="VisitDetailsScreen" component={VisitDetailsScreen} />
        <Stack.Screen name="SearchSchoolsByRegion" component={SearchSchoolsByRegion} />
        <Stack.Screen name="SchoolDetails" component={SchoolDetails} />
        <Stack.Screen name="Lista de Cédulas de Directores" component={ListDirectors} />
        <Stack.Screen name="MapScreen" component={MapScreen} />






        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
