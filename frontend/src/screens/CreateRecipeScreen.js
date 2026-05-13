import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { recipeService } from '../services/recipeService';
import { AuthContext } from '../contexts/AuthContext';

export default function CreateRecipeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user || user.tipo === 'COMUM') {
      Alert.alert('Acesso restrito', 'Apenas perfis CHEF e ADMIN podem publicar receitas.');
      return;
    }

    if (!title || !ingredients || !steps) {
      Alert.alert('Ops!', 'Preencha todos os campos para publicar sua receita.');
      return;
    }

    setLoading(true);
    try {
      await recipeService.createRecipe({
        titulo: title,
        ingredientes: ingredients,
        passoAPasso: steps,
        tempoPreparo: 30, // Mock por enquanto
        usuario: { id: user.id }
      });

      Alert.alert('Sucesso!', 'Sua receita foi publicada e já está disponível.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível publicar a receita no momento.');
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.headerSub}>Compartilhe seu talento com outros chefs.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Risoto de Alho Poró" />

            <Text style={styles.label}>Categoria</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Ex: Massas" />

            <Text style={styles.label}>Ingredientes</Text>
            <TextInput style={[styles.input, styles.textArea]} multiline value={ingredients} onChangeText={setIngredients} placeholder="Ingredientes separados por linha..." />

            <Text style={styles.label}>Modo de Preparo</Text>
            <TextInput style={[styles.input, styles.textArea]} multiline value={steps} onChangeText={setSteps} placeholder="Conte o passo a passo..." />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : (
                <>
                  <Ionicons name="checkmark-circle-outline" size={24} color={colors.white} />
                  <Text style={styles.saveBtnText}>Publicar Agora</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 24, paddingTop: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { marginLeft: 8, fontSize: 16, color: colors.text },
  headerTitle: { fontSize: 32, fontWeight: '900', color: colors.primary, marginBottom: 8 },
  headerSub: { fontSize: 16, color: colors.gray, marginBottom: 30 },
  form: { backgroundColor: colors.white, borderRadius: 20, padding: 20, elevation: 2, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#FAFAFA', borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  textArea: { height: 120, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: colors.success, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 12, marginTop: 10 },
  saveBtnText: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginLeft: 10 }
});
