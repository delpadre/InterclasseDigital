import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
View,
Text,
FlatList,
StyleSheet,

TouchableOpacity,
Animated,
LayoutAnimation,
UIManager,
Platform
} from "react-native";

import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { buscarClassificacao } from "../services/api";
import { buscarJogos } from "../services/api";
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MODALIDADES = [
"Futsal",
"Vôlei",
"Basquete",
"E-Sports"
];

export default function ClassificacaoScreen(){

const route = useRoute();

const [times,setTimes] = useState([]);
const [modalidade,setModalidade] = useState(route.params?.modalidade || "Futsal");
const fadeAnim = useState(new Animated.Value(0))[0];

async function carregar(){
  try{

    const jogos = await buscarJogos();

    const filtrados = jogos.filter(j => j.modalidade === modalidade);

    let tabela = {};

    filtrados.forEach(jogo => {

      const { time1, time2, placar1, placar2 } = jogo;

      if(!tabela[time1]){
        tabela[time1] = {nome:time1,jogos:0,vitorias:0,empates:0,derrotas:0,pontos:0};
      }

      if(!tabela[time2]){
        tabela[time2] = {nome:time2,jogos:0,vitorias:0,empates:0,derrotas:0,pontos:0};
      }

      tabela[time1].jogos++;
      tabela[time2].jogos++;

      if(placar1 > placar2){

        tabela[time1].vitorias++;
        tabela[time1].pontos += 3;

        tabela[time2].derrotas++;

      }else if(placar2 > placar1){

        tabela[time2].vitorias++;
        tabela[time2].pontos += 3;

        tabela[time1].derrotas++;

      }else{

        tabela[time1].empates++;
        tabela[time2].empates++;

        tabela[time1].pontos += 1;
        tabela[time2].pontos += 1;

      }

    });

    const dados = Object.values(tabela).sort((a,b)=>b.pontos-a.pontos);

    setTimes(dados);

  }catch(error){

    console.log("Erro ao gerar classificação:", error);

  }
}

useEffect(()=>{

carregar();

Animated.timing(fadeAnim,{
toValue:1,
duration:600,
useNativeDriver:true
}).start();

},[modalidade]);

useEffect(()=>{

if(route.params?.modalidade){
setModalidade(route.params.modalidade);
}

},[route.params]);

function medalha(pos){

if(pos === 0) return "🥇";
if(pos === 1) return "🥈";
if(pos === 2) return "🥉";

return pos + 1;

}

function renderItem({item,index}){

const destaque = index === 0;

return(

<View style={[
styles.row,
destaque && styles.rowPrimeiro
]}>

<Text style={styles.colPos}>{medalha(index)}</Text>

<Text style={styles.colTime}>{item.nome}</Text>

<Text style={styles.col}>{item.jogos}</Text>

<Text style={styles.col}>{item.vitorias}</Text>

<Text style={styles.col}>{item.empates}</Text>

<Text style={styles.col}>{item.derrotas}</Text>

<Text style={styles.colPts}>{item.pontos}</Text>

</View>

)

}

return(

<SafeAreaView style={styles.safe}>

<Header
titulo={`Classificação - ${modalidade}`}
subtitulo="Tabela do campeonato"
icone="stats-chart"
/>

<View style={styles.filtro}>

{MODALIDADES.map((m)=>{

const ativo = modalidade === m;

return(

<TouchableOpacity
key={m}
style={[
styles.botaoFiltro,
ativo && styles.botaoAtivo
]}
onPress={()=>setModalidade(m)}
>

<Text style={{color: ativo ? "#FFF" : "#AAA"}}>
{m}
</Text>

</TouchableOpacity>

)

})}

</View>

<View style={styles.headerTabela}>

<Text style={styles.colPos}>POS</Text>
<Text style={styles.colTime}>TIME</Text>
<Text style={styles.col}>J</Text>
<Text style={styles.col}>V</Text>
<Text style={styles.col}>E</Text>
<Text style={styles.col}>D</Text>
<Text style={styles.colPts}>PTS</Text>

</View>

<Animated.View style={{opacity:fadeAnim,flex:1}}>

<FlatList
data={times}
keyExtractor={(item)=>item.id}
renderItem={renderItem}
contentContainerStyle={{padding:20}}
ListEmptyComponent={
<Text style={styles.vazio}>
Nenhum time cadastrado ainda.
Cadastre jogos para gerar a classificação.
</Text>
}
/>

</Animated.View>

</SafeAreaView>

)

}

const styles = StyleSheet.create({

rowPrimeiro:{
backgroundColor:"#2A1E40",
borderWidth:1,
borderColor:"#FFC107"
},

vazio:{
color:"#888",
textAlign:"center",
marginTop:40,
fontSize:16
},

safe:{
flex:1,
backgroundColor:"#0F0F23"
},

filtro:{
flexDirection:"row",
justifyContent:"center",
marginTop:10
},

botaoFiltro:{
paddingHorizontal:14,
paddingVertical:6,
borderRadius:20,
borderWidth:1,
borderColor:"#333",
marginHorizontal:5
},

botaoAtivo:{
backgroundColor:"#E91E8C"
},

headerTabela:{
flexDirection:"row",
paddingHorizontal:20,
marginTop:20
},

row:{
flexDirection:"row",
backgroundColor:"#1A1A2E",
paddingVertical:14,
paddingHorizontal:10,
borderRadius:10,
marginBottom:10,
alignItems:"center"
},

colPos:{
width:40,
color:"#E91E8C",
fontWeight:"bold",
textAlign:"center"
},

colTime:{
flex:1,
color:"#FFF",
fontWeight:"bold"
},

col:{
width:40,
color:"#AAA",
textAlign:"center"
},

colPts:{
width:50,
color:"#FFC107",
fontWeight:"bold",
textAlign:"center"
}

});