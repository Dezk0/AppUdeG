import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

export default function MapaCUCEI() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} // Usar OpenStreetMap por defecto
        style={styles.map}
        initialRegion={{
          latitude: 20.668,
          longitude: -103.398,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3, // Mapa ocupa un tercio de la pantalla
  },
});
