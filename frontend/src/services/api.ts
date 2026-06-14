import { Platform } from 'react-native';

// Lembre-se de verificar se a porta do seu backend é a 8080!
const BASE_URL = 'http://10.100.2.32:8080';

export enum TipoUsuario {
    COMUM = 'COMUM',
    CHEF = 'CHEF',
    ADMIN = 'ADMIN'
}

export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
    tipoUsuario?: TipoUsuario;
    receitasFavoritas?: Receita[];
    minhasReceitas?: Receita[];
    perfil?: Perfil;
}

export interface Categoria {
    id?: number;
    nomeCategoria: string;
    receitas?: Receita[];
}

export interface Imagem {
    id?: number;
    url: string;
}

export interface Receita {
    id?: number;
    titulo: string;
    passoAPasso: string;
    tempoPreparo: number;
    ingredientes: string;
    usuarioId?: number;
    autor?: Usuario;
    imagens?: Imagem[];
    categorias?: Categoria[];
}

export interface Perfil {
    id?: number;
    especialidade: string;
    descricao: string;
    usuario?: Usuario;
}

export interface Avaliacao {
    id?: number;
    usuarioId: number;
    receitaId: number;
    nota: number;
    comentario?: string;
}

export interface FavoritoDTO {
    usuarioId: number;
    receitaId: number;
}

// Funções da API (Exportações nomeadas da branch main)
export const login = async (usuario: Partial<Usuario>): Promise<Usuario | null> => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Falha na autenticação');
        return await response.json();
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return null;
    }
};

export const listarUsuarios = async (): Promise<Usuario[]> => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios`);
        if (!response.ok) throw new Error('Falha ao obter lista de usuários');
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return [];
    }
};

export const cadastrarUsuario = async (usuario: Usuario): Promise<Usuario | null> => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Falha ao cadastrar usuário');
        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return null;
    }
};

export const atualizarUsuario = async (id: number, usuario: Usuario): Promise<Usuario | null> => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Falha ao atualizar usuário');
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return null;
    }
};

export const deletarUsuario = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Falha ao deletar usuário');
        return true;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return false;
    }
};

export const getReceitas = async (): Promise<Receita[]> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas`);
        if (!response.ok) throw new Error('Falha ao obter receitas');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        return [];
    }
};

export const buscarReceitasPorTitulo = async (titulo: string): Promise<Receita[]> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/busca/${encodeURIComponent(titulo)}`);
        if (!response.ok) throw new Error('Falha na busca por título');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar receitas por título:', error);
        return [];
    }
};

export const buscarReceitaPorId = async (id: number): Promise<Receita | null> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/${id}`);
        if (!response.ok) throw new Error('Falha ao buscar receita por ID');
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter receita por ID:', error);
        return null;
    }
};

export const buscarReceitasPorUsuario = async (usuarioId: number): Promise<Receita[]> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/usuario/${usuarioId}`);
        if (!response.ok) throw new Error('Falha ao buscar receitas do chef');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar receitas por usuário:', error);
        return [];
    }
};

export const buscarReceitasPorCategoria = async (categoriaId: number): Promise<Receita[]> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/categoria/${categoriaId}`);
        if (!response.ok) throw new Error('Falha ao buscar receitas por categoria');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar receitas por categoria:', error);
        return [];
    }
};

export const criarReceita = async (receita: Receita): Promise<Receita | null> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(receita),
        });
        if (!response.ok) throw new Error('Falha ao criar receita');
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar receita:', error);
        return null;
    }
};

export const atualizarReceita = async (id: number, receita: Receita): Promise<Receita | null> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(receita),
        });
        if (!response.ok) throw new Error('Falha ao atualizar receita');
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        return null;
    }
};

export const deletarReceita = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Falha ao deletar receita');
        return true;
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
        return false;
    }
};

export const listarPerfis = async (): Promise<Perfil[]> => {
    try {
        const response = await fetch(`${BASE_URL}/perfis`);
        if (!response.ok) throw new Error('Falha ao obter perfis');
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter perfis:', error);
        return [];
    }
};

