import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  // Controle de nível de acesso (Estudante/Chef)
  const [isChef, setIsChef] = useState(false);

  const handleLogout = () => {
    navigation.getParent().replace('Login');
  };

  const toggleChefMode = () => {
    setIsChef(true);
    alert('Parabéns! Seu perfil agora é de Chef. O menu de receitas foi liberado.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: isChef ? colors.primary : colors.text }]}>
            <Ionicons name={isChef ? "restaurant" : "person"} size={50} color={colors.white} />
          </View>
          
          <Text style={styles.name}>{isChef ? "Chef Pedro" : "Pedro Alves"}</Text>
          <Text style={styles.email}>pedro@escola.com</Text>
          
          <View style={[styles.badge, { backgroundColor: isChef ? colors.secondary : colors.border }]}>
            <Ionicons name={isChef ? "star" : "person-outline"} size={12} color={isChef ? colors.text : colors.textLight} />
            <Text style={[styles.badgeText, { color: isChef ? colors.text : colors.textLight }]}>
              {isChef ? "Chef" : "Perfil"}
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Minhas Informações</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="create-outline" size={22} color={colors.text} /></View>
            <Text style={styles.menuText}>Editar Perfil e Foto</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {isChef ? (
            <>
              <TouchableOpacity 
                style={[styles.menuItem, { borderBottomWidth: 1, borderColor: colors.border }]}
                onPress={() => navigation.navigate('AddRecipe')}
              >
                <View style={[styles.menuIconBox, { backgroundColor: colors.success }]}><Ionicons name="add-circle-outline" size={22} color={colors.white} /></View>
                <Text style={[styles.menuText, { color: colors.success, fontWeight: 'bold' }]}>Publicar Nova Receita</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconBox, { backgroundColor: '#FFF0E0' }]}><Ionicons name="restaurant-outline" size={22} color={colors.primary} /></View>
                <Text style={styles.menuText}>Minhas Receitas Publicadas</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.menuItem} onPress={toggleChefMode} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#FFF0E0' }]}><Ionicons name="star-outline" size={22} color={colors.primary} /></View>
              <Text style={[styles.menuText, { color: colors.primary, fontWeight: 'bold' }]}>Virar Chef (Postar receitas)</Text>
              <Ionicons name="arrow-up-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="settings-outline" size={22} color={colors.text} /></View>
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={22} color={colors.white} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContainer: { padding: 24, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, borderWidth: 3, borderColor: colors.white },
  name: { fontSize: 26, fontWeight: '900', color: colors.text, marginBottom: 4 },
  email: { fontSize: 16, color: colors.textLight, marginBottom: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontWeight: 'bold', fontSize: 14, marginLeft: 6 },
  menuContainer: { backgroundColor: colors.white, borderRadius: 24, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, marginBottom: 40, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 20, marginLeft: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuText: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
  logoutButton: { flexDirection: 'row', backgroundColor: colors.danger, borderRadius: 12, paddingVertical: 16, justifyContent: 'center', alignItems: 'center', elevation: 3, shadowColor: colors.danger, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
  logoutText: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});
