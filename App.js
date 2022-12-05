import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

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

  const saveToDos = async (toSave) => {
    try {
      const s = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if (s !== null) {
        const toDos = JSON.parse(s);
        setToDos(toDos);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const addToDo = async () => {
    if (text === "") return;
    const newToDo = Object.assign({}, toDos, {
      [Date.now()]: {
        text,
        work: working,
      },
    });
    setToDos(newToDo);
    await saveToDos(newToDo);
    setText("");
  };

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
      <ScrollView>
        {Object.keys(toDos).map(
          (key) =>
            toDos[key].work === working && (
              <View style={styles.toDos} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            )
        )}
      </ScrollView>
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
  toDos: {
    marginTop: 30,
    backgroundColor: theme.toDoBg,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontWeight: "500",
  },
});
