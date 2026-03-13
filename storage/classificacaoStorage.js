import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@classificacao";

export async function atualizarClassificacao(jogo){

const dados = await AsyncStorage.getItem(KEY);
let tabela = dados ? JSON.parse(dados) : [];

function getTime(nome, modalidade){

nome = nome.trim().toUpperCase();

let time = tabela.find(
t => t.nome === nome && t.modalidade === modalidade
);

if(!time){

time = {
nome,
modalidade,
pontos:0,
jogos:0,
vitorias:0,
empates:0,
derrotas:0
};

tabela.push(time);

}

return time;

}

const time1 = getTime(jogo.time1, jogo.modalidade);
const time2 = getTime(jogo.time2, jogo.modalidade);

time1.jogos++;
time2.jogos++;

const p1 = parseInt(jogo.placar1 || 0);
const p2 = parseInt(jogo.placar2 || 0);

if(p1 > p2){

time1.vitorias++;
time1.pontos += 3;
time2.derrotas++;

}

else if(p2 > p1){

time2.vitorias++;
time2.pontos += 3;
time1.derrotas++;

}

else{

time1.empates++;
time2.empates++;

time1.pontos += 1;
time2.pontos += 1;

}

await AsyncStorage.setItem(KEY, JSON.stringify(tabela));

}

export async function listarClassificacao(modalidade){

const dados = await AsyncStorage.getItem(KEY);

if(!dados) return [];

const tabela = JSON.parse(dados);

const filtrado = tabela.filter(
t => t.modalidade === modalidade
);

return filtrado.sort((a,b)=> b.pontos - a.pontos);

}