import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function RecipeCard({ recipe, onPress, showRemove, onRemove }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: recipe.image }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>{recipe.title}</Text>
        <Text style={styles.cardAuthor}>por {recipe.author}</Text>
        
        <View style={styles.recipeMeta}>
          {recipe.rating && (
            <View style={styles.metaBadge}>
              <Ionicons name="star" size={12} color={colors.secondary} />
              <Text style={styles.metaTextRating}>{recipe.rating}</Text>
            </View>
          )}
          <View style={[styles.metaBadge, recipe.rating && {marginLeft: 8}]}>
            <Ionicons name="time-outline" size={12} color={colors.textLight} />
            <Text style={styles.metaText}>{recipe.time}</Text>
          </View>
        </View>
      </View>

      {showRemove && (
        <TouchableOpacity style={styles.removeBtn} activeOpacity={0.5} onPress={onRemove}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    backgroundColor: colors.white, 
    borderRadius: 16, 
    marginBottom: 16, 
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.border
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  cardImage: { 
    width: '100%',
    height: '100%',
  },
  cardInfo: { 
    flex: 1,
    padding: 12, 
    justifyContent: 'center' 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: colors.text,
    marginBottom: 4
  },
  cardAuthor: { 
    fontSize: 13, 
    color: colors.primary,
    marginBottom: 8
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaTextRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
    marginLeft: 4,
  },
  removeBtn: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
