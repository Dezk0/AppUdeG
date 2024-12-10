import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Clima from './Climax';

export default class Home extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {/* Icono y temperatura */}
        <View style={styles.weatherContainer}>
          <Clima />
        </View>

        {/* Botón de iniciar sesión */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('login')}
        >
          <Image
            style={styles.loginIcon}
            source={require('./Imagenes/login.png')}
          />
        </TouchableOpacity>

        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
        </View>

        {/* Contenedor en fila para los botones */}
        <View style={styles.rowContainer}>
          {/* Módulo */}
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => alert('Navegando a Módulo')}
          >
            <Image
              style={styles.optionImage}
              source={require('./Imagenes/modulo.png')} // Imagen del módulo
            />
            <Text style={styles.optionText}>Módulo</Text>
          </TouchableOpacity>

          {/* Directorio */}
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => navigation.navigate('Directorio')}
          >
            <Image
              style={styles.optionImage}
              source={require('./Imagenes/directorio.png')} // Imagen del directorio
            />
            <Text style={styles.optionText}>Directorio</Text>
          </TouchableOpacity>

          {/* RA */}
          <TouchableOpacity
            style={styles.raContainer}
            onPress={() => alert('Navegando a RA')}
          >
            <Text style={styles.raText}>RA</Text>
          </TouchableOpacity>
        </View>

        {/* Mapa debajo */}
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 20.653936,
              longitude: -103.325816,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 20.653936, longitude: -103.325816 }}
              title="CUCEI"
              description="Centro Universitario de Ciencias Exactas e Ingenierías"
            />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffff',
  },
  weatherContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  loginIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: -15,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row', // Disposición en fila
    justifyContent: 'space-around', // Espaciado uniforme entre los botones
    alignItems: 'center', // Alineación vertical al centro
    marginVertical: 20, // Margen superior e inferior
  },
  optionContainer: {
    alignItems: 'center',
    marginHorizontal: 10, // Espaciado horizontal entre botones
  },
  optionImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  raContainer: {
    backgroundColor: '#cce7ff',
    width: 80, // Ancho fijo
    height: 80, // Alto fijo (cuadrado)
    borderRadius: 10,
    justifyContent: 'center', // Centrar texto verticalmente
    alignItems: 'center', // Centrar texto horizontalmente
  },
  raText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  mapView: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
