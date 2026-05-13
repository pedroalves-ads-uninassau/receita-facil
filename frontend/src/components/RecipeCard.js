import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function RecipeCard({ recipe, onPress, variant = 'compact' }) {
  const imageUrl = recipe.imagens && recipe.imagens.length > 0 
    ? recipe.imagens[0] 
    : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400';

  return (
    <TouchableOpacity 
      style={[styles.card, variant === 'compact' ? styles.compact : styles.full]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{recipe.titulo}</Text>
        
        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={14} color={colors.primary} style={{marginRight: 4}} />
            <Text style={styles.timeText}>{recipe.tempoPreparo} min</Text>
          </View>
          
          <Text style={styles.author} numberOfLines={1}>Por {recipe.autorNome || 'Chef'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
  },
  compact: {
    flexDirection: 'row',
    height: 100,
  },
  full: {
    height: 250,
  },
  image: {
    width: 100,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '600'
  },
  author: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700'
  }
});
