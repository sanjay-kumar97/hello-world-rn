import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useFonts from "./hooks/useFonts";

export default function App() {
  const originalText = "HELLO WORLD!";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVXYZ! ";

  const [textToRender, setTextToRender] = useState(originalText);

  const LoadFonts = async () => await useFonts();

  const rearrangeLetters = () => {
    let iteration = 0;

    clearInterval(interval);

    let interval = setInterval(() => {
      setTextToRender((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }

            return characters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 50);
  };

  useEffect(() => {
    LoadFonts();
    rearrangeLetters();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={rearrangeLetters}>
        <Text style={styles.text}>{textToRender}</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 40,
    color: "#111111",
  },
});
