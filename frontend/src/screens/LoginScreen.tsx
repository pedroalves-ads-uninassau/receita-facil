import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  async function entrar(): Promise<void> {
    try {
      const usuarioLogado = await login({ email, senha });

      if (usuarioLogado) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  }

  function irParaCadastro(): void {
    navigation.navigate('Register');
  }

  function irParaRecuperarSenha(): void {
    navigation.navigate('ForgotPassword');
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="restaurant" size={50} color="#FFF" />
        </View>
        <Text style={styles.titulo}>Receita Fácil</Text>
        <Text style={styles.subtitulo}>Bem-vindo de volta!</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Seu email" 
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Sua senha" 
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.areaEsqueci} onPress={irParaRecuperarSenha}>
          <Text style={styles.textoEsqueci}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={entrar}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.areaCadastro} onPress={irParaCadastro}>
        <Text style={styles.textoCadastro}>Não tem conta? <Text style={styles.textoDestaque}>Criar agora</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF7F24',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
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
  areaEsqueci: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  textoEsqueci: {
    color: '#23374C',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#FF7F24',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  areaCadastro: {
    marginTop: 30,
    alignItems: 'center',
  },
  textoCadastro: {
    fontSize: 15,
    color: '#666',
  },
  textoDestaque: {
    color: '#FF7F24',
    fontWeight: 'bold',
  }
});
