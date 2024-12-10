import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import Clima from './Climax';

const Materias = () => {
  const [materiasData, setMateriasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMaterias = async () => {
    try {
      const response = await fetch('https://cuceimobile.space/Escuela/kardex.php');
      const data = await response.json();
      setMateriasData(data); // Asignamos los datos completos
      setError(false);
    } catch (err) {
      console.error('Error al obtener las materias:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Clima arriba a la izquierda */}
        <View style={styles.weatherContainer}>
          <Clima />
        </View>
        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
        </View>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando materias...</Text>
      </View>
    );
  }

  if (error || !materiasData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar las materias. Intenta de nuevo más tarde.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Clima arriba a la izquierda */}
      <View style={styles.weatherContainer}>
        <Clima />
      </View>
      {/* Imagen centrada */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('./Imagenes/Udg.png')} />
      </View>
      {/* Información general */}
      <View style={styles.header}>
        <Text style={styles.title}>Resumen de Créditos</Text>
        <Text>Total Créditos Adquiridos: {materiasData.creditosAdquiridos ?? 'N/A'}</Text>
        <Text>Tipo de Certificado: {materiasData.tipoCertificado ?? 'N/A'}</Text>
        <Text>Promedio: {materiasData.promedio ? materiasData.promedio.toFixed(2) : 'N/A'}</Text>
      </View>
      {/* Créditos por área */}
      <View style={styles.creditosArea}>
        <Text style={styles.sectionTitle}>Créditos por Área</Text>
        {materiasData.creditosArea?.map((area, index) => (
          <View key={index} style={styles.area}>
            <Text>
              Área: {area.area} - {area.creditosAdquiridos}/{area.creditosRequeridos}
            </Text>
          </View>
        )) || <Text>No hay áreas disponibles.</Text>}
      </View>
      {/* Lista de materias */}
      <View style={styles.materiasSection}>
        <Text style={styles.sectionTitle}>Materias</Text>
        <FlatList
          data={materiasData.materias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.materiaItem}>
              <Text style={styles.materiaTitle}>{item.descripcion}</Text>
              <Text>Clave: {item.clave}</Text>
              <Text>Calificación: {item.calificacion}</Text>
              <Text>Créditos: {item.creditos}</Text>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Ciclo: {item.ciclo}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  weatherContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10, // Ajusta la distancia desde arriba
    marginBottom: -50,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  creditosArea: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  area: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    elevation: 1,
  },
  materiasSection: {
    marginBottom: 20,
  },
  materiaItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  materiaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default Materias;
