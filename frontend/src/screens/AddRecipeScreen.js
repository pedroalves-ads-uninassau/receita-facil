import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSave = () => {
    if (!title || !ingredients || !steps) {
      Alert.alert('Ops!', 'Preencha todos os campos para publicar sua receita.');
      return;
    }

    // Simulação de salvamento
    Alert.alert('Sucesso!', 'Sua receita foi publicada e já está disponível para outros usuários.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.backText}>Cancelar</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Nova Receita</Text>
          <Text style={styles.headerSub}>Compartilhe seu talento culinário com o mundo.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Título da Receita</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Bolo de Cenoura da Vovó"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Doces, Massas, Saudável..."
              value={category}
              onChangeText={setCategory}
            />

            <Text style={styles.label}>Ingredientes (um por linha)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: 2 ovos\n1 xícara de açúcar..."
              multiline
              numberOfLines={4}
              value={ingredients}
              onChangeText={setIngredients}
            />

            <Text style={styles.label}>Modo de Preparo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte o passo a passo..."
              multiline
              numberOfLines={6}
              value={steps}
              onChangeText={setSteps}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle-outline" size={24} color={colors.white} />
              <Text style={styles.saveBtnText}>Publicar Receita</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 24,
    paddingTop: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 8,
  },
  headerSub: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 30,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  saveBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
