import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: '',
      descripcion: '',
      icono: '',
      cargando: true,
    };
  }

  componentDidMount() {
    this.obtenerClima();
  }

  obtenerClima = async () => {
    const API_KEY = '78051233e8369bc583d0b291be34578c'; // Reemplaza con tu API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Guadalajara&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          temperatura: `${data.main.temp}°C`,
          descripcion: data.weather[0].description,
          icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          cargando: false,
        });
      } else {
        console.error('Error en la respuesta:', data.message);
        this.setState({ cargando: false });
      }
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      this.setState({ cargando: false });
    }
  };

  render() {
    const { temperatura, descripcion, icono, cargando } = this.state;

    if (cargando) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <View style={styles.container}>
        {icono ? <Image style={styles.icon} source={{ uri: icono }} /> : null}
        <Text style={styles.temp}>{temperatura}</Text>
        <Text style={styles.desc}>{descripcion}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  icon: {
    marginTop: -25,
    width: 70,
    height: 70,
  },
  temp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -15,
  },
  desc: {
    fontSize: 10,
    color: '#555',
    marginTop: 5,
    textTransform: 'capitalize',
  },
});
