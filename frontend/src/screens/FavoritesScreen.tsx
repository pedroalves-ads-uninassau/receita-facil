import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listarFavoritos, desfavoritarReceita, Receita } from '../services/api';

export default function FavoritesScreen({ navigation }: any) {
  const [favoritos, setFavoritos] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState(true);

  const usuarioIdMock = 1;

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    setCarregando(true);
    const data = await listarFavoritos(usuarioIdMock);
    setFavoritos(data);
    setCarregando(false);
  };

  const removerFavorito = async (id?: number) => {
    if (!id) return;
    const sucesso = await desfavoritarReceita(usuarioIdMock, id);
    if (sucesso) {
      setFavoritos(favoritos.filter(item => item.id !== id));
    }
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Meus Favoritos</Text>
      </View>

      <View style={styles.content}>
        {favoritos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-dislike-outline" size={80} color="#CCC" />
            <Text style={styles.aviso}>Sua lista está vazia</Text>
            <Text style={styles.subaviso}>Explore novas receitas e salve suas favoritas para vê-las aqui!</Text>
            
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Search')}>
              <Text style={styles.textoBotao}>Buscar Receitas</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={favoritos}
            keyExtractor={(item) => (item.id || Math.random()).toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaContainer}
            renderItem={({ item }) => {
              const imageUrl = item.imagens && item.imagens.length > 0 
                ? item.imagens[0].url 
                : 'https://images.unsplash.com/photo-1528207776546-365bb710ee93';

              return (
                <TouchableOpacity 
                  style={styles.card} 
                  onPress={() => navigation.navigate('RecipeDetail', { receitaId: item.id })}
                >
                  <Image source={{ uri: imageUrl }} style={styles.imagemCard} />
                  
                  <View style={styles.infoCard}>
                    <Text style={styles.tituloCard} numberOfLines={1}>{item.titulo}</Text>
                    
                    <View style={styles.metaRow}>
                      <Ionicons name="time-outline" size={16} color="#FF7F24" />
                      <Text style={styles.tempoTexto}>{item.tempoPreparo} min</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.botaoRemover} 
                    onPress={() => removerFavorito(item.id)}
                  >
                    <Ionicons name="heart" size={24} color="#E33E3E" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    flex: 1,
  },
  listaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 15,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6DCC3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imagemCard: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },
  infoCard: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  tituloCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempoTexto: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  botaoRemover: {
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23374C',
    marginTop: 20,
  },
  aviso: {
    fontSize: 20,
    color: '#FF7F24',
    fontWeight: 'bold',
    marginTop: 15,
  },
  subaviso: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#FF7F24',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
