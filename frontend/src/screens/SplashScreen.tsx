import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';

type Props = {
  navigation: any;
};

export default function SplashScreen({ navigation }: Props) {

  function entrar() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Receita Fácil
      </Text>

      <Text style={styles.subtitulo}>
        Descubra novas receitas
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={entrar}
      >
        <Text style={styles.textoBotao}>
          Entrar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 35,
    color: 'orange',
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
  },

  botao: {
    backgroundColor: 'orange',
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});