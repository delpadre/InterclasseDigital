import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ModalidadesScreen from "./screens/ModalidadesScreen";
import ClassificacaoScreen from "./screens/ClassificacaoScreen";
import CalendarioScreen from "./screens/CalendarioScreen";
import CadastroJogoScreen from "./screens/CadastroJogoScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#1A1A2E",
              borderTopColor: "#222"
            },
            tabBarActiveTintColor: "#E91E8C",
            tabBarInactiveTintColor: "#888",
            tabBarIcon: ({ color, size }) => {
              let icon;
              if (route.name === "Modalidades") icon = "trophy";
              if (route.name === "Classificação") icon = "stats-chart";
              if (route.name === "Calendário") icon = "calendar";
              if (route.name === "Cadastrar") icon = "add-circle";
              return <Ionicons name={icon} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Modalidades" component={ModalidadesScreen} />
          <Tab.Screen name="Classificação" component={ClassificacaoScreen} />
          <Tab.Screen name="Calendário" component={CalendarioScreen} />
          <Tab.Screen name="Cadastrar" component={CadastroJogoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}