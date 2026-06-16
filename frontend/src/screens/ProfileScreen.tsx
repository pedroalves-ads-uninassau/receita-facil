import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { buscarPerfilPorUsuario, atualizarPerfil, atualizarUsuario, buscarReceitasPorUsuario, TipoUsuario, Perfil, Receita } from '../services/api';

export default function ProfileScreen({ navigation }: any) {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [minhasReceitas, setMinhasReceitas] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [bioEditada, setBioEditada] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setCarregando(true);
    let uId = usuarioId;
    if (!uId) {
      const uStr = await AsyncStorage.getItem('usuarioId');
      if (uStr) {
        uId = parseInt(uStr);
        setUsuarioId(uId);
      }
    }

    if (uId) {
      const perfilData = await buscarPerfilPorUsuario(uId);
      if (perfilData) {
        setPerfil(perfilData);
        setNomeEditado(perfilData.usuario?.nome || '');
        setBioEditada(perfilData.descricao || '');

        if (perfilData.usuario?.tipoUsuario === TipoUsuario.CHEF) {
          const receitas = await buscarReceitasPorUsuario(uId);
          setMinhasReceitas(receitas);
        }
      }
    }
    setCarregando(false);
  };

  const handleSalvarPerfil = async () => {
    if (!perfil || !perfil.usuario || !usuarioId) return;

    const sucessoUsuario = await atualizarUsuario(usuarioId, {
      ...perfil.usuario,
      nome: nomeEditado,
    });

    const sucessoPerfil = await atualizarPerfil(perfil.id!, {
      ...perfil,
      descricao: bioEditada,
    });

    if (sucessoUsuario && sucessoPerfil) {
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setPerfil(sucessoPerfil);
      setIsEditing(false);
    } else {
      Alert.alert('Erro', 'Falha ao atualizar o perfil.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioId');
    await AsyncStorage.removeItem('usuarioNome');
    await AsyncStorage.removeItem('usuarioEmail');
    await AsyncStorage.removeItem('usuarioTipo');
    navigation.replace('Login');
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
      </View>
    );
  }

  const isChef = perfil?.usuario?.tipoUsuario === TipoUsuario.CHEF;
  const iniciais = perfil?.usuario?.nome ? perfil.usuario.nome.substring(0, 2).toUpperCase() : 'US';

  return (
    <View style={styles.container}>
      {/* Removido o cabeçalho desnecessário com o botão de voltar */}

      <FlatList
        data={isChef ? minhasReceitas : []}
        keyExtractor={(item) => (item.id || Math.random()).toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarTexto}>{iniciais}</Text>
                </View>
                {isChef && (
                  <View style={styles.badgeChef}>
                    <Ionicons name="restaurant" size={14} color="#FFF" />
                  </View>
                )}
              </View>

              {isEditing ? (
                <View style={styles.formEdicao}>
                  <Text style={styles.labelInput}>Nome:</Text>
                  <TextInput
                    style={styles.input}
                    value={nomeEditado}
                    onChangeText={setNomeEditado}
                    placeholder="Digite seu nome"
                  />
                  <Text style={styles.labelInput}>Bio / Especialidade:</Text>
                  <TextInput
                    style={[styles.input, styles.inputBio]}
                    value={bioEditada}
                    onChangeText={setBioEditada}
                    multiline
                    placeholder="Fale um pouco sobre você"
                  />
                  <View style={styles.rowBotoes}>
                    <TouchableOpacity style={[styles.botaoAcao, styles.botaoCancelar]} onPress={() => setIsEditing(false)}>
                      <Text style={styles.textoBotaoAcao}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.botaoAcao, styles.botaoSalvar]} onPress={handleSalvarPerfil}>
                      <Text style={styles.textoBotaoAcao}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.infosUsuario}>
                  <Text style={styles.nomeUsuario}>{perfil?.usuario?.nome}</Text>
                  <Text style={styles.emailUsuario}>{perfil?.usuario?.email}</Text>
                  <Text style={styles.bioUsuario}>{perfil?.descricao}</Text>
                  
                  <View style={styles.rowBadges}>
                    {isChef && (
                      <View style={styles.tagChefContainer}>
                        <Text style={styles.tagChefTexto}>Chef Criador</Text>
                      </View>
                    )}
                    
                    {isChef && (
                      <TouchableOpacity style={styles.botaoEditar} onPress={() => setIsEditing(true)}>
                        <Ionicons name="create-outline" size={16} color="#FFF" />
                        <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>

            {isChef && (
              <Text style={styles.tituloSecao}>Minhas Receitas Publicadas</Text>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const imageUrl = item.imagens && item.imagens.length > 0 
            ? item.imagens[0].url 
            : 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc';

          return (
            <TouchableOpacity 
              style={styles.cardReceita}
              onPress={() => navigation.navigate('RecipeDetail', { receitaId: item.id })}
            >
              <Image source={{ uri: imageUrl }} style={styles.imagemCard} />
              <View style={styles.infoCard}>
                <Text style={styles.tituloCard} numberOfLines={1}>{item.titulo}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="time-outline" size={16} color="#FF7F24" />
                  <Text style={styles.tempoTexto}>{item.tempoPreparo} min</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#23374C" />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          isChef ? (
            <Text style={styles.textoSemReceitas}>Você ainda não publicou nenhuma receita.</Text>
          ) : null
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#E33E3E" />
            <Text style={styles.textoSair}>Sair do Aplicativo</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  tituloTela: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23374C',
    marginLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E6DCC3',
    elevation: 2,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#23374C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  badgeChef: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF7F24',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  infosUsuario: {
    alignItems: 'center',
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#23374C',
  },
  emailUsuario: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bioUsuario: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    lineHeight: 18,
  },
  rowBadges: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  tagChefContainer: {
    backgroundColor: '#FFF0E0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD1A9',
    marginRight: 10,
  },
  tagChefTexto: {
    color: '#FF7F24',
    fontSize: 12,
    fontWeight: '700',
  },
  botaoEditar: {
    flexDirection: 'row',
    backgroundColor: '#23374C',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotaoEditar: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  formEdicao: {
    width: '100%',
  },
  labelInput: {
    fontSize: 12,
    fontWeight: '700',
    color: '#23374C',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#FFF8E7',
    borderWidth: 1,
    borderColor: '#E6DCC3',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    color: '#23374C',
    marginBottom: 8,
  },
  inputBio: {
    height: 60,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  rowBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoAcao: {
    flex: 0.48,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#CCC',
  },
  botaoSalvar: {
    backgroundColor: '#FF7F24',
  },
  textoBotaoAcao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#23374C',
    marginTop: 20,
    marginBottom: 12,
  },
  cardReceita: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6DCC3',
  },
  imagemCard: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  infoCard: {
    flex: 1,
    marginLeft: 12,
  },
  tituloCard: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#23374C',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tempoTexto: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  textoSemReceitas: {
    color: '#888',
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },
  textoSair: {
    color: '#E33E3E',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  }
});