export const buscarPerfilPorUsuario = async (usuarioId: number): Promise<Perfil | null> => {
    try {
        const response = await fetch(`${BASE_URL}/perfis/usuario/${usuarioId}`);
        if (!response.ok) throw new Error('Falha ao buscar perfil por usuário');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar perfil por usuário:', error);
        return null;
    }
};

export const criarPerfil = async (perfil: Perfil): Promise<Perfil | null> => {
    try {
        const response = await fetch(`${BASE_URL}/perfis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perfil),
        });
        if (!response.ok) throw new Error('Falha ao criar perfil de chef');
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar perfil de chef:', error);
        return null;
    }
};

export const atualizarPerfil = async (id: number, perfil: Perfil): Promise<Perfil | null> => {
    try {
        const response = await fetch(`${BASE_URL}/perfis/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perfil),
        });
        if (!response.ok) throw new Error('Falha ao atualizar perfil');
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return null;
    }
};

export const listarFavoritos = async (usuarioId: number): Promise<Receita[]> => {
    try {
        const response = await fetch(`${BASE_URL}/favoritos/${usuarioId}`);
        if (!response.ok) throw new Error('Falha ao listar receitas favoritas');
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar receitas favoritas:', error);
        return [];
    }
};

export const favoritarReceita = async (usuarioId: number, receitaId: number): Promise<boolean> => {
    try {
        const payload: FavoritoDTO = { usuarioId, receitaId };
        const response = await fetch(`${BASE_URL}/favoritos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Falha ao favoritar receita');
        return true;
    } catch (error) {
        console.error('Erro ao favoritar receita:', error);
        return false;
    }
};

export const desfavoritarReceita = async (usuarioId: number, receitaId: number): Promise<boolean> => {
    try {
        const payload: FavoritoDTO = { usuarioId, receitaId };
        const response = await fetch(`${BASE_URL}/favoritos`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Falha ao desfavoritar receita');
        return true;
    } catch (error) {
        console.error('Erro ao desfavoritar receita:', error);
        return false;
    }
};

export const listarCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await fetch(`${BASE_URL}/categorias`);
        if (!response.ok) throw new Error('Falha ao obter categorias');
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        return [];
    }
};

export const buscarCategoriaPorId = async (id: number): Promise<Categoria | null> => {
    try {
        const response = await fetch(`${BASE_URL}/categorias/${id}`);
        if (!response.ok) throw new Error('Falha ao obter categoria por ID');
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter categoria por ID:', error);
        return null;
    }
};

export const criarCategoria = async (categoria: Categoria): Promise<Categoria | null> => {
    try {
        const response = await fetch(`${BASE_URL}/categorias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) throw new Error('Falha ao criar categoria');
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        return null;
    }
};

export const deletarCategoria = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/categorias/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Falha ao deletar categoria');
        return true;
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        return false;
    }
};

export const criarAvaliacao = async (avaliacao: Avaliacao): Promise<Avaliacao | null> => {
    try {
        const response = await fetch(`${BASE_URL}/avaliacoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(avaliacao),
        });
        if (!response.ok) throw new Error('Falha ao registrar avaliação');
        return await response.json();
    } catch (error) {
        console.error('Erro ao registrar avaliação:', error);
        return null;
    }
};

export const listarAvaliacoesPorReceita = async (receitaId: number): Promise<Avaliacao[]> => {
    try {
        const response = await fetch(`${BASE_URL}/avaliacoes/receita/${receitaId}`);
        if (!response.ok) throw new Error('Falha ao listar avaliações da receita');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar avaliações da receita:', error);
        return [];
    }
};

// Objeto padrão para compatibilidade com a branch do Allan (HomeScreen, RegisterScreen, etc.)
const api = {
    getReceitas: async (): Promise<any[]> => {
        try {
            const response = await fetch(`${BASE_URL}/receitas`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
            return [];
        }
    },

    post: async (endpoint: string, bodyData: object) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro no POST em ${endpoint}:`, error);
            throw error;
        }
    }
};

export default api;
