import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const { search, loading } = useRecipes();

  // Efeito para busca em tempo real com debounce simples
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        const data = await search(searchQuery);
        setResults(data);
      } else if (searchQuery.length === 0) {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="O que vamos cozinhar hoje?..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loading && <ActivityIndicator size="small" color={colors.primary} />}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item} 
            onPress={() => goToDetail(item)}
            variant="compact"
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name={searchQuery.length > 0 ? "search-outline" : "restaurant-outline"} size={50} color={colors.border} />
            <Text style={styles.emptyText}>
              {searchQuery.length > 0 ? "Nenhuma receita encontrada." : "Procure por ingredientes ou pratos!"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchHeader: { 
    padding: 20, 
    paddingTop: 50,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 16, color: colors.text },
  list: { padding: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, color: colors.gray, fontSize: 16 }
});
