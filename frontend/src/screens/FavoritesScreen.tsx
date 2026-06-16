import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

export default function FavoritesScreen({ navigation }: Props) {
  // Simulando receitas favoritadas vindas do banco cruzando Usuario e ReceitasFavoritas
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      titulo: 'Panqueca americana',
      tempo_preparo: 15,
      imagem_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    },
    {
      id: 2,
      titulo: 'Macarrão ao alho e óleo',
      tempo_preparo: 25,
      imagem_url: 'https://images.unsplash.com/photo-1621510456681-23a23cfb5f57',
    }
  ]);

  // Função para remover dos favoritos (simula o DELETE na tabela associativa)
  const removerFavorito = (id: number) => {
    setFavoritos(favoritos.filter(item => item.id !== id));
    // TODO: Fazer a requisição DELETE para a API do Spring Boot (/favoritos/{id})
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Meus Favoritos</Text>
      </View>

      {/* Listagem de Favoritos */}
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
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaContainer}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card} 
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
              >
                {/* Imagem da Receita */}
                <Image source={{ uri: item.imagem_url }} style={styles.imagemCard} />
                
                {/* Informações da Receita */}
                <View style={styles.infoCard}>
                  <Text style={styles.tituloCard} numberOfLines={1}>{item.titulo}</Text>
                  
                  <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={16} color="#FF7F24" />
                    <Text style={styles.tempoTexto}>{item.tempo_preparo} min</Text>
                  </View>
                </View>

                {/* Botão de Remover rápido */}
                <TouchableOpacity 
                  style={styles.botaoRemover} 
                  onPress={() => removerFavorito(item.id)}
                >
                  <Ionicons name="heart" size={24} color="#E33E3E" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
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
