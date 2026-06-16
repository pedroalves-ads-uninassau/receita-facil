import React, { useState } from 'react';
import { View,  Text,  StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

export default function ProfileScreen({ navigation }: Props) {
  // Estado com os dados do usuário (Simulando vindo da tabela Usuario do MySQL)
  const [usuario, setUsuario] = useState({
    nome: 'Allan Silva',
    email: 'allan@uninassau.edu.br',
    bio: 'Chef apaixonado por culinária regional e receitas práticas.',
    isChef: true, // Se for true, libera edição e listagem das próprias receitas
  });

  // Estado para controlar se o perfil está em modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(usuario.nome);
  const [bioEditada, setBioEditada] = useState(usuario.bio);

  // Simulando as receitas criadas por ESSE Chef (tabela Receita filtrada pelo id_usuario)
  const [minhasReceitas, setMinhasReceitas] = useState([
    {
      id: 101,
      titulo: 'Cuscuz Recheado de Frigideira',
      tempo_preparo: 10,
      imagem_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc',
    },
    {
      id: 102,
      titulo: 'Bolo de Rolo Prático',
      tempo_preparo: 40,
      imagem_url: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa',
    }
  ]);

  const handleSalvarPerfil = () => {
    setUsuario({
      ...usuario,
      nome: nomeEditado,
      bio: bioEditada
    });
    setIsEditing(false);
    // TODO: Enviar um PUT para o endpoint /usuarios/{id} no Spring Boot
    alert('Perfil atualizado com sucesso!');
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#23374C" />
        </TouchableOpacity>
        <Text style={styles.tituloTela}>Meu Perfil</Text>
      </View>

      {/* Lista Principal: O Header da lista renderiza o Perfil do usuário */}
      <FlatList
        data={usuario.isChef ? minhasReceitas : []}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        
        // Cabeçalho da Lista (Dados do Usuário + Formulário de Edição)
        ListHeaderComponent={
          <View>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }} 
                  style={styles.avatar} 
                />
                {usuario.isChef && (
                  <View style={styles.badgeChef}>
                    <Ionicons name="restaurant" size={14} color="#FFF" />
                  </View>
                )}
              </View>

              {/* Condicional: Modo de Edição vs Modo de Visualização */}
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
                  <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
                  <Text style={styles.emailUsuario}>{usuario.email}</Text>
                  <Text style={styles.bioUsuario}>{usuario.bio}</Text>
                  
                  <View style={styles.rowBadges}>
                    {usuario.isChef && (
                      <View style={styles.tagChefContainer}>
                        <Text style={styles.tagChefTexto}>Chef Criador</Text>
                      </View>
                    )}
                    
                    {/* Botão de Editar exclusivo para o Chef */}
                    {usuario.isChef && (
                      <TouchableOpacity style={styles.botaoEditar} onPress={() => setIsEditing(true)}>
                        <Ionicons name="create-outline" size={16} color="#FFF" />
                        <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>

            {/* Seção das Receitas Criadas (Apenas para o Chef) */}
            {usuario.isChef && (
              <Text style={styles.tituloSecao}>Minhas Receitas Publicadas</Text>
            )}
          </View>
        }

        // Renderização dos Cards de Receitas do Próprio Chef
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardReceita}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
          >
            <Image source={{ uri: item.imagem_url }} style={styles.imagemCard} />
            <View style={styles.infoCard}>
              <Text style={styles.tituloCard} numberOfLines={1}>{item.titulo}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={16} color="#FF7F24" />
                <Text style={styles.tempoTexto}>{item.tempo_preparo} min</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#23374C" />
          </TouchableOpacity>
        )}

        // Estado Vazio caso o Chef não tenha publicado nenhuma receita ainda
        ListEmptyComponent={
          usuario.isChef ? (
            <Text style={styles.textoSemReceitas}>Você ainda não publicou nenhuma receita.</Text>
          ) : null
        }

        // Rodapé da lista com o botão de sair da conta
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EEE',
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
