import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { avaliacaoService } from '../services/avaliacaoService';
import { AuthContext } from '../contexts/AuthContext';

function parseLines(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params || {};
  const { user } = useContext(AuthContext);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacaoLoading, setAvaliacaoLoading] = useState(false);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  const mediaNota = useMemo(() => {
    if (avaliacoes.length === 0) return null;
    const total = avaliacoes.reduce((acc, item) => acc + (item.nota || 0), 0);
    return (total / avaliacoes.length).toFixed(1);
  }, [avaliacoes]);

  const carregarAvaliacoes = async () => {
    if (!recipe?.id) return;
    setAvaliacaoLoading(true);
    try {
      const data = await avaliacaoService.listarPorReceita(recipe.id);
      setAvaliacoes(data);
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
    } finally {
      setAvaliacaoLoading(false);
    }
  };

  const enviarAvaliacao = async () => {
    if (!user?.id || !recipe?.id) {
      Alert.alert('Erro', 'Usuário ou receita inválidos.');
      return;
    }
    try {
      await avaliacaoService.avaliar({
        usuarioId: user.id,
        receitaId: recipe.id,
        nota,
        comentario: comentario.trim(),
      });
      setComentario('');
      await carregarAvaliacoes();
      Alert.alert('Sucesso', 'Avaliação enviada.');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Não foi possível salvar sua avaliação.';
      Alert.alert('Erro', msg);
    }
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, [recipe?.id]);

  if (!recipe) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.muted}>Receita não encontrada.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageUri =
    recipe.imagens && recipe.imagens.length > 0
      ? recipe.imagens[0]
      : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800';
  const category =
    recipe.categorias && recipe.categorias.length > 0 ? recipe.categorias[0] : 'Receita';
  const ingredientLines = parseLines(recipe.ingredientes);
  const passoLines = parseLines(recipe.passoAPasso);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imageHeader}>
          <Image source={{ uri: imageUri }} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.badgeCategory}>
            <Text style={styles.badgeText}>{category}</Text>
          </View>

          <Text style={styles.title}>{recipe.titulo}</Text>
          <Text style={styles.author}>por {recipe.autorNome || 'Chef'}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons name="time-outline" size={22} color={colors.primary} />
              <Text style={styles.infoText}>{recipe.tempoPreparo ?? '—'} min</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="star" size={22} color={colors.accent} />
              <Text style={styles.infoText} numberOfLines={1}>
                {mediaNota ? `${mediaNota} / 5` : 'Sem nota'}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <View style={styles.listContainer}>
            {ingredientLines.length > 0 ? (
              ingredientLines.map((ing, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {ing}
                </Text>
              ))
            ) : (
              <Text style={styles.listItem}>{recipe.ingredientes || '—'}</Text>
            )}
          </View>

          <Text style={styles.sectionTitle}>Modo de preparo</Text>
          {passoLines.length > 0 ? (
            passoLines.map((step, idx) => (
              <View key={idx} style={styles.stepBox}>
                <Text style={styles.stepNum}>{idx + 1}</Text>
                <Text style={styles.paragraph}>{step}</Text>
              </View>
            ))
          ) : (
            <View style={styles.listContainer}>
              <Text style={styles.paragraph}>{recipe.passoAPasso || '—'}</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Avaliações</Text>
          <View style={styles.listContainer}>
            <Text style={styles.mutedSmall}>
              {avaliacoes.length > 0
                ? `${avaliacoes.length} avaliação(ões)${mediaNota ? ` • média ${mediaNota}` : ''}`
                : 'Ainda não há avaliações para esta receita.'}
            </Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setNota(star)}>
                  <Ionicons
                    name={star <= nota ? 'star' : 'star-outline'}
                    size={24}
                    color={star <= nota ? colors.accent : colors.gray}
                    style={{ marginRight: 6 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              value={comentario}
              onChangeText={setComentario}
              placeholder="Comente sua experiência (opcional)"
              style={styles.commentInput}
              multiline
            />
            <TouchableOpacity style={styles.rateBtn} onPress={enviarAvaliacao}>
              <Text style={styles.rateBtnText}>Enviar avaliação</Text>
            </TouchableOpacity>

            {avaliacaoLoading ? (
              <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} />
            ) : (
              avaliacoes.slice(0, 5).map((item) => (
                <View key={item.id} style={styles.reviewItem}>
                  <Text style={styles.reviewName}>{item.usuarioNome}</Text>
                  <Text style={styles.reviewMeta}>Nota: {item.nota}/5</Text>
                  {!!item.comentario && <Text style={styles.reviewComment}>{item.comentario}</Text>}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.mainBtn} activeOpacity={0.8}>
          <Ionicons name="play-circle-outline" size={24} color={colors.white} />
          <Text style={styles.mainBtnText}>Cozinhar agora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <Ionicons name="heart-outline" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  muted: {
    color: colors.gray,
    fontSize: 16,
    marginBottom: 16,
  },
  backLink: {
    padding: 12,
  },
  backLinkText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  imageHeader: {
    height: 300,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    padding: 24,
  },
  badgeCategory: {
    alignSelf: 'flex-start',
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 6,
  },
  author: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 24,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 6,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  listContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  stepBox: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 12,
    marginTop: 2,
    overflow: 'hidden',
  },
  paragraph: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  mutedSmall: {
    color: colors.gray,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  },
  rateBtn: {
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 12,
  },
  rateBtnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  reviewItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    marginTop: 8,
  },
  reviewName: {
    fontWeight: 'bold',
    color: colors.text,
  },
  reviewMeta: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  reviewComment: {
    color: colors.text,
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#EEE',
    elevation: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  mainBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 16,
  },
  mainBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  saveBtn: {
    width: 56,
    height: 56,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
