// URL base do nosso Backend Java
// Trocado de localhost para o IP da máquina na rede Wi-Fi para funcionar no Expo Go (iPhone)
import { Platform } from 'react-native';

// Usar localhost para testar no computador. Se for testar no celular físico, coloque o IP do seu Wi-Fi.
const BASE_URL = 'http://localhost:8080';

export const getReceitas = async () => {
    try {
        const response = await fetch(`${BASE_URL}/receitas`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar receitas do backend:", error);
        return []; // Retorna lista vazia em caso de erro para não quebrar a tela
    }
};
