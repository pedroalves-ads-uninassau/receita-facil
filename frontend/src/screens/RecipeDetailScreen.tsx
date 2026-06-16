import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  route: any;
  navigation: any;
};

export default function RecipeDetailScreen({ route, navigation }: Props) {
  // Simulando os dados que virão da rota ou da API do Spring Boot
  const receita = {
    id: 1,
    titulo: 'Panqueca Americana',
    tempo_preparo: 15,
    ingredientes: '• 1 xícara de farinha de trigo\n• 2 colheres de sopa de açúcar\n• 2 colheres de chá de fermento\n• 1 ovo\n• 1 xícara de leite',
    passo_a_passo: '1. Misture os ingredientes secos em uma tigela.\n2. Adicione o ovo e o leite, batendo até ficar homogêneo.\n3. Aqueça uma frigideira antiaderente e coloque porções da massa.\n4. Vire quando surgirem bolhas.',
    imagem_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93'
  };

  // Estados para o formulário de avaliação do usuário e favoritos
  const [notaUsuario, setNotaUsuario] = useState(0);
  const [comentario, setComentario] = useState('');
  const [favoritado, setFavoritado] = useState(false);

  const handleSalvarAvaliacao = () => {
    // TODO: Integrar com o POST de /avaliacoes do seu Backend em Spring Boot
    alert(`Avaliação enviada com sucesso!\nNota: ${notaUsuario}\nComentário: ${comentario || "Nenhum"}`);
    setNotaUsuario(0);
    setComentario('');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Seção da Imagem da Receita */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: receita.imagem_url }} 
            style={styles.imagemReceita} 
          />
          
          {/* Botão Voltar Reaproveitado do seu código */}
          <TouchableOpacity style={styles.botaoVoltarTopo} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#23374C" />
          </TouchableOpacity>

          {/* Botão de Favoritar (Alimenta a tabela ReceitasFavoritas) */}
          <TouchableOpacity 
            style={styles.botaoFavoritar} 
            onPress={() => setFavoritado(!favoritado)}
          >
            <Ionicons 
              name={favoritado ? "heart" : "heart-outline"} 
              size={24} 
              color={favoritado ? "#E33E3E" : "#23374C"} 
            />
          </TouchableOpacity>
        </View>

        {/* Informações da Receita */}
        <View style={styles.content}>
          <Text style={styles.titulo}>{receita.titulo}</Text>
          
          {/* Campo tempo_preparo do banco de dados */}
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={20} color="#FF7F24" />
            <Text style={styles.tempoTexto}>{receita.tempo_preparo} minutos</Text>
          </View>

          <View style={styles.divisor} />

          {/* Lista de Ingredientes */}
          <Text style={styles.subtitulo}>Ingredientes</Text>
          <Text style={styles.textoCorpo}>{receita.ingredientes}</Text>

          <View style={styles.divisor} />

          {/* Passo a Passo / Modo de Preparo */}
          <Text style={styles.subtitulo}>Modo de Preparo</Text>
          <Text style={styles.textoCorpo}>{receita.passo_a_passo}</Text>

          <View style={styles.divisor} />

          {/* Formulário de Avaliação (Requisito: Nota de 1 a 5) */}
          <Text style={styles.subtitulo}>Avalie esta Receita</Text>
          
          {/* Estrelas Selecionáveis */}
          <View style={styles.estrelasRow}>
            {[1, 2, 3, 4, 5].map((estrela) => (
              <TouchableOpacity key={estrela} onPress={() => setNotaUsuario(estrela)}>
                <Ionicons 
                  name={estrela <= notaUsuario ? "star" : "star-outline"} 
                  size={32} 
                  color="#FF7F24" 
                  style={{ marginRight: 8 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comentário Opcional (Campo TEXT do MySQL) */}
          <TextInput
            style={styles.inputComentario}
            placeholder="Deixe uma opinião sobre o prato (opcional)..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={comentario}
            onChangeText={setComentario}
          />

          {/* Botão de Enviar Reaproveitado e Adaptado */}
          <TouchableOpacity 
            style={[styles.botao, notaUsuario === 0 && styles.botaoDesabilitado]} 
            onPress={handleSalvarAvaliacao}
            disabled={notaUsuario === 0}
          >
            <Text style={styles.textoBotao}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  imageContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
  },
  imagemReceita: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  botaoVoltarTopo: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  botaoFavoritar: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    padding: 25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFF8E7',
    marginTop: -20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempoTexto: {
    marginLeft: 6,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: '#E6DCC3',
    marginVertical: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#23374C',
    marginBottom: 10,
  },
  textoCorpo: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  estrelasRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  inputComentario: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6DCC3',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    color: '#23374C',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#CCC',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
