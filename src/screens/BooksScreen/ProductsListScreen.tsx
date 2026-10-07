import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";

export const ProductsListScreen = () => {
  const products = useProductStore((state) => state.products);
  const removeProduct = useProductStore((state) => state.removeProduct);

  const clearAllProducts = () => {
    products.forEach((product) => removeProduct(product.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список товаров</Text>
      <Button title="Очистить список" onPress={clearAllProducts} />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>Цена: {item.price}</Text>
            <Button
              title="Удалить"
              onPress={() => removeProduct(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  productItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  productTitle: { fontSize: 18, fontWeight: "bold" },
  productPrice: { fontSize: 16, color: "gray", marginBottom: 8 },
});
