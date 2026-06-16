import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { criarReceita, listarCategorias, Categoria } from '../services/api';

export default function AddRecipeScreen({ navigation }: any) {
  const [titulo, setTitulo] = useState('');
  const [tempo, setTempo] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);
  const [imagemUrl, setImagemUrl] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [passoAPasso, setPassoAPasso] = useState('');
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    carregarUsuario();
    carregarCategorias();
  }, []);

  const carregarUsuario = async () => {
    const uStr = await AsyncStorage.getItem('usuarioId');
    if (uStr) setUsuarioId(parseInt(uStr));
  };

  const carregarCategorias = async () => {
    const cats = await listarCategorias();
    if (cats && cats.length > 0) {
      setCategorias(cats);
    } else {
      setCategorias([
        { id: 1, nomeCategoria: 'Massas' },
        { id: 2, nomeCategoria: 'Carnes' },
        { id: 3, nomeCategoria: 'Sobremesas' },
        { id: 4, nomeCategoria: 'Saudável' }
      ]);
    }
  };

  const formularioValido = titulo && tempo && categoriaSelecionada && ingredientes && passoAPasso;

  const handleCadastrarReceita = async () => {
    if (!formularioValido || !usuarioId) return;

    const novaReceitaData = {
      titulo,
      tempoPreparo: parseInt(tempo, 10),
      passoAPasso,
      ingredientes,
      usuarioId: usuarioId,
      categorias: categoriaSelecionada ? [categoriaSelecionada] : [],
      imagens: imagemUrl ? [{ url: imagemUrl }] : []
    };

    const response = await criarReceita(novaReceitaData);
    
    if (response) {
      Alert.alert('Sucesso', 'Receita enviada com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a receita.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Nova Receita</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        
        <Text style={styles.label}>Nome da Receita *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Risoto de Cogumelos"
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Tempo de Preparo (minutos) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={tempo}
          onChangeText={setTempo}
        />

        <Text style={styles.label}>Selecione a Categoria *</Text>
        <View style={styles.categoriasWrapper}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={(cat.id || Math.random()).toString()}
              style={[
                styles.chipCategoria,
                categoriaSelecionada?.id === cat.id && styles.chipCategoriaSelecionado
              ]}
              onPress={() => setCategoriaSelecionada(cat)}
            >
              <Text style={[
                styles.textoCategoria,
                categoriaSelecionada?.id === cat.id && styles.textoCategoriaSelecionado
              ]}>
                {cat.nomeCategoria}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Foto da Receita (Link ou Gerar Automático)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: https://linkdafoto.com/imagem.jpg"
          placeholderTextColor="#999"
          value={imagemUrl}
          onChangeText={setImagemUrl}
          autoCapitalize="none"
        />
        
        <View style={styles.rowBotoesGerar}>
          <TouchableOpacity style={styles.botaoGerarMini} onPress={() => setImagemUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80')}>
            <Ionicons name="fast-food-outline" size={16} color="#FFF" />
            <Text style={styles.textoGerarMini}>Gerar Almoço</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoGerarMini} onPress={() => setImagemUrl('https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80')}>
            <Ionicons name="ice-cream-outline" size={16} color="#FFF" />
            <Text style={styles.textoGerarMini}>Gerar Doce</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Ingredientes *</Text>
        <TextInput
          style={[styles.input, styles.inputLongo]}
          placeholder="Dica: Use quebras de linha ou tópicos para separar os itens.&#10;• 200g de arroz&#10;• 1 colher de manteiga"
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          value={ingredientes}
          onChangeText={setIngredientes}
        />

        <Text style={styles.label}>Modo de Preparo / Passo a Passo *</Text>
        <TextInput
          style={[styles.input, styles.inputLongo]}
          placeholder="Descreva as etapas detalhadamente...&#10;1. Refogue a cebola...&#10;2. Adicione o arroz..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          value={passoAPasso}
          onChangeText={setPassoAPasso}
        />

        <TouchableOpacity 
          style={[styles.botaoSalvar, !formularioValido && styles.botaoDesabilitado]} 
          onPress={handleCadastrarReceita}
          disabled={!formularioValido}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.textoBotao}>Publicar Receita</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFF8E7',
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  tituloTela: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23374C',
    marginLeft: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#23374C',
    marginTop: 15,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6DCC3',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    color: '#23374C',
    fontSize: 15,
  },
  inputLongo: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingBottom: 12,
  },
  categoriasWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 5,
  },
  chipCategoria: {
    backgroundColor: '#E6DCC3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipCategoriaSelecionado: {
    backgroundColor: '#FF7F24',
  },
  textoCategoria: {
    color: '#23374C',
    fontWeight: '600',
    fontSize: 13,
  },
  textoCategoriaSelecionado: {
    color: '#FFF',
  },
  botaoSalvar: {
    flexDirection: 'row',
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    elevation: 2,
  },
  botaoDesabilitado: {
    backgroundColor: '#CCC',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowBotoesGerar: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
  botaoGerarMini: {
    flexDirection: 'row',
    backgroundColor: '#23374C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoGerarMini: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});