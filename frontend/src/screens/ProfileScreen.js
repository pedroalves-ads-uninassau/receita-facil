import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const isChef = user?.tipo === 'CHEF' || user?.tipo === 'ADMIN';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: isChef ? colors.primary : colors.text }]}>
            <Ionicons name={isChef ? "restaurant" : "person"} size={50} color={colors.white} />
          </View>
          
          <Text style={styles.name}>{user?.nome || "Visitante"}</Text>
          <Text style={styles.email}>{user?.email || "email@exemplo.com"}</Text>
          
          <View style={[styles.badge, { backgroundColor: isChef ? colors.accent : colors.border }]}>
            <Ionicons name={isChef ? "star" : "person-outline"} size={12} color={colors.text} />
            <Text style={styles.badgeText}>
              {user?.tipo || "Comum"}
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Opções da Conta</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="create-outline" size={22} color={colors.text} /></View>
            <Text style={styles.menuText}>Editar Perfil e Foto</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          {isChef && (
            <>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => navigation.navigate('AddRecipe')}
              >
                <View style={[styles.menuIconBox, { backgroundColor: colors.success + '20' }]}><Ionicons name="add-circle-outline" size={22} color={colors.success} /></View>
                <Text style={[styles.menuText, { color: colors.success, fontWeight: 'bold' }]}>Publicar Nova Receita</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconBox, { backgroundColor: colors.accent + '20' }]}><Ionicons name="restaurant-outline" size={22} color={colors.primary} /></View>
                <Text style={styles.menuText}>Minhas Receitas Publicadas</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            </>
          )}

          {!isChef && (
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Solicitação', 'Sua solicitação para ser Chef foi enviada!')}>
              <View style={[styles.menuIconBox, { backgroundColor: '#FFF0E0' }]}><Ionicons name="star-outline" size={22} color={colors.primary} /></View>
              <Text style={[styles.menuText, { color: colors.primary, fontWeight: 'bold' }]}>Quero ser Chef</Text>
              <Ionicons name="arrow-up-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="settings-outline" size={22} color={colors.text} /></View>
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.white} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
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
  email: { fontSize: 16, color: colors.gray, marginBottom: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontWeight: 'bold', fontSize: 14, color: colors.text, marginLeft: 6 },
  menuContainer: { backgroundColor: colors.white, borderRadius: 24, padding: 20, elevation: 2, marginBottom: 40, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 20, marginLeft: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  menuIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuText: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
  logoutButton: { flexDirection: 'row', backgroundColor: colors.danger, borderRadius: 12, paddingVertical: 16, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: colors.white, fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});
