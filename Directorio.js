import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview'; 
import Clima from './Climax'; 

export default class Directorio extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Icono y temperatura */}
        <View style={styles.weatherContainer}>
          <Clima />
        </View>

        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
        </View>

        {/* WebView para mostrar página del directorio */}
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: 'https://www.cucei.udg.mx/' }}
            style={styles.webView}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  weatherContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 450,
    height: 250,
    resizeMode: 'contain',
  },
  webViewContainer: {
    flex: 1,
    marginTop: 20,
  },
  webView: {
    flex: 1,
  },
});
