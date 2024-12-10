import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import 'react-native-url-polyfill/auto';
import LOGIN from "./Login";
import INICIO from "./Inicio";
import DIRECTORIO from "./Directorio";
import Home from './Home';
import MATERIAS from './Materias';


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="login" component={LOGIN} />
          <Stack.Screen name="Inicio" component={INICIO} />
          <Stack.Screen name="Directorio" component={DIRECTORIO} />
          <Stack.Screen name="Materias" component={MATERIAS} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}