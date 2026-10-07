import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  categoryId?: string;
}

type ProductsProps = {
  products: Product[];
  title: string;
  isDarkMode: boolean;
  favoriteIds: string[];
  onFavoritePress: (productId: string) => Promise<void>;
};

export function Products({products, title, isDarkMode, favoriteIds, onFavoritePress,}: ProductsProps) {
  const theme = {
    cardBg: isDarkMode ? "#1E1E1E" : "#FAFAFA",
    textPrimary: isDarkMode ? "#FFFFFF" : "#212121",
    textSecondary: isDarkMode ? "#A0A0A0" : "#757575",
    border: isDarkMode ? "#2C2C2C" : "#F0F0F0",
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.countText, { color: theme.textSecondary }]}>
          ({products.length})
        </Text>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="basket-outline" size={48} color={theme.textSecondary} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Товарів у цій категорії поки немає
          </Text>
        </View>
      ) : (
        <View style={styles.productsGrid}>
          {products.map((product) => {
            const isFavorite = favoriteIds.includes(String(product.id));

            return (
              <View
                key={product.id}
                style={[
                  styles.productCard,
                  { backgroundColor: theme.cardBg, borderColor: theme.border },
                ]}
              >
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => void onFavoritePress(product.id)}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={20}
                    color={isFavorite ? "#E53935" : "#BDBDBD"}
                  />
                </TouchableOpacity>

                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />

                <Text
                  style={[styles.productTitle, { color: theme.textPrimary }]}
                  numberOfLines={1}
                >
                  {product.title}
                </Text>
                <Text style={[styles.productPrice, { color: theme.textPrimary }]}>
                  {product.price}{" "}
                  <Text style={[styles.productUnit, { color: theme.textSecondary }]}>
                    {product.unit}
                  </Text>
                </Text>

                <View style={styles.productFooter}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFB300" />
                    <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
                      {product.rating}{" "}
                      <Text style={styles.reviewsText}>({product.reviews})</Text>
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Додати</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 14,
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  productCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    position: "relative",
    borderWidth: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 90,
    marginVertical: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productUnit: {
    fontSize: 12,
    fontWeight: "normal",
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 11,
    color: "#9E9E9E",
    fontWeight: "normal",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});
