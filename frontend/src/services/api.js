import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * Host da API em desenvolvimento:
 * - Android emulador: 10.0.2.2 aponta para o localhost do PC
 * - Celular físico (Expo Go): usa o IP do PC que o Metro expõe
 * - iOS simulador: localhost costuma funcionar
 */
function getDevHost() {
  if (Platform.OS === 'android' && Constants.isDevice === false) {
    return '10.0.2.2';
  }
  const dbg =
    Constants.expoGoConfig?.debuggerHost ??
    Constants.manifest?.debuggerHost ??
    Constants.manifest2?.extra?.expoGo?.debuggerHost;
  if (typeof dbg === 'string') {
    return dbg.split(':')[0];
  }
  return 'localhost';
}

const getBaseURL = () => {
  const host = getDevHost();
  return `http://${host}:8080/api`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
});

export default api;
