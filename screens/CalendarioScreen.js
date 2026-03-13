import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
View,
Text,
FlatList,
StyleSheet,
TouchableOpacity,
Animated
} from "react-native";

import Header from "../components/Header";
import { listarJogos, deletarJogoLocal } from "../storage/jogosStorage";

export default function CalendarioScreen(){

const [jogos,setJogos] = useState([]);
const fadeAnim = useState(new Animated.Value(0))[0];

useEffect(()=>{
carregar();

Animated.timing(fadeAnim,{
toValue:1,
duration:600,
useNativeDriver:true
}).start();

},[])

async function carregar(){
try{
const lista = await listarJogos();
setJogos([...lista].reverse());
}catch(error){
console.log("Erro ao buscar jogos:", error);
}
}

async function apagar(id){
try{
await deletarJogoLocal(id);
carregar();
}catch(error){
console.log("Erro ao apagar jogo:", error);
}
}

function agruparPorData(lista){
const grupos = {};
lista.forEach((jogo)=>{
const data = jogo.data || "Sem data";
if(!grupos[data]){
grupos[data] = [];
}
grupos[data].push(jogo);
});
return Object.keys(grupos).map(data=>({
data,
jogos:grupos[data]
}));
}

const renderItem = ({item}) => (

<View key={item.data}>

<Text style={styles.dataTitulo}>
📅 {item.data}
</Text>

{item.jogos.map((jogo)=>(
<View key={jogo.id} style={styles.card}>

<View style={styles.topo}>

<Text style={styles.modalidade}>
🏆 {jogo.modalidade || "Modalidade"}
</Text>

<TouchableOpacity onPress={()=>apagar(jogo.id)}>
<Text style={styles.remover}>🗑</Text>
</TouchableOpacity>

</View>

<Text style={styles.times}>
{jogo.time1} vs {jogo.time2}
</Text>

<Text style={styles.placar}>
{jogo.placar1} x {jogo.placar2}
</Text>

<Text style={styles.local}>
📍 {jogo.local}
</Text>

</View>
))}

</View>
)

const jogosAgrupados = agruparPorData(jogos);

return(

<SafeAreaView style={styles.safe}>

<Header
titulo="Calendário"
subtitulo={`Jogos cadastrados (${jogos.length})`}
icone="calendar"
/>

<Animated.View style={{opacity:fadeAnim,flex:1}}>

<FlatList
data={jogosAgrupados}
keyExtractor={(item)=>item.data}
renderItem={renderItem}
contentContainerStyle={{padding:16}}
ListEmptyComponent={
<Text style={styles.vazio}>
Nenhum jogo cadastrado ainda ⚽
</Text>
}
/>

</Animated.View>

</SafeAreaView>
)

}

const styles = StyleSheet.create({
safe:{ flex:1, backgroundColor:"#0F0F23" },
dataTitulo:{ color:"#FFC107", fontSize:18, fontWeight:"bold", marginBottom:10 },
card:{ backgroundColor:"#1A1A2E", borderRadius:14, padding:18, marginBottom:14, borderLeftWidth:4, borderLeftColor:"#E91E8C" },
topo:{ flexDirection:"row", justifyContent:"space-between", marginBottom:8 },
modalidade:{ color:"#FFC107", fontWeight:"bold" },
times:{ color:"#FFFFFF", fontSize:18, fontWeight:"bold", textAlign:"center" },
placar:{ color:"#E91E8C", fontSize:20, fontWeight:"bold", textAlign:"center", marginTop:6 },
local:{ color:"#AAAAAA", marginTop:10, textAlign:"center" },
remover:{ fontSize:18 },
vazio:{ color:"#888", textAlign:"center", marginTop:50, fontSize:16 }
});