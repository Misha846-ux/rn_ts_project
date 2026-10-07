import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";

export const AddProductsScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const addProduct = useProductStore((state) => state.addProduct);

  const saveProduct = () => {
    const normalizedTitle = title.trim();
    const numericPrice = Number(price.replace(",", "."));

    if (!normalizedTitle || !price.trim() || !Number.isFinite(numericPrice) || numericPrice < 0) {
      Alert.alert("Ошибка", "Введите название товара и корректную цену");
      return;
    }

    addProduct({ id: Date.now(), title: normalizedTitle, price: numericPrice });
    setTitle("");
    setPrice("");
    Alert.alert("Успех", "Товар добавлен!");
    navigation.navigate("Список книг");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить товар</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      <Button title="Сохранить" onPress={saveProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
});
