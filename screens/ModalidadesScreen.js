import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
View,
Text,
FlatList,
StyleSheet,
TouchableOpacity,
Image
} from "react-native";

import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MODALIDADES = [
{nome:"Futsal",   icone:"football",        cor:"#E91E8C", imagem:require("../assets/futsal.png")},
{nome:"Vôlei",    icone:"tennisball",       cor:"#9C27B0", imagem:require("../assets/volei.png")},
{nome:"Basquete", icone:"basketball",       cor:"#FF5722", imagem:require("../assets/basquete.png")},
{nome:"E-Sports", icone:"game-controller",  cor:"#00BCD4", imagem:require("../assets/esports.png")},
];

export default function ModalidadesScreen(){

const navigation = useNavigation();

function renderItem({item}){
return(
<TouchableOpacity
  style={[styles.card,{borderLeftColor:item.cor}]}
  onPress={()=>navigation.navigate("Classificação",{modalidade:item.nome})}
>

  <Image
    source={item.imagem}
    style={styles.banner}
    resizeMode="cover"
  />

  <View style={styles.topo}>
    <Ionicons name={item.icone} size={22} color={item.cor}/>
    <Text style={styles.nome}>{item.nome}</Text>
    <Text style={styles.ver}>Ver classificação →</Text>
  </View>

</TouchableOpacity>
);
}

return(
<SafeAreaView style={styles.safe}>

  <Header
    titulo="Modalidades"
    subtitulo="Escolha um esporte"
    icone="trophy"
  />

  <FlatList
    data={MODALIDADES}
    keyExtractor={(item)=>item.nome}
    renderItem={renderItem}
    contentContainerStyle={{padding:16}}
  />

</SafeAreaView>
);
}

const styles = StyleSheet.create({
safe:{flex:1,backgroundColor:"#0F0F23"},
card:{backgroundColor:"#1A1A2E",borderRadius:14,marginBottom:12,borderLeftWidth:5,overflow:"hidden"},
banner:{width:"100%",height:110},
topo:{flexDirection:"row",alignItems:"center",padding:14,gap:10},
nome:{color:"#FFFFFF",fontSize:18,fontWeight:"bold",flex:1},
ver:{color:"#888",fontSize:12}
});