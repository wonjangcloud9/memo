import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => {
    setWorking(false);
  };
  const work = () => {
    setWorking(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          {working ? (
            <Text style={styles.btnText2}>Work</Text>
          ) : (
            <Text style={styles.btnText}>Work</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          {working ? (
            <Text style={styles.btnText}>Travel</Text>
          ) : (
            <Text style={styles.btnText2}>Travel</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: theme.grey,
  },
  btnText2: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
});
