import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Clima from './Climax';
import { ProgressBar } from 'react-native-paper'; // Importamos el componente ProgressBar

export default class Inicio extends Component {
  state = {
    studentData: null,
    loading: true,
    error: false,
  };

  // Función para obtener los datos del alumno
  fetchStudentData = async () => {
    try {
      const response = await fetch('https://cuceimobile.space/Escuela/kardex.php');
      const data = await response.json();
      this.setState({ studentData: data, error: false });
    } catch (error) {
      console.error('Error fetching student data:', error);
      this.setState({ error: true });
      Alert.alert('Error', 'No se pudo cargar la información del alumno.');
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.fetchStudentData();
  }

  handlePress = (buttonName) => {
    Alert.alert(`Has presionado ${buttonName}`);
  };

  render() {
    const { studentData, loading, error } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00796b" />
        </View>
      );
    }

    if (error || !studentData) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>No se pudieron cargar los datos del alumno.</Text>
        </View>
      );
    }

    // Cálculo de avance en los créditos
    const { creditosArea } = studentData || {};
    if (!creditosArea || creditosArea.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>No hay datos de créditos disponibles.</Text>
        </View>
      );
    }

    const totalCreditosAdquiridos = creditosArea.reduce((sum, area) => sum + area.creditosAdquiridos, 0);
    const totalCreditosRequeridos = creditosArea.reduce((sum, area) => sum + area.creditosRequeridos, 0);
    const avanceTotal = totalCreditosRequeridos > 0 ? (totalCreditosAdquiridos / totalCreditosRequeridos) * 100 : 0;

    // Datos para el gráfico de pastel: solo con "Completado"
    const data = [
      { name: 'Completado', population: avanceTotal, color: '#00796b', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      // Eliminado el segmento "Restante"
    ];

    return (
      <ScrollView style={styles.container}>
        {/* Icono y temperatura */}
        <View style={styles.weatherContainer}>
          <Clima />
        </View>

        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
        </View>

        {/* Botones organizados */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handlePress('RA')}
          >
            <Text style={styles.buttonText}>RA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => this.handlePress('Módulo')}
          >
            <Image
              source={require('./Imagenes/modulo.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.imageButtonText}>MÓDULO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => this.props.navigation.navigate('Directorio')}
          >
            <Image
              source={require('./Imagenes/directorio.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.imageButtonText}>DIRECTORIO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => this.props.navigation.navigate('Materias')}
          >
            <Image
              source={require('./Imagenes/materias.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.imageButtonText}>MATERIAS</Text>
          </TouchableOpacity>
        </View>

        {/* Gráfico de progreso */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Progreso Académico en porcentaje</Text>
          <PieChart
            data={data}
            width={400} // Ajustamos el ancho
            height={250} // Ajustamos el alto
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
        <View style={styles.legendContainer}>
         <View style={[styles.legendItem, { backgroundColor: '#d32f2f' }]} />
          <Text style={styles.legendText}>Restante: {(100 - avanceTotal).toFixed(2)}%</Text>
       </View>

        {/* Porcentajes de avance en barras horizontales */}
        <View style={styles.bars}>
          {creditosArea.map((area, index) => {
            const porcentajeArea = area.creditosRequeridos > 0 
              ? (area.creditosAdquiridos / area.creditosRequeridos) * 100 
              : 0;

            return (
              <View key={index} style={styles.progressBarContainer}>
                <Text style={styles.barText}>
                  {area.area}: {porcentajeArea.toFixed(2)}%
                </Text>
                <ProgressBar
                  progress={Math.min(porcentajeArea / 100, 1)}
                  color="#00796b"
                  style={styles.progressBar}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  weatherContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 90,
  },
  imageButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonImage: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  imageButtonText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: -20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bars: {
    marginTop: 20,
  },
  progressBarContainer: {
    marginBottom: 15,
  },
  barText: {
    fontSize: 14,
    marginBottom: 5,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    marginBottom: -140,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});
