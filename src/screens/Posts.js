import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useIsFocused } from '@react-navigation/native';

const DocumentDetail = ({ route, navigation }) => {
  const { document = {}, bookId } = route.params || {};
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const isFocused = useIsFocused();

  const [fontsLoaded] = useFonts({
    Candara: require('../assets/fonts/Candara.ttf'),
    'Candara-Bold': require('../assets/fonts/Candara_Bold.ttf'),
    CenturyGothic: require('../assets/fonts/centurygothic.ttf'),
    'CenturyGothic-Bold': require('../assets/fonts/centurygothic_bold.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    if (document && document.titulo) {
      navigation.setOptions({
        headerTitle: () => (
          <Text style={styles.headerTitle}>{document.titulo}</Text>
        ),
      });
    }
  }, [document, navigation, fontsLoaded]);

  useEffect(() => {
    fetchComentarios();
  }, [bookId]);

  const fetchComentarios = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/comments/${bookId}`);
      
      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Erro na resposta do servidor: ${responseText}`);
      }
      
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }


  };

  if (isFocused) {
    fetchComentarios();
  } [isFocused];

  const handleAddComment = async () => {
    if (!novoComentario) return; // Não envia se o campo estiver vazio
    try {
      const response = await fetch('http://10.0.2.2:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, texto: novoComentario }), // Envia o bookId e o texto
      });
      if (response.ok) {
        const newComment = await response.json();
        setComentarios(prev => [...prev, newComment]); // Atualiza a lista de comentários
        setNovoComentario(''); // Limpa o campo de entrada
      } else {
        console.error('Erro ao adicionar comentário:', await response.text());
      }
    } catch (error) {
      console.error('Erro de rede ao adicionar comentário:', error);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {document.imagem && (
          <Image
            source={{ uri: `data:image/png;base64,${document.imagem.toString('base64')}` }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.textContainer1}>
      <Text style={styles.textTitulo} numberOfLines={3}>{document.titulo}</Text>
        <Text style={styles.textAutor}>Autor: {document.autor}</Text>
        <Text style={styles.textGenero}>Gênero: {document.genero}</Text>
      </View>
      <View style={styles.sinopseContainer}>
        <Text style={styles.titleSinopse}>Sinopse: </Text>
        <ScrollView style={styles.sinopseScrollContainer}>
          <Text style={styles.textSinopse}>{document.sinopse}</Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.buttonComment} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TextInput
        value={novoComentario}
        onChangeText={setNovoComentario}
        placeholder="Digite seu comentário"
        style={styles.inputComment}
      />
      <View style={styles.commentsContainer}>
        {comentarios.map((item, index) => (
          <View key={index}>
            <Text  style={styles.comment}>{item.texto}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textTitulo:{
    fontFamily: 'CenturyGothic-Bold',
    fontSize: 20,
    maxWidth: '60%',
    
  },
  inputComment: {
    fontFamily: 'Candara-Bold',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  comment: { 
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    padding: 15,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    fontFamily: 'Candara',
    fontSize: 16,
   },
  commentsContainer: {
    marginTop: 10,
    marginVertical: 40,
  },
  container: { 
    padding: 15, 
    backgroundColor: '#FFF', 
    flex: 1 
  },
  headerTitle: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: 20,
  },
  textContainer1: {
    top: -250,
    left: 170,
  },
  textAutor: {
    fontFamily: 'CenturyGothic',
    marginTop: 20,
    fontSize: 16,
  },
  textGenero: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'CenturyGothic',
  },
  sinopseContainer: {
    backgroundColor: '#94D3FF',
    marginTop: -100,
    borderWidth: 2,
    padding: 15,
    borderColor: '#94D3FF',
    borderRadius: 12,
  },
  titleSinopse: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: 20,
  },
  textSinopse: {
    fontFamily: 'CenturyGothic',
    fontSize: 15,
    marginTop: 10,
  },
  sinopseScrollContainer: {
    maxHeight: 240,
    flexGrow: 1,
  },
  buttonComment: {
    marginTop: 15,
    padding: 14,
    backgroundColor: '#E1ADFF',
    borderWidth: 2,
    borderColor: '#E1ADFF',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#FFE390',
    width: 162,
    height: 256,
  },
  image: {
    width: 156.25,
    height: 250,
    borderRadius: 4,
  },
});

export default DocumentDetail;
