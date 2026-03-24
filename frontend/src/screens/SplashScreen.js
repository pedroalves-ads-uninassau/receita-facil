import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const SplashScreen = ({ navigation }) => {

const handleStart = () => {
  navigation.navigate('Login');
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Receita Fácil</Text>
          <Text style={styles.subtitle}>Descubra novos sabores</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 120,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FF7F24',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FDBE34',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FF7F24',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 80,
    shadowColor: '#FDBE34',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;