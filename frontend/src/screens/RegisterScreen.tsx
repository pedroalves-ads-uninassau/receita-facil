import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

type Props = {
  navigation: any;
};

export default function RegisterScreen({ navigation }: Props) {
const [nome, setNome] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [senha, setSenha] = useState<string>('');

  function cadastrar() {
    Alert.alert("Sucesso", "Conta criada com sucesso!");
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.botaoVoltarTopo} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#23374C" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="restaurant" size={50} color="#FFF" />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>Crie sua conta no Receita Fácil!</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Seu nome" placeholderTextColor="#999" value={nome} onChangeText={setNome}/>
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Seu email" placeholderTextColor="#999" value={email} onChangeText={setEmail}/>
        </View>
        
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Sua senha" placeholderTextColor="#999" secureTextEntry value={senha} onChangeText={setSenha}/>
        </View>

        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.areaLogin} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textoLogin}>Já tem conta? <Text style={styles.textoDestaque}>Entre agora</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    padding: 24,
    justifyContent: 'center',
  },
   logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF7F24', // Laranja Receita Fácil
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5, // Sombra
  },
  areaLogin: {
    marginTop: 30,
    alignItems: 'center',
  },
  textoLogin: {
    fontSize: 15,
    color: '#666',
  },
  textoDestaque: {
    color: '#FF7F24',
    fontWeight: 'bold',
  },
  botaoVoltarTopo: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#23374C',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#FF7F24',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
