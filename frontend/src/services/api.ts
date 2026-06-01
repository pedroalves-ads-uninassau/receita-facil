import { Platform } from 'react-native';

// Usar localhost para testar no computador. Se for testar no celular físico, coloque o IP do seu Wi-Fi.
const BASE_URL = 'http://10.100.2.32';

export const getReceitas = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${BASE_URL}/receitas`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar receitas do backend:', error);
        return [];
    }
};
