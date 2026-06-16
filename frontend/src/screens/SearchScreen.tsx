import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

// Categorias vindas diretamente do script SQL do seu projeto
const CATEGORIAS_PROJETO = [
  'Todos', 'Café da Manhã', 'Almoço', 'Jantar', 'Sobremesa', 'Vegano', 'Massas', 'Lanches'
];

export default function SearchScreen({ navigation }: Props) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [buscarPorIngrediente, setBuscarPorIngrediente] = useState(false);

  // Função "Search-as-you-type" (atualiza o estado a cada caractere)
  const handleSearch = (text: string) => {
    setPesquisa(text);
    // TODO: Aqui será chamada a rota da API Spring Boot passando o termo digitado
  };

  const selecionarCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    // TODO: Filtrar a requisição por ID de Categoria vindo da API
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Buscar Receitas</Text>
      </View>

      {/* Container do Input de Busca */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder={buscarPorIngrediente ? "Buscar por ingredientes..." : "Buscar pelo nome do prato..."}
            placeholderTextColor="#999"
            value={pesquisa}
            onChangeText={handleSearch}
          />
          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Botão de Alternância de Tipo de Busca (Título vs Ingredientes) */}
        <TouchableOpacity 
          style={[styles.botaoFiltroTipo, buscarPorIngrediente && styles.botaoFiltroAtivo]}
          onPress={() => setBuscarPorIngrediente(!buscarPorIngrediente)}
        >
          <Ionicons 
            name={buscarPorIngrediente ? "nutrition" : "nutrition-outline"} 
            size={18} 
            color={buscarPorIngrediente ? "#FFF" : "#FF7F24"} 
          />
          <Text style={[styles.textoFiltroTipo, buscarPorIngrediente && styles.textoFiltroAtivo]}>
            {buscarPorIngrediente ? "Filtrando por Ingredientes" : "Mudar para buscar por ingrediente"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filtro de Categorias Horizontal */}
      <View style={styles.categoriasContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategorias}>
          {CATEGORIAS_PROJETO.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chipCategoria,
                categoriaSelecionada === cat && styles.chipCategoriaSelecionado
              ]}
              onPress={() => selecionarCategoria(cat)}
            >
              <Text style={[
                styles.textoCategoria,
                categoriaSelecionada === cat && styles.textoCategoriaSelecionado
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Resultados da Pesquisa */}
      <View style={styles.resultadosContainer}>
        {pesquisa.length === 0 && categoriaSelecionada === 'Todos' ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={60} color="#CCC" />
            <Text style={styles.textoEmptyState}>Digite o nome do prato ou escolha uma categoria para começar!</Text>
          </View>
        ) : (
          <FlatList
            data={[]} // Aqui entrará o array de receitas vindo da resposta do Axios/Spring Boot
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <View><Text>Card da Receita</Text></View>
            )}
            ListEmptyComponent={
              <Text style={styles.textoSemResultados}>Nenhuma receita encontrada para os filtros aplicados.</Text>
            }
          />
        )}
      </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#E6DCC3',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#23374C',
  },
  botaoFiltroTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF7F24',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#FF7F24',
  },
  textoFiltroTipo: {
    color: '#FF7F24',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  textoFiltroAtivo: {
    color: '#FFF',
  },
  categoriasContainer: {
    height: 45,
    marginBottom: 10,
  },
  scrollCategorias: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  chipCategoria: {
    backgroundColor: '#E6DCC3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  chipCategoriaSelecionado: {
    backgroundColor: '#FF7F24',
  },
  textoCategoria: {
    color: '#23374C',
    fontWeight: '600',
    fontSize: 14,
  },
  textoCategoriaSelecionado: {
    color: '#FFF',
  },
  resultadosContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  textoEmptyState: {
    color: '#888',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 15,
    paddingHorizontal: 30,
  },
  textoSemResultados: {
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  }
});