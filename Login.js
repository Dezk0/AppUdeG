import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Clima from './Climax';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './Supabase'; // Asegúrate de que el cliente Supabase esté correctamente importado

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      password: '',
      loading: false, // Para manejar el estado de carga
    };
  }

  // Validar si el correo es institucional
  isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(alumnos|profesor)\.udg\.mx$/;
    return regex.test(email);
  };

  handleLogin = async () => {
    const { correo, password } = this.state;

    // Validar que el correo sea institucional
    if (!this.isValidEmail(correo)) {
      Alert.alert('Correo inválido', 'Por favor usa un correo institucional de la UDG.');
      return;
    }

    this.setState({ loading: true });

    try {
      // Intentar iniciar sesión
      let { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          // Si el usuario no existe, registrarlo automáticamente
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: correo,
            password: password,
          });

          if (signUpError) {
            this.setState({ loading: false });
            Alert.alert('Error', 'No se pudo registrar el usuario. ' + signUpError.message);
            return;
          }

          Alert.alert('Registro exitoso', 'Usuario registrado con éxito.');
          // Autenticar después del registro
          ({ data, error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: password,
          }));

          if (error) {
            this.setState({ loading: false });
            Alert.alert('Error', 'Error al iniciar sesión después del registro.');
            return;
          }
        } else {
          this.setState({ loading: false });
          Alert.alert('Error', error.message);
          return;
        }
      }

      // Guardar la sesión en AsyncStorage
      await AsyncStorage.setItem('supabaseSession', JSON.stringify(data.session));

      // Navegar al inicio
      this.props.navigation.navigate('Inicio');
    } catch (err) {
      Alert.alert('Error', 'Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, correo, password } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Icono de clima dinámico */}
        <View style={styles.weatherContainer}>
          <Clima />
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
        </View>

        <Text style={styles.title}>Login UDG</Text>

        <TextInput
          style={styles.input}
          placeholder="Introduce tu Correo institucional"
          value={correo}
          onChangeText={(correo) => this.setState({ correo })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Introduce tu Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
