import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ titulo, subtitulo, icone }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name={icone} size={26} color="#E91E8C" />
        <Text style={styles.titulo}>{titulo}</Text>
      </View>

      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0F0F23",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitulo: {
    marginTop: 5,
    color: "#AAAAAA",
    fontSize: 13,
  },
});