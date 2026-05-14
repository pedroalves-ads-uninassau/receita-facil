import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RECIPES_MOCK } from '../mocks/recipes';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const handleSwipe = (direction) => {
    if (currentIndex < RECIPES_MOCK.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('Você chegou ao fim das receitas de hoje!');
    }
  };

  const recipe = RECIPES_MOCK[currentIndex];

  if (!recipe) {
    return (
      <View style={[styles.container, styles.center]}>
         <Ionicons name="restaurant-outline" size={60} color={colors.primary} style={{marginBottom: 20}} />
         <Text style={styles.noMoreText}>Isso é tudo!</Text>
         <Text style={styles.noMoreSub}>Volte mais tarde para novas descobertas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.swipeHeader}>
        <View style={styles.activeTab}>
          <Ionicons name="flame" size={20} color={colors.primary} />
          <Text style={styles.activeTabText}>Para Você</Text>
        </View>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>Seguindo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.cardContainer} 
        activeOpacity={0.9} 
        onPress={() => goToDetail(recipe)} 
      >
         <View style={styles.cardImageContainer}>
            <Image 
              source={{ uri: recipe.image }} 
              style={styles.cardImage}
              resizeMode="cover"
            />
            
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{recipe.category}</Text>
            </View>
         </View>

         <View style={styles.cardInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{recipe.title}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color={colors.secondary} />
                <Text style={styles.ratingText}>{recipe.rating}</Text>
              </View>
            </View>
            
            <View style={styles.authorRow}>
              <View style={styles.authorAvatar}>
                <Ionicons name="person" size={12} color={colors.white} />
              </View>
              <Text style={styles.cardAuthor}>{recipe.author}</Text>
              <Text style={styles.dot}>•</Text>
              <Ionicons name="time-outline" size={16} color={colors.textLight} style={{marginRight: 4}} />
              <Text style={styles.cardTime}>{recipe.time}</Text>
            </View>
         </View>
      </TouchableOpacity>
      
      <View style={styles.actions}>
         <TouchableOpacity 
           style={[styles.actionButton, styles.buttonDislike]} 
           onPress={() => handleSwipe('left')}
           activeOpacity={0.7}
         >
            <Ionicons name="close" size={32} color={colors.danger} />
         </TouchableOpacity>

         <TouchableOpacity 
           style={[styles.actionButton, styles.buttonLike]} 
           onPress={() => handleSwipe('right')}
           activeOpacity={0.7}
         >
            <Ionicons name="heart" size={32} color={colors.success} />
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    alignItems: 'center', 
    paddingTop: 20,
  },
  center: { 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 30
  },
  swipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 4,
    width: '70%',
  },
  activeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 6,
  },
  inactiveTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  noMoreText: { 
    fontSize: 24, 
    color: colors.text, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  noMoreSub: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center'
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.58,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
  },
  cardImageContainer: { 
    flex: 4, 
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
  },
  categoryBadgeText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  cardInfo: { 
    padding: 24, 
    backgroundColor: colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: { 
    flex: 1,
    fontSize: 26, 
    fontWeight: '900', 
    color: colors.text, 
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 4,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cardAuthor: { 
    fontSize: 14, 
    color: colors.text,
    fontWeight: '700',
  },
  dot: {
    color: colors.border,
    marginHorizontal: 8,
    fontSize: 18,
  },
  cardTime: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '100%',
    gap: 40
  },
  actionButton: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonDislike: { 
    borderWidth: 2,
    borderColor: colors.danger 
  },
  buttonLike: { 
    borderWidth: 2,
    borderColor: colors.success 
  },
});
