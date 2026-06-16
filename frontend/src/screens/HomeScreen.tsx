import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { getReceitas, favoritarReceita, Receita } from '../services/api';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    carregarUsuario();
    carregarDoBanco();
  }, []);

  async function carregarUsuario() {
    try {
      const uStr = await AsyncStorage.getItem('usuarioId');
      if (uStr) setUsuarioId(parseInt(uStr));
    } catch (e) {
      console.log('Erro ao ler AsyncStorage', e);
    }
  }

  async function carregarDoBanco() {
    try {
      setCarregando(true);
      const data = await getReceitas();
      setReceitas(data);
    } catch (error) {
      console.log("Erro ao buscar receitas:", error);
    } finally {
      setCarregando(false);
    }
  }

  async function favoritar() {
    const receita = receitas[indiceAtual];
    if (!receita?.id) return;
    if (!usuarioId) {
      Alert.alert('Atenção', 'Você precisa estar logado para favoritar.');
      return;
    }

    try {
      const sucesso = await favoritarReceita(usuarioId, receita.id);
      if (sucesso) {
        Alert.alert('Sucesso', 'Receita adicionada aos favoritos!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function proximaReceita() {
    if (indiceAtual < receitas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      Alert.alert('Fim da linha!', 'Você já viu todas as receitas disponíveis.');
    }
  }

  function verDetalhes() {
    const receita = receitas[indiceAtual];
    if (receita) {
      navigation.navigate('RecipeDetail', { receitaId: receita.id });
    }
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
        <Text style={styles.loadingTexto}>Procurando pratos incríveis...</Text>
      </View>
    );
  }

  const receitaAtiva = receitas[indiceAtual];

  if (!receitaAtiva) {
    if (receitas.length > 0) {
      // Tem receitas mas o usuário já viu todas
      return (
        <View style={styles.loadingContainer}>
          <Ionicons name="checkmark-done-circle" size={80} color="#FF7F24" />
          <Text style={styles.loadingTexto}>Você viu todas as receitas!</Text>
          <TouchableOpacity style={styles.botaoRecarregar} onPress={() => setIndiceAtual(0)}>
            <Text style={styles.textoBotaoRecarregar}>Ver tudo novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // Não carregou nenhuma receita do banco
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="restaurant-outline" size={80} color="#FF7F24" />
        <Text style={styles.loadingTexto}>Nenhuma receita encontrada!</Text>
        <Text style={styles.subTexto}>Verifique se o backend está ligado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={receitas}
        cardIndex={indiceAtual}
        renderCard={(receita: Receita) => {
          if (!receita) return <View />;

          const categoriaNome = receita.categorias && receita.categorias.length > 0 
            ? receita.categorias[0].nomeCategoria 
            : 'Geral';
          
          const imageUrl = receita.imagens && receita.imagens.length > 0 
            ? receita.imagens[0].url 
            : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          
          const chefName = receita.autor ? receita.autor.nome : `Chef ${receita.usuarioId || 1}`;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.cardGigante}
              onPress={verDetalhes}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.imagemReceita}
              />

              <View style={styles.etiquetaCategoria}>
                <Text style={styles.textoEtiqueta}>
                  {categoriaNome}
                </Text>
              </View>

              <View style={styles.infoReceita}>
                <Text style={styles.tituloReceita}>
                  {receita.titulo}
                </Text>

                <View style={styles.tagsArea}>
                  <View style={styles.tag}>
                    <Ionicons name="time-outline" size={18} color="#666" />
                    <Text style={styles.textoTag}>
                      {receita.tempoPreparo || 15} min
                    </Text>
                  </View>

                  <Text style={styles.bolinha}>•</Text>

                  <View style={styles.tag}>
                    <Ionicons name="person-outline" size={18} color="#666" />
                    <Text style={styles.textoTag}>
                      {chefName}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        onSwipedLeft={proximaReceita}
        onSwipedRight={proximaReceita}
        backgroundColor="transparent"
        stackSize={3}
        verticalSwipe={false}
        animateCardOpacity
      />

      <View
        style={[
          styles.actions,
          { marginBottom: insets.bottom + 10 }
        ]}
      >   
        <TouchableOpacity style={[styles.botaoCirculo, styles.bordaVermelha]} onPress={proximaReceita}>
          <Ionicons name="close" size={40} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoCirculo, styles.bordaVerde]}
          onPress={async () => {
            await favoritar();
            proximaReceita();
          }}
        >
          <Ionicons name="heart" size={40} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTexto: {
    marginTop: 15,
    fontSize: 18,
    color: '#23374C',
    fontWeight: 'bold',
  },
  subTexto: {
    marginTop: 5,
    color: '#888',
  },
  cardGigante: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: '#FFF',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
  },
  imagemReceita: {
    width: '100%',
    flex: 1,
  },
  etiquetaCategoria: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF7F24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  textoEtiqueta: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoReceita: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  tituloReceita: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 10,
  },
  tagsArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoTag: {
    marginLeft: 5,
    color: '#666',
    fontSize: 15,
  },
  bolinha: {
    marginHorizontal: 10,
    color: '#CCC',
  },
  botaoCirculo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bordaVermelha: {
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  bordaVerde: {
    borderWidth: 2,
    borderColor: '#34C759',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 40,
  },
  botaoRecarregar: {
    marginTop: 20,
    backgroundColor: '#FF7F24',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  textoBotaoRecarregar: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
