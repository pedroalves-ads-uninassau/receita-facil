import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // Mock the backend reset
    alert('Código de recuperação enviado para: ' + email);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.innerContainer}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="key-outline" size={36} color="#23374C" />
          </View>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>Não se preocupe! Te ajudaremos a voltar para a cozinha num instante.</Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail cadastrado"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleReset} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Enviar Código</Text>
            <Ionicons name="paper-plane-outline" size={20} color="#23374C" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7', // Creme fundo
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#23374C', // Azul Marinho
    fontWeight: 'bold',
    marginLeft: 6,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDBE34', // Amarelo de atenção
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#FDBE34',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF7F24', // Laranja
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  formCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 24,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#23374C',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FDBE34', // Amarelo For attention
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FDBE34',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#23374C', // Tipografia escura
    fontSize: 18,
    fontWeight: '800',
  },
});

export default ForgotPasswordScreen;
