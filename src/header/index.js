import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
    <View style={styles.headerContent}>
      <Image
        source={require('./header.png')}
        style={styles.headerTitle}
      />
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 110,
    backgroundColor: '#151515',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, // ajusta conforme necessário para evitar sobreposição
  },
  headerTitle: {
    width: 200,
    height: 150,
  },
});

export default Header;
