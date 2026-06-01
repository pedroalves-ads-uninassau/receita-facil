import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

export default function RecipeDetailScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltarTopo} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#23374C" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color="#FF7F24" />
        <Text style={styles.titulo}>Detalhes da Receita</Text>
        <Text style={styles.aviso}>Página em Construção</Text>
        <Text style={styles.subaviso}>Em breve você poderá ver os ingredientes e o modo de preparo aqui!</Text>
        
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  botaoVoltarTopo: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23374C',
    marginTop: 20,
  },
  aviso: {
    fontSize: 20,
    color: '#FF7F24',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subaviso: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
