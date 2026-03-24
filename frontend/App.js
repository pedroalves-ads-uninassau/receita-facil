import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import { colors } from './src/theme/colors';

// Auth Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

// Main Content Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary, elevation: 0 },
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { 
          height: 75, 
          paddingBottom: 15, 
          paddingTop: 10,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          elevation: 15,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'flame' : 'flame-outline';
          else if (route.name === 'SearchTab') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'FavoritesTab') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Swipe', tabBarLabel: 'Swipe' }} />
      <Tab.Screen name="SearchTab" component={SearchScreen} options={{ title: 'Buscar', tabBarLabel: 'Buscar', headerShown: false }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: 'Salvos', tabBarLabel: 'Favoritos' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil', tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={colors.background} />
      {/* Configuração de Rotas e Telas */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}