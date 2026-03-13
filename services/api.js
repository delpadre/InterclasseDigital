import axios from "axios";

export const api = axios.create({
  baseURL: "https://69b444ecbe587338e7134c88.mockapi.io"
});

// =========================
// JOGOS
// =========================

export async function buscarJogos() {
  try {
    const response = await api.get("/jogos");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar jogos:", error);
    return [];
  }
}

export async function enviarJogo(jogo) {
  try {
    const response = await api.post("/jogos", jogo);
    return response.data;
  } catch (error) {
    console.log("Erro ao enviar jogo:", error);
    throw error;
  }
}

// =========================
// CLASSIFICAÇÃO
// =========================

export async function buscarClassificacao() {
  try {
    const response = await api.get("/classificacao");
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar classificação:", error);
    return [];
  }
}

export async function enviarTime(time) {
  try {
    const response = await api.post("/classificacao", time);
    return response.data;
  } catch (error) {
    console.log("Erro ao enviar time:", error);
    throw error;
  }
}

export async function deletarJogo(id){

  try{

    const response = await api.delete(`/jogos/${id}`);

    return response.data;

  }catch(error){

    console.log("Erro ao deletar jogo:", error);
    throw error;

  }

}