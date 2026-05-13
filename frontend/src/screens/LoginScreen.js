import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await login(email.trim().toLowerCase(), password);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Falha no login', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png' }} 
              style={styles.logo} 
            />
            <Text style={styles.title}>Receita Fácil</Text>
            <Text style={styles.subtitle}>Sua próxima refeição favorita está aqui.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                secureTextEntry 
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.forgotPass}>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.loginBtnText}>Entrar</Text>}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 30, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 50 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '900', color: colors.text, marginBottom: 5 },
  subtitle: { fontSize: 16, color: colors.gray, textAlign: 'center' },
  form: { width: '100%' },
  inputBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: colors.text },
  forgotPass: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: colors.primary, fontWeight: 'bold' },
  loginBtn: { 
    backgroundColor: colors.primary, 
    borderRadius: 15, 
    paddingVertical: 18, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  loginBtnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: colors.text },
  registerText: { color: colors.primary, fontWeight: 'bold' },
});
