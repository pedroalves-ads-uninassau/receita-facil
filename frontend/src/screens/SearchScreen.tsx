import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listarCategorias, buscarReceitasPorTitulo, buscarReceitasPorCategoria, getReceitas, Categoria, Receita } from '../services/api';
import RecipeCard from '../components/RecipeCard';

export default function SearchScreen({ navigation }: any) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [buscarPorIngrediente, setBuscarPorIngrediente] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [resultados, setResultados] = useState<Receita[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  useEffect(() => {
    if (pesquisa.length > 0) {
      realizarBusca(pesquisa, buscarPorIngrediente);
    } else if (categoriaSelecionada !== null) {
      buscarPorCategoria(categoriaSelecionada);
    } else {
      setResultados([]);
    }
  }, [pesquisa, buscarPorIngrediente, categoriaSelecionada]);

  const carregarCategorias = async () => {
    const cats = await listarCategorias();
    setCategorias(cats);
  };

  const realizarBusca = async (texto: string, porIngrediente: boolean) => {
    if (porIngrediente) {
      const todas = await getReceitas();
      const filtradas = todas.filter(r => r.ingredientes?.toLowerCase().includes(texto.toLowerCase()));
      setResultados(filtradas);
    } else {
      const res = await buscarReceitasPorTitulo(texto);
      setResultados(res);
    }
  };

  const buscarPorCategoria = async (id: number) => {
    const res = await buscarReceitasPorCategoria(id);
    setResultados(res);
  };

  const handleSearch = (text: string) => {
    setPesquisa(text);
    if (text.length === 0 && categoriaSelecionada === null) {
      setResultados([]);
    }
  };

  const selecionarCategoria = (id: number | null) => {
    if (categoriaSelecionada === id) {
      setCategoriaSelecionada(null);
      if (pesquisa.length > 0) {
        realizarBusca(pesquisa, buscarPorIngrediente);
      } else {
        setResultados([]);
      }
    } else {
      setCategoriaSelecionada(id);
      setPesquisa('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Buscar Receitas</Text>
      </View>

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

        <TouchableOpacity 
          style={[styles.botaoFiltroTipo, buscarPorIngrediente && styles.botaoFiltroAtivo]}
          onPress={() => {
            setBuscarPorIngrediente(!buscarPorIngrediente);
            setCategoriaSelecionada(null);
          }}
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

      <View style={styles.categoriasContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategorias}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.id?.toString()}
              style={[
                styles.chipCategoria,
                categoriaSelecionada === cat.id && styles.chipCategoriaSelecionado
              ]}
              onPress={() => selecionarCategoria(cat.id || null)}
            >
              <Text style={[
                styles.textoCategoria,
                categoriaSelecionada === cat.id && styles.textoCategoriaSelecionado
              ]}>
                {cat.nomeCategoria}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.resultadosContainer}>
        {pesquisa.length === 0 && categoriaSelecionada === null ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={60} color="#CCC" />
            <Text style={styles.textoEmptyState}>Digite o nome do prato ou escolha uma categoria para começar!</Text>
          </View>
        ) : (
          <FlatList
            data={resultados}
            keyExtractor={(item) => (item.id || Math.random()).toString()}
            renderItem={({ item }) => (
              <RecipeCard 
                recipe={item} 
                onPress={() => navigation.navigate('RecipeDetail', { receitaId: item.id })} 
              />
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