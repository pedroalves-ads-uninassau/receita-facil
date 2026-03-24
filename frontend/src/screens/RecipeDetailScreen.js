import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params; 

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        
        <View style={styles.imageHeader}>
          <Image 
            source={{ uri: recipe.image }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.badgeCategory}>
            <Text style={styles.badgeText}>{recipe.category}</Text>
          </View>
          
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.author}>por {recipe.author}</Text>
          
          <View style={styles.infoRow}>
            <div style={styles.infoBox}>
              <Ionicons name="time-outline" size={22} color={colors.primary} />
              <Text style={styles.infoText}>{recipe.time}</Text>
            </div>
            <div style={styles.infoBox}>
              <Ionicons name="flame-outline" size={22} color={colors.danger} />
              <Text style={styles.infoText}>{recipe.calories}</Text>
            </div>
            <div style={styles.infoBox}>
              <Ionicons name="star" size={22} color={colors.secondary} />
              <Text style={styles.infoText}>{recipe.rating} Aval.</Text>
            </div>
          </View>

          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <View style={styles.listContainer}>
            {recipe.ingredients.map((ing, idx) => (
              <Text key={idx} style={styles.listItem}>• {ing}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Modo de Preparo</Text>
          {recipe.steps.map((step, idx) => (
            <View key={idx} style={styles.stepBox}>
              <Text style={styles.stepNum}>{idx + 1}</Text>
              <Text style={styles.paragraph}>{step}</Text>
            </View>
          ))}
          
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.mainBtn} activeOpacity={0.8}>
          <Ionicons name="play-circle-outline" size={24} color={colors.white} />
          <Text style={styles.mainBtnText}>Cozinhar Agora</Text>
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
    color: colors.textLight,
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
  },
  infoBox: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 6,
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
    textAlignVertical: 'center',
    lineHeight: 30,
    borderRadius: 15,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 12,
    marginTop: 2,
  },
  paragraph: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
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
  }
});
