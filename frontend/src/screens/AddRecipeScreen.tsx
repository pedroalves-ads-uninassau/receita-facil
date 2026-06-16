import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

// Categorias mapeadas conforme seu banco de dados
const CATEGORIAS_CADASTRO = [
  'Café da Manhã', 'Almoço', 'Jantar', 'Sobremesa', 'Vegano', 'Massas', 'Lanches'
];

export default function AddRecipeScreen({ navigation }: Props) {
  // Estados para cada campo exigido no modelo lógico do banco
  const [titulo, setTitulo] = useState('');
  const [tempo, setTempo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [passoAPasso, setPassoAPasso] = useState('');

  // Validação simples: desabilita o botão se faltar algo essencial
  const formularioValido = titulo && tempo && categoria && ingredientes && passoAPasso;

  const handleCadastrarReceita = () => {
    if (!formularioValido) return;

    const novaReceitaData = {
      titulo,
      tempo_preparo: parseInt(tempo, 10),
      categoria,
      imagem_url: imagemUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352', // Fallback caso não coloque foto
      ingredientes,
      passo_a_passo: passoAPasso
    };

    // TODO: Disparar requisição POST usando Axios/Fetch para o back-end (/receitas)
    console.log('Enviando para o Spring Boot:', novaReceitaData);
    alert('Receita enviada com sucesso para aprovação!');
    
    // Volta para o perfil ou home
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho fixo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Nova Receita</Text>
      </View>

      {/* Formulário com Rolagem */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        
        {/* Campo: Título */}
        <Text style={styles.label}>Nome da Receita *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Risoto de Cogumelos"
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Campo: Tempo de Preparo */}
        <Text style={styles.label}>Tempo de Preparo (minutos) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={tempo}
          onChangeText={setTempo}
        />

        {/* Campo: Categoria (Chips Selecionáveis) */}
        <Text style={styles.label}>Selecione a Categoria *</Text>
        <View style={styles.categoriasWrapper}>
          {CATEGORIAS_CADASTRO.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chipCategoria,
                categoria === cat && styles.chipCategoriaSelecionado
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[
                styles.textoCategoria,
                categoria === cat && styles.textoCategoriaSelecionado
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Campo: URL da Imagem */}
        <Text style={styles.label}>Link da Imagem da Receita</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: https://linkdafoto.com/imagem.jpg"
          placeholderTextColor="#999"
          value={imagemUrl}
          onChangeText={setImagemUrl}
        />

        {/* Campo: Ingredientes */}
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

        {/* Campo: Modo de Preparo */}
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

        {/* Botão de Envio adaptado */}
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
  }
});