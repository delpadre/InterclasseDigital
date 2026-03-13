import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>

      <Header
        titulo="Interclasse Digital"
        subtitulo="Escolha sua modalidade"
        icone="trophy"
      />

      <View style={styles.container}>

        <View style={styles.card}>
          <Ionicons name="football" size={32} color="#E91E8C" />
          <Text style={styles.cardText}>Futsal</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="basketball" size={32} color="#FF5722" />
          <Text style={styles.cardText}>Basquete</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="tennisball" size={32} color="#9C27B0" />
          <Text style={styles.cardText}>Vôlei</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="game-controller" size={32} color="#00BCD4" />
          <Text style={styles.cardText}>E-sports</Text>
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe:{
    flex:1,
    backgroundColor:"#0F0F23"
  },

  container:{
    padding:20
  },

  card:{
    backgroundColor:"#1A1A2E",
    padding:18,
    borderRadius:12,
    marginBottom:12,
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },

  cardText:{
    color:"#FFFFFF",
    fontSize:18,
    fontWeight:"bold"
  }

});