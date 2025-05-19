import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DeviceEventEmitter } from "react-native";

// Importe suas telas
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ListPetsScreen from "../screens/ListPetsScreen";
import AddPetScreen from "../screens/AddRegisterPetScreen";

// Stack para autenticação
const AuthStackNav = createStackNavigator();
function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Register" component={RegisterScreen} />
    </AuthStackNav.Navigator>
  );
}

// Tabs principais do app
const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 70,
          paddingBottom: 20,
          paddingTop: 10,
          position: "absolute",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;
          if (route.name === "Dashboard") iconName = focused ? "home" : "home-outline";
          if (route.name === "ListPets") iconName = focused ? "paw" : "paw-outline";
          if (route.name === "AddPet") iconName = focused ? "add-circle" : "add-circle-outline";
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Início" }} />
      <Tab.Screen name="ListPets" component={ListPetsScreen} options={{ title: "Meus Pets" }} />
      <Tab.Screen name="AddPet" component={AddPetScreen} options={{ title: "Cadastrar Pet" }} />
    </Tab.Navigator>
  );
}

// Componente principal de navegação
export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const loadUser = () => {
    AsyncStorage.getItem("user").then((data) => {
      setUser(data ? JSON.parse(data) : null);
      setIsLoading(false);
    });
  };

  loadUser();

  const subscription = DeviceEventEmitter.addListener("userLoggedIn", loadUser);

  return () => {
    subscription.remove();
  };
}, []);

  if (isLoading) return null; // ou um splash screen

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}