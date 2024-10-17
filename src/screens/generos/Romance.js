import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const DocumentList = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);
  const isFocused = useIsFocused(); // Hook para verificar o foco da tela

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/documents');
        const data = await response.json();
        const filteredDocuments = data.filter(document => document.genero === 'Romance');
        setDocuments(filteredDocuments);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
    };


    if (isFocused) {
      fetchDocuments();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <ScrollView style={styles.itemContainer}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('DocumentDetail', { document: item, bookId: item._id });
      }}>
        <Image
          source={{ uri: `data:image/png;base64,${item.imagem.toString('base64')}` }}
          style={styles.image}
        />
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        data={documents}
        numColumns={3} // Aqui está a alteração para 3 colunas
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  padding: 5, 
  justifyContent: 'space-between',
  backgroundColor: '#FFF'
  },

  itemContainer: {
    flex: 1,
  },

  image: { 
    width: 120,
    height: 200,
    marginTop: 10,
    marginLeft: 7,
    borderRadius: 8, 
  },
});

// Exportando ambos os componentes
export default function Romance(props) {
  return <DocumentList {...props} />;
};