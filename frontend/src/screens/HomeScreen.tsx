import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { getReceitas } from '../services/api';

interface Receita {
  id?: number;
  titulo: string;
  image?: string;
  categoria?: string;
  tempo_preparo?: number;
  usuario_id?: number;
}
const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);

  // Busca no backend quando a tela abre
  useEffect(() => {
    carregarDoBanco();
  }, []);

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

  // Função que passa para a próxima receita quando clica nos botões (X ou Coração)
  function proximaReceita() {
    if (indiceAtual < receitas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      alert('Fim da linha! Você já viu todas as receitas de hoje.');
    }
  }

  function verDetalhes() {
    navigation.navigate('RecipeDetail');
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
        <Text style={styles.loadingTexto}>Procurando pratos incríveis...</Text>
      </View>
    );
  }

  // Pega a receita atual baseada no índice numérico
  const receitaAtiva = receitas[indiceAtual];

  if (!receitaAtiva) {
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
      {/* Card Gigante (Estilo Swipe) */}
<Swiper
  cards={receitas}
  cardIndex={indiceAtual}
  renderCard={(receita: Receita) => {
    if (!receita) return null;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardGigante}
        onPress={verDetalhes}
      >
        <Image
          source={{
            uri:
              receita.image ||
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.imagemReceita}
        />

        {/* Etiqueta flutuante de categoria */}
        <View style={styles.etiquetaCategoria}>
          <Text style={styles.textoEtiqueta}>
            {receita.categoria || 'Geral'}
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
                {receita.tempo_preparo || 15} min
              </Text>
            </View>

            <Text style={styles.bolinha}>•</Text>

            <View style={styles.tag}>
              <Ionicons name="person-outline" size={18} color="#666" />
              <Text style={styles.textoTag}>
                Chef {receita.usuario_id || 1}
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

      {/* Botões do "Tinder" de Receitas */}
        <View
         style ={[
           styles.actions,
         { marginBottom: insets.bottom + 10 }
           ]}
        >   
        <TouchableOpacity style={[styles.botaoCirculo, styles.bordaVermelha]} onPress={proximaReceita}>
          <Ionicons name="close" size={40} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoCirculo, styles.bordaVerde]} onPress={proximaReceita}>
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
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuAbas: {
    flexDirection: 'row',
    backgroundColor: '#EBE2CD',
    borderRadius: 25,
    padding: 5,
    width: '60%',
    alignItems: 'center',
  },
  abaAtiva: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 2,
  },
  textoAbaAtiva: {
    fontWeight: 'bold',
    color: '#23374C',
    marginLeft: 5,
  },
  textoAbaInativa: {
    color: '#888',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  cardGigante: {
    width: width * 0.9,
    height: height * 0.6, // Ocupa quase a tela toda
    backgroundColor: '#FFF',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8, // Sombra grande
  },
  imagemReceita: {
    width: '100%',
    flex: 1, // Preenche todo o espaço sobrando
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
  areaBotoes: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
    gap: 40, // Espaço entre os botões
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
});
