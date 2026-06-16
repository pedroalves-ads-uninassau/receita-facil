import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { buscarReceitaPorId, criarAvaliacao, favoritarReceita, desfavoritarReceita, listarAvaliacoesPorReceita, Receita, Avaliacao } from '../services/api';

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { receitaId } = route.params;
  
  const [receita, setReceita] = useState<Receita | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [notaUsuario, setNotaUsuario] = useState(0);
  const [comentario, setComentario] = useState('');
  const [favoritado, setFavoritado] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    carregarUsuario();
    carregarReceitaEAvaliacoes();
  }, [receitaId]);

  const carregarUsuario = async () => {
    const uStr = await AsyncStorage.getItem('usuarioId');
    if (uStr) setUsuarioId(parseInt(uStr));
  };

  const carregarReceitaEAvaliacoes = async () => {
    setCarregando(true);
    const dados = await buscarReceitaPorId(receitaId);
    if (dados) {
      setReceita(dados);
      const avaliacoesData = await listarAvaliacoesPorReceita(receitaId);
      setAvaliacoes(avaliacoesData);
    } else {
      Alert.alert('Erro', 'Não foi possível carregar a receita.');
      navigation.goBack();
    }
    setCarregando(false);
  };

  const handleSalvarAvaliacao = async () => {
    if (!receita?.id) return;
    if (!usuarioId) {
      Alert.alert('Erro', 'Você precisa estar logado para avaliar.');
      return;
    }
    
    const response = await criarAvaliacao({
      usuarioId: usuarioId,
      receitaId: receita.id,
      nota: notaUsuario,
      comentario: comentario
    });

    if (response) {
      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
      setNotaUsuario(0);
      setComentario('');
      const atualizadas = await listarAvaliacoesPorReceita(receita.id);
      setAvaliacoes(atualizadas);
    } else {
      Alert.alert('Erro', 'Falha ao enviar avaliação.');
    }
  };

  const toggleFavorito = async () => {
    if (!receita?.id) return;
    if (!usuarioId) {
      Alert.alert('Atenção', 'Faça login para favoritar.');
      return;
    }

    if (favoritado) {
      const sucesso = await desfavoritarReceita(usuarioId, receita.id);
      if (sucesso) setFavoritado(false);
    } else {
      const sucesso = await favoritarReceita(usuarioId, receita.id);
      if (sucesso) setFavoritado(true);
    }
  };

  if (carregando || !receita) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
      </View>
    );
  }

  const imageUrl = receita.imagens && receita.imagens.length > 0 
    ? receita.imagens[0].url 
    : 'https://images.unsplash.com/photo-1528207776546-365bb710ee93';

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.imagemReceita} 
          />
          
          <TouchableOpacity style={styles.botaoVoltarTopo} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#23374C" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoFavoritar} 
            onPress={toggleFavorito}
          >
            <Ionicons 
              name={favoritado ? "heart" : "heart-outline"} 
              size={24} 
              color={favoritado ? "#E33E3E" : "#23374C"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.titulo}>{receita.titulo}</Text>
          
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={20} color="#FF7F24" />
            <Text style={styles.tempoTexto}>{receita.tempoPreparo} minutos</Text>
          </View>

          <View style={styles.divisor} />

          <Text style={styles.subtitulo}>Ingredientes</Text>
          <Text style={styles.textoCorpo}>{receita.ingredientes}</Text>

          <View style={styles.divisor} />

          <Text style={styles.subtitulo}>Modo de Preparo</Text>
          <Text style={styles.textoCorpo}>{receita.passoAPasso}</Text>

          <View style={styles.divisor} />

          <Text style={styles.subtitulo}>Avalie esta Receita</Text>
          
          <View style={styles.estrelasRow}>
            {[1, 2, 3, 4, 5].map((estrela) => (
              <TouchableOpacity key={estrela} onPress={() => setNotaUsuario(estrela)}>
                <Ionicons 
                  name={estrela <= notaUsuario ? "star" : "star-outline"} 
                  size={32} 
                  color="#FF7F24" 
                  style={{ marginRight: 8 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.inputComentario}
            placeholder="Deixe uma opinião sobre o prato (opcional)..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={comentario}
            onChangeText={setComentario}
          />

          <TouchableOpacity 
            style={[styles.botao, notaUsuario === 0 && styles.botaoDesabilitado]} 
            onPress={handleSalvarAvaliacao}
            disabled={notaUsuario === 0}
          >
            <Text style={styles.textoBotao}>Enviar Avaliação</Text>
          </TouchableOpacity>

          <View style={styles.divisor} />
          
          <Text style={styles.subtitulo}>Avaliações da Comunidade ({avaliacoes.length})</Text>
          {avaliacoes.length === 0 ? (
            <Text style={styles.textoCorpo}>Seja o primeiro a avaliar esta receita!</Text>
          ) : (
            avaliacoes.map((av, index) => (
              <View key={av.id || index} style={styles.cardAvaliacao}>
                <View style={styles.estrelasCard}>
                  {[1, 2, 3, 4, 5].map((e) => (
                    <Ionicons 
                      key={e} 
                      name={e <= av.nota ? "star" : "star-outline"} 
                      size={14} 
                      color="#FF7F24" 
                    />
                  ))}
                </View>
                {av.comentario ? (
                  <Text style={styles.textoComentario}>{av.comentario}</Text>
                ) : null}
              </View>
            ))
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  imageContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
  },
  imagemReceita: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  botaoVoltarTopo: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  botaoFavoritar: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    padding: 25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFF8E7',
    marginTop: -20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempoTexto: {
    marginLeft: 6,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: '#E6DCC3',
    marginVertical: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 10,
  },
  textoCorpo: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  estrelasRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  inputComentario: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6DCC3',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    color: '#23374C',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#CCC',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardAvaliacao: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6DCC3',
  },
  estrelasCard: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  textoComentario: {
    fontSize: 14,
    color: '#444',
  }
});
