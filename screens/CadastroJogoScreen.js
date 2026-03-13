import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert
} from "react-native";

import { enviarJogo, enviarTime } from "../services/api";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { atualizarClassificacao } from "../storage/classificacaoStorage";
import { salvarJogo, resetarCampeonato } from "../storage/jogosStorage";

const MODALIDADES = [
{nome:"Futsal",icone:"football",cor:"#E91E8C"},
{nome:"Vôlei",icone:"tennisball",cor:"#9C27B0"},
{nome:"Basquete",icone:"basketball",cor:"#FF5722"},
{nome:"E-Sports",icone:"game-controller",cor:"#00BCD4"},
];

export default function CadastroJogoScreen(){

const [time1,setTime1] = useState("");
const [time2,setTime2] = useState("");
const [placar1,setPlacar1] = useState("");
const [placar2,setPlacar2] = useState("");
const [modalidade,setModalidade] = useState("");
const [data,setData] = useState("");
const [local,setLocal] = useState("");

function formatarData(texto){
let numeros = texto.replace(/\D/g,"");
if(numeros.length <= 2){
setData(numeros);
}else{
setData(numeros.slice(0,2) + "/" + numeros.slice(2,4));
}
}

async function cadastrar(){

if(!time1 || !time2 || !modalidade){
Alert.alert("Erro","Preencha Time 1, Time 2 e Modalidade");
return;
}

const jogo = {
id: Date.now(),
time1,
time2,
placar1,
placar2,
modalidade,
data,
local
};

try{

// Salva jogo no AsyncStorage (calendário)
await salvarJogo(jogo);

// Atualiza classificação local
await atualizarClassificacao(jogo);

// POST 1 — envia jogo para API
try{
await enviarJogo(jogo);
}catch(e){
console.log("Falha ao enviar jogo para API:", e);
}

// POST 2 — envia os dois times para API de classificação
try{
await enviarTime({ nome: time1, modalidade, id: `${time1}-${modalidade}` });
await enviarTime({ nome: time2, modalidade, id: `${time2}-${modalidade}` });
}catch(e){
console.log("Falha ao enviar times para API:", e);
}

Alert.alert("Sucesso","Jogo cadastrado!");

}catch(e){
Alert.alert("Erro","Falha ao salvar jogo");
}

setTime1("");
setTime2("");
setPlacar1("");
setPlacar2("");
setModalidade("");
setData("");
setLocal("");
}

function confirmarReset(){
Alert.alert(
"Resetar Campeonato",
"Tem certeza que deseja apagar todos os jogos e classificação?",
[
{ text:"Cancelar", style:"cancel"},
{ text:"Resetar", style:"destructive", onPress:resetar }
]
);
}

async function resetar(){
try{
await resetarCampeonato();
Alert.alert("Sucesso","Campeonato resetado!");
}catch(e){
Alert.alert("Erro","Falha ao resetar campeonato");
}
}

return(

<SafeAreaView style={styles.safe}>

<Header
titulo="Cadastrar Jogo"
subtitulo="Adicionar partida"
icone="add-circle"
/>

<View style={styles.container}>

<Text style={styles.label}>Time 1</Text>
<TextInput
style={styles.input}
value={time1}
onChangeText={setTime1}
placeholder="Nome do time"
placeholderTextColor="#777"
/>

<Text style={styles.label}>Time 2</Text>
<TextInput
style={styles.input}
value={time2}
onChangeText={setTime2}
placeholder="Nome do time"
placeholderTextColor="#777"
/>

<Text style={styles.label}>Placar</Text>

<View style={styles.placarRow}>

<TextInput
style={styles.placarInput}
keyboardType="numeric"
value={placar1}
onChangeText={setPlacar1}
placeholder="0"
placeholderTextColor="#777"
/>

<Text style={styles.x}>x</Text>

<TextInput
style={styles.placarInput}
keyboardType="numeric"
value={placar2}
onChangeText={setPlacar2}
placeholder="0"
placeholderTextColor="#777"
/>

</View>

<Text style={styles.label}>Modalidade</Text>

<View style={styles.modalidades}>

{MODALIDADES.map((item)=>{
const selecionado = modalidade === item.nome;
return(
<TouchableOpacity
key={item.nome}
style={[styles.modalidadeBtn, selecionado && {backgroundColor:item.cor}]}
onPress={()=>setModalidade(item.nome)}
>
<Ionicons name={item.icone} size={20} color={selecionado ? "#FFF" : item.cor}/>
<Text style={[styles.modalidadeTexto, selecionado && {color:"#FFF"}]}>
{item.nome}
</Text>
</TouchableOpacity>
);
})}

</View>

<Text style={styles.label}>Data</Text>
<TextInput
style={styles.input}
value={data}
onChangeText={formatarData}
keyboardType="numeric"
placeholder="DD/MM"
placeholderTextColor="#777"
/>

<Text style={styles.label}>Local</Text>
<TextInput
style={styles.input}
value={local}
onChangeText={setLocal}
placeholder="Quadra / Ginásio"
placeholderTextColor="#777"
/>

<TouchableOpacity style={styles.botao} onPress={cadastrar}>
<Text style={styles.botaoTexto}>Cadastrar Jogo</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.botaoReset} onPress={confirmarReset}>
<Text style={styles.botaoResetTexto}>🔄 Resetar Campeonato</Text>
</TouchableOpacity>

</View>

</SafeAreaView>
);
}

const styles = StyleSheet.create({
safe:{ flex:1, backgroundColor:"#0F0F23" },
container:{ padding:20 },
label:{ color:"#FFF", marginTop:14, marginBottom:6 },
input:{ backgroundColor:"#1A1A2E", borderRadius:10, padding:12, color:"#FFF" },
placarRow:{ flexDirection:"row", alignItems:"center" },
placarInput:{ flex:1, backgroundColor:"#1A1A2E", borderRadius:10, padding:12, color:"#FFF", textAlign:"center", fontSize:18 },
x:{ color:"#FFF", fontSize:22, marginHorizontal:10 },
modalidades:{ flexDirection:"row", flexWrap:"wrap", gap:10 },
modalidadeBtn:{ flexDirection:"row", alignItems:"center", paddingVertical:8, paddingHorizontal:12, borderRadius:20, borderWidth:1, borderColor:"#333", marginRight:8, marginBottom:8 },
modalidadeTexto:{ marginLeft:6, color:"#AAA" },
botao:{ marginTop:24, backgroundColor:"#E91E8C", padding:16, borderRadius:12, alignItems:"center" },
botaoTexto:{ color:"#FFF", fontSize:16, fontWeight:"bold" },
botaoReset:{ marginTop:14, backgroundColor:"#E53935", padding:14, borderRadius:12, alignItems:"center" },
botaoResetTexto:{ color:"#FFF", fontWeight:"bold" }
});