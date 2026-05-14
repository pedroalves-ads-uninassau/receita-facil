import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RECIPES_MOCK } from '../mocks/recipes';
import RecipeCard from '../components/RecipeCard'; // Componente reutilizável!

const CATEGORIES = [
  { id: '1', name: 'Massas', icon: 'pizza-outline', color: colors.secondary },
  { id: '2', name: 'Saudável', icon: 'leaf-outline', color: colors.success },
  { id: '3', name: 'Lanches', icon: 'fast-food-outline', color: colors.primary },
  { id: '4', name: 'Doces', icon: 'ice-cream-outline', color: colors.text },
];

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de navegação para tela de detalhe passando a receita
  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho da Busca Focado em Receitas */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Qual receita você deseja hoje?..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {searchQuery.length > 0 && (
          <View style={styles.searchDropdown}>
            <Text style={styles.searchTitle}>Sugestões de pratos</Text>
            <TouchableOpacity style={styles.searchItemRow} onPress={() => goToDetail(RECIPES_MOCK[1])}>
              <Ionicons name="restaurant-outline" size={16} color={colors.textLight} />
              <Text style={styles.searchItemText}>{searchQuery} de forno</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemRow} onPress={() => goToDetail(RECIPES_MOCK[0])}>
              <Ionicons name="restaurant-outline" size={16} color={colors.textLight} />
              <Text style={styles.searchItemText}>{searchQuery} caseiro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>Receitas de Inverno</Text>
            <Text style={styles.promoSubtitle}>Descubra pratos quentes</Text>
          </View>
          <Ionicons name="snow-outline" size={40} color={colors.white} opacity={0.8} />
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={[styles.categoryIconBg, { backgroundColor: cat.color }]}>
                <Ionicons name={cat.icon} size={28} color={colors.white} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Em Alta</Text>
        <View style={styles.suggestionsContainer}>
          {/* USANDO O COMPONENTE REUTILIZÁVEL E PASSANDO O PARÂMETRO DA NAVEGAÇÃO! */}
          {RECIPES_MOCK.map(item => (
            <RecipeCard 
              key={item.id} 
              recipe={item} 
              onPress={() => goToDetail(item)} 
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background
  },
  searchHeader: { 
    padding: 20, 
    paddingTop: 50,
    backgroundColor: colors.white, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    zIndex: 10,
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: { 
    flex: 1,
    paddingVertical: 14, 
    fontSize: 16,
    color: colors.text
  },
  searchDropdown: { 
    backgroundColor: colors.white, 
    marginTop: 12, 
    borderRadius: 12, 
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchTitle: { 
    fontWeight: 'bold', 
    color: colors.text, 
    marginBottom: 12,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  searchItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  searchItemText: { 
    color: '#666',
    fontSize: 16,
    marginLeft: 10
  },
  content: { 
    padding: 20 
  },
  promoBanner: {
    backgroundColor: colors.text, 
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  promoTitle: {
    color: colors.secondary, 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoSubtitle: {
    color: colors.white,
    fontSize: 14,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: colors.text, 
    marginBottom: 16 
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryCard: { 
    alignItems: 'center', 
    marginRight: 20,
  },
  categoryIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
  },
  categoryName: { 
    fontWeight: '600', 
    color: colors.text,
    fontSize: 14
  },
  suggestionsContainer: {
    paddingBottom: 40,
  }
});
