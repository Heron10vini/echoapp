import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const InsertForm = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [imagem, setImagem] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É preciso dar permissão para acessar a galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0]);
      Alert.alert("Imagem Selecionada", "Imagem selecionada com sucesso!");
    } else {
      Alert.alert("Erro", "Nenhuma imagem selecionada");
    }
  };

  const insertData = async () => {
    if (!imagem) {
      Alert.alert("Erro", "Nenhuma imagem foi selecionada!");
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('genero', genero);
    formData.append('sinopse', sinopse);
    formData.append('imagem', {
      uri: imagem.uri,
      type: 'image/jpeg',
      name: 'imagem.jpg',
    });

    try {
      const response = await fetch('http://10.0.2.2:3000/insert', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      Alert.alert("Sucesso", data.message);
    } catch (error) {
      console.error('Erro ao inserir foto:', error);
      Alert.alert("Erro", "Erro ao inserir foto");
    }
  
      setTitulo('');
      setAutor('');
      setGenero('');
      setSinopse('');
  };

  const [fontsLoaded] = useFonts({
    Candara: require('../assets/fonts/Candara.ttf'),
    'Candara-Bold': require('../assets/fonts/Candara_Bold.ttf'),
    CenturyGothic: require('../assets/fonts/centurygothic.ttf'),
    'CenturyGothic-Bold': require('../assets/fonts/centurygothic_bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#FFF', flex: 1, }}>
      <Text style={styles.textTitle}>ADICIONE UM LIVRO</Text>
      <View style={styles.containerView}>
      <Text style={styles.textBox}>Título:</Text>
      <TextInput
        style={styles.textBoxInput}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.textBox}>Nome do Autor:</Text>
      <TextInput
        style={styles.textBoxInput}
        value={autor}
        onChangeText={setAutor}
        placeholder="Digite o nome do autor"
      />

      <Text style={styles.textBox}>Gênero:</Text>
      <Picker
        selectedValue={genero}
        onValueChange={(itemValue) => setGenero(itemValue)}
        style={styles.textBoxInput}
      >
        <Picker.Item label="Selecione o gênero" value="" />
        <Picker.Item label="Ação e aventura" value="Ação e aventura" />
        <Picker.Item label="Thriller e Suspense" value="Thriller e Suspense" />
        <Picker.Item label="Romance" value="Romance" />
        <Picker.Item label="Graphic Novel" value="Graphic Novel" />
        <Picker.Item label="Biografia" value="Biografia" />
        <Picker.Item label="História" value="História" />
        <Picker.Item label="Guias" value="Guias" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>

      <Text style={styles.textBox}>Sinopse:</Text>
      <TextInput
        style={styles.textBoxInput}
        value={sinopse}
        onChangeText={setSinopse}
        placeholder="Digite a sinopse"
        multiline
      />

      <TouchableOpacity 
        style={styles.buttonImage} 
        onPress={pickImage}> 
          <Text style={styles.textButton}>SELECIONAR IMAGEM</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonInsert} 
        onPress={insertData}> 
          <Text style={styles.textButton}>ADICIONAR LIVRO</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  containerView: {
    borderWidth: 2,
    padding: 20,
    marginVertical: 20,
    borderRadius: 20,
    borderColor: '#94D3FF',
  },
  textTitle: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 26,
    fontFamily: 'CenturyGothic-Bold',
  },
  textBox: {
    fontFamily: 'CenturyGothic-Bold',
  },
  textBoxInput: {
    fontFamily: 'CenturyGothic-Bold', 
    borderWidth: 0.5, 
    padding: 8, 
    marginBottom: 10, 
    borderRadius: 8, 
    marginTop: 5,
  },
  textButton: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Candara-Bold',
  },
  buttonImage: {
    marginTop: 35,
    padding: 14,
    backgroundColor: '#E1ADFF',

    borderWidth: 2,
    borderColor: '#E1ADFF',
  },
  buttonInsert: {
    marginVertical: 20,
    padding: 14,
    backgroundColor: '#F3D863',

    borderWidth: 2,
    borderColor: '#F3D863',
  },
});

// Exportando a função New
export default function New({ navigation }) {
  return (
    <InsertForm navigation={navigation} />
  );
};

