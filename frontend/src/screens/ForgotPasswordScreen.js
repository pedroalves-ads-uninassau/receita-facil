import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  function recuperar() {
    alert("Link enviado para o email!");
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
        <Ionicons name="key-outline" size={60} color="#FF7F24" />
        <Text style={styles.titulo}>Recuperar Senha</Text>
        <Text style={styles.subtitulo}>Enviaremos um link para redefinir a senha da sua conta do Receita Fácil</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Seu email cadastrado" placeholderTextColor="#999" value={email} onChangeText={setEmail}/>
        </View>

        <TouchableOpacity style={styles.botao} onPress={recuperar}>
          <Text style={styles.textoBotao}>Enviar Link</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.areaLogin} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textoLogin}>Lembrou da senha? <Text style={styles.textoDestaque}>Faça login</Text></Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23374C',
    marginTop: 10,
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
    marginBottom: 20,
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
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
