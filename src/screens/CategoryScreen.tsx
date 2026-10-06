import {View, Text, StyleSheet, TextInput, Button, FlatList, useWindowDimensions} from 'react-native';
import { useEffect, useState,  } from 'react';
import CategoryType from '../types/CategoryType';
import {ProductCard} from '../ui/productCard';

export default function CategoryScreen() {
    const URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/categories";
    const [category, setCategory] = useState<CategoryType>({
        name: '',
        image: '',
        color: '',
    })
    const {width} = useWindowDimensions();
    const [update, setUpdate] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const columns = Math.max(1, Math.floor(width / 200));
    console.log(columns)
    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, [update]);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Category Screen</Text>
            <TextInput value={category.name} onChangeText={(text) => setCategory({...category, name: text})} style={styles.input} placeholder="title" />
            <TextInput value={category.image} onChangeText={(text) => setCategory({...category, image: text})} style={styles.input} placeholder="image" />
            <TextInput value={category.color} onChangeText={(text) => setCategory({...category, color: text})} style={styles.input} placeholder="color" />
            <Button title="Add" onPress={async () => {
                await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(category)
                });
                setCategory({name: '', image: '', color: ''});
                setUpdate(current => !current);
            }} />
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
                data={categories}
                numColumns={columns}
                key={columns}
                keyExtractor={(item, index) => String(item.id ?? index)}
                renderItem={({ item }) => (
                        <ProductCard
                            title={item.name}
                            icon={item.icon ?? item.image}
                            color={item.bgColor ?? item.color}
                        />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        gap: 20,
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        width: '90%',
        minHeight: 42,
        borderColor: "black",
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    columnWrapper: {
        width: '100%',
    },
})