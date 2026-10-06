import type { Dispatch, SetStateAction } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

type CategoryesProps = {
  categories: Category[];
  selectedCategoryId: string | null;
  showFavorites: boolean;
  isDarkMode: boolean;
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
  setSelectedCategoryId: Dispatch<SetStateAction<string | null>>;
};

export function Categoryes({
  categories,
  selectedCategoryId,
  showFavorites,
  isDarkMode,
  setShowFavorites,
  setSelectedCategoryId,
}: CategoryesProps) {
  const textPrimary = isDarkMode ? "#FFFFFF" : "#212121";

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>Категорії</Text>
        {selectedCategoryId && (
          <TouchableOpacity onPress={() => setSelectedCategoryId(null)}>
            <Text style={styles.seeAllText}>Показати всі</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => {
            setShowFavorites(false);
            setSelectedCategoryId(null);
          }}
        >
          <View
            style={[
              styles.categoryIconContainer,
              {
                backgroundColor:
                  selectedCategoryId === null && !showFavorites
                    ? "#2E7D32"
                    : isDarkMode
                      ? "#2C2C2C"
                      : "#E8F5E9",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="apps"
              size={32}
              color={selectedCategoryId === null && !showFavorites ? "#FFFFFF" : "#2E7D32"}
            />
          </View>
          <Text
            style={[
              styles.categoryName,
              {
                color:
                  selectedCategoryId === null && !showFavorites
                    ? "#2E7D32"
                    : textPrimary,
                fontWeight:
                  selectedCategoryId === null && !showFavorites ? "bold" : "normal",
              },
            ]}
          >
            Всі
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => {
            setShowFavorites(true);
            setSelectedCategoryId(null);
          }}
        >
          <View
            style={[
              styles.categoryIconContainer,
              { backgroundColor: showFavorites ? "#E53935" : "#FFEBEE" },
            ]}
          >
            <Ionicons
              name={showFavorites ? "heart" : "heart-outline"}
              size={32}
              color={showFavorites ? "#FFFFFF" : "#E53935"}
            />
          </View>
          <Text
            style={[
              styles.categoryName,
              {
                color: showFavorites ? "#E53935" : textPrimary,
                fontWeight: showFavorites ? "bold" : "normal",
              },
            ]}
          >
            Любимые
          </Text>
        </TouchableOpacity>

        {categories.map((item) => {
          const isSelected = String(selectedCategoryId) === String(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => {
                setShowFavorites(false);
                setSelectedCategoryId(item.id);
              }}
            >
              <View
                style={[
                  styles.categoryIconContainer,
                  {
                    backgroundColor: isSelected
                      ? "#2E7D32"
                      : isDarkMode
                        ? "#2C2C2C"
                        : item.bgColor,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color={isSelected ? "#FFFFFF" : item.iconColor}
                />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  {
                    color: isSelected ? "#2E7D32" : textPrimary,
                    fontWeight: isSelected ? "bold" : "normal",
                  },
                ]}
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  seeAllText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
  },
  categoriesList: {
    paddingBottom: 16,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 72,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
});
