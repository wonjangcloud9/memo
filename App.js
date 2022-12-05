import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => {
    setWorking(false);
  };
  const work = () => {
    setWorking(true);
  };

  const onChanges = (payload) => {
    setText(payload);
  };

  const addToDo = () => {
    if (text === "") return;
    // const newToDo = {
    //   [Date.now()]: {
    //     id: Date.now(),
    //     text,
    //     completed: false,
    //   },
    // };
    const newToDo = Object.assign({}, toDos, {
      [Date.now()]: {
        text,
        work: working,
      },
    });
    setToDos(newToDo);
    setText("");
  };
  console.log(toDos);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          style={styles.input}
          placeholder={
            working ? "Where are you working?" : "Where are you going?"
          }
          value={text}
          placeholderTextColor={theme.grey}
          keyboardType="default"
          returnKeyType="Done"
          secureTextEntry={false}
          onChangeText={onChanges}
        />
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
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 30,
    fontSize: 18,
    fontWeight: "500",
    color: theme.grey,
  },
});
