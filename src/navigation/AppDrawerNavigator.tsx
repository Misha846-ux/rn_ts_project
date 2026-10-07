import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductsListScreen } from "../screens/BooksScreen/ProductsListScreen";
import { AddProductsScreen } from "../screens/BooksScreen/AddProductsScreen";

const Drawer = createDrawerNavigator();

export const AppDrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Список книг">
        <Drawer.Screen name="Список книг" component={ProductsListScreen} />
        <Drawer.Screen name="Добавить книгу" component={AddProductsScreen} />
      </Drawer.Navigator>
  );
}