import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@jogos";

export async function salvarJogo(jogo) {
  const dados = await AsyncStorage.getItem(KEY);
  const lista = dados ? JSON.parse(dados) : [];
  lista.push(jogo);
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}

export async function listarJogos() {
  const dados = await AsyncStorage.getItem(KEY);
  return dados ? JSON.parse(dados) : [];
}

export async function deletarJogoLocal(id) {
  const dados = await AsyncStorage.getItem(KEY);
  const lista = dados ? JSON.parse(dados) : [];
  const nova = lista.filter(j => String(j.id) !== String(id));
  await AsyncStorage.setItem(KEY, JSON.stringify(nova));
}

export async function resetarCampeonato() {
  await AsyncStorage.removeItem(KEY);
  await AsyncStorage.removeItem("@classificacao");
}