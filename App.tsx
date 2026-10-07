import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AppDrawerNavigator } from "./src/navigation/AppDrawerNavigator";
import { ImageBackground, Platform, StyleSheet, Text, View } from "react-native";
import MyFlatList from "./src/ui/MyFlatList";
import { BasicComponents } from "./src/ui/BasicComponents";
import { Inputs } from "./src/ui/Inputs";
import { MyKeyboard } from "./src/ui/MyKeybord";
import { LayoutExample } from "./src/ui/LayoutExample";
import CategoryScreen from "./src/screens/CategoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

// export default function App() {
//   console.log(Platform.OS)
//   return (
//     <SafeAreaProvider>
//       <View style={styles.container}>
//         <HomeScreen/>
//         <StatusBar style="auto" />
//       </View>
//     </SafeAreaProvider>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawerNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cf0b0",
    justifyContent: "center", // центрує вміст по вертикалі
  },
  text: {
    textAlign: "center", // центрує текст залежно від ширини екрана
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    flexGrow: 0, // не дає FlatList займати весь вертикальний екран
    marginVertical: 20, //відступ зверху та знизу
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center", // центрує елементи FlatList по горизонталі
    alignItems: "center", // центрує елементи FlatList по вертикалі
    borderWidth: 1, // додає рамку навколо FlatList
    borderColor: "black",
  },
  item: {
    marginHorizontal: 10,
  },
});
