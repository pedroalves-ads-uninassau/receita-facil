import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen({ navigation }) {
  const { favorites, loading, loadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  if (loading && favorites.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.idReceita.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadFavorites} />
        }
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item.receita} 
            onPress={() => goToDetail(item.receita)}
            variant="compact"
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={80} color={colors.border} />
            <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
            <Text style={styles.emptyText}>Favorite receitas no Swipe para salvá-las aqui.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: 'center', alignItems: 'center' },
  list: { padding: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 120, padding: 40 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 10, color: colors.gray, fontSize: 16 }
});
