import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RECIPES_MOCK } from '../mocks/recipes';
import RecipeCard from '../components/RecipeCard'; // Usando o componente global

export default function FavoritesScreen({ navigation }) {
  
  // Supondo que o usuário tenha favoritado as duas primeiras
  const FAVORITES = [RECIPES_MOCK[1], RECIPES_MOCK[0]];

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const removeFavorite = (recipeTitle) => {
    alert(`Removeu ${recipeTitle} dos favoritos! (Simulação)`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="heart" size={28} color={colors.danger} />
        <Text style={styles.title}>Meus Favoritos</Text>
      </View>
      <Text style={styles.subtitle}>Sua biblioteca de pratos perfeitos.</Text>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {FAVORITES.map(item => (
          <RecipeCard 
            key={item.id} 
            recipe={item} 
            onPress={() => goToDetail(item)}
            showRemove={true}
            onRemove={() => removeFavorite(item.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    marginBottom: 5,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: colors.text,
    marginLeft: 10,
  },
  subtitle: { 
    fontSize: 16, 
    color: colors.textLight, 
    paddingHorizontal: 24,
    marginBottom: 20, 
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  }
});
