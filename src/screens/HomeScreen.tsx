import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Counter from "../components/Counter";
import { Categoryes, type Category } from "../components/Categoryes";
import { Products, type Product } from "../components/Products";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface Favorite {
  id: string;
  ProductId: string;
}

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`),
      ]);

      if (!categoriesRes.ok || !productsRes.ok) {
        throw new Error("Не вдалося завантажити дані");
      }

      const categoriesData = await categoriesRes.json();
      const productsData = await productsRes.json();

      setCategories(categoriesData);
      setProducts(productsData);

      const favoritesRes = await fetch(`${API_BASE_URL}/favorites`);
      if (favoritesRes.ok) {
        const favoritesData: Favorite[] = await favoritesRes.json();
        setFavoriteIds(favoritesData.map((item) => String(item.ProductId)));
      }
    } catch (err: any) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  // Фільтрація товарів: за категорією ТА за пошуковим запитом
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Перетворення на String усуває помилки розбіжності типів (String vs Number)
      const matchesCategory = selectedCategoryId
        ? String(product.categoryId) === String(selectedCategoryId)
        : true;

      const matchesFavorites = showFavorites
        ? favoriteIds.includes(String(product.id))
        : true;
      
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }, [products, selectedCategoryId, searchQuery, favoriteIds, showFavorites]);

  const theme = {
    bg: isDarkMode ? "#121212" : "#FFFFFF",
    cardBg: isDarkMode ? "#1E1E1E" : "#FAFAFA",
    textPrimary: isDarkMode ? "#FFFFFF" : "#212121",
    textSecondary: isDarkMode ? "#A0A0A0" : "#757575",
    inputBg: isDarkMode ? "#2C2C2C" : "#F5F5F5",
    border: isDarkMode ? "#2C2C2C" : "#F0F0F0",
    bannerBg: isDarkMode ? "#1B382B" : "#E8F5E9",
    bannerTitle: isDarkMode ? "#A5D6A7" : "#1B5E20",
    bannerSubtitle: isDarkMode ? "#81C784" : "#4CAF50",
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Завантаження даних...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <Ionicons name="alert-circle-outline" size={48} color="#D32F2F" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Спробувати знову</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleFavoritePress = async (productId: string) => {
    const favoritesResponse = await fetch(`${API_BASE_URL}/favorites`);
    const favorites: Favorite[] = await favoritesResponse.json();
    const favorite = favorites.find(
      (item) => String(item.ProductId) === String(productId),
    );

    if (favorite) {
      await fetch(`${API_BASE_URL}/favorites/${favorite.id}`, {
        method: "DELETE",
      });
      setFavoriteIds((ids) => ids.filter((id) => id !== String(productId)));
      return;
    }

    await fetch(`${API_BASE_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ProductId: productId }),
    });
    setFavoriteIds((ids) => [...ids, String(productId)]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
              Привіт, Михайло 👋
            </Text>
            <Text
              style={[styles.greetingSubtitle, { color: theme.textSecondary }]}
            >
              Раді бачити тебе знову!
            </Text>
          </View>
          <Counter/>
          <View style={styles.headerActions}>
            <View style={styles.themeToggleContainer}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={20}
                color={isDarkMode ? "#FFD54F" : "#FFA000"}
              />
              <Switch
                value={isDarkMode}
                onValueChange={(val) => setIsDarkMode(val)}
                trackColor={{ false: "#E0E0E0", true: "#2E7D32" }}
                thumbColor={isDarkMode ? "#FFFFFF" : "#F4F3F4"}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.notificationButton,
                { backgroundColor: theme.inputBg },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={theme.textPrimary}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Пошук */}
        <View
          style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color="#9E9E9E"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Пошук товарів..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary }]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        {/* Промо-банер */}
        <View style={[styles.banner, { backgroundColor: theme.bannerBg }]}>
          <View style={styles.bannerContent}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>Знижки до 50%</Text>
            </View>
            <Text style={[styles.bannerTitle, { color: theme.bannerTitle }]}>
              Свіжі продукти{"\n"}для вашого столу
            </Text>
            <Text
              style={[styles.bannerSubtitle, { color: theme.bannerSubtitle }]}
            >
              Овочі, фрукти, молочні продукти та багато іншого
            </Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Перейти</Text>
              <Ionicons name="arrow-forward" size={16} color="#1B5E20" />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3137/3137044.png",
            }}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        <Categoryes
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          showFavorites={showFavorites}
          isDarkMode={isDarkMode}
          setShowFavorites={setShowFavorites}
          setSelectedCategoryId={setSelectedCategoryId}
        />

        <Products
          products={filteredProducts}
          title={
            selectedCategoryId
              ? categories.find(
                  (category) => String(category.id) === String(selectedCategoryId),
                )?.name || "Товари"
              : "Популярні товари"
          }
          isDarkMode={isDarkMode}
          favoriteIds={favoriteIds}
          onFavoritePress={handleFavoritePress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  greetingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  // Banner
  banner: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  discountTag: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    marginBottom: 12,
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1B5E20",
    marginRight: 4,
  },
  bannerImage: {
    width: 110,
    height: 110,
    marginLeft: 8,
  },

});

 