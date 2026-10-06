import { StyleSheet, Text, View } from 'react-native';

export const ProductCard = ({ title, icon, color }: { title: string; icon?: string; color?: string }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.imgContainer, { backgroundColor: color }]}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    text: {
        color: "black",
        fontSize: 10,
        lineHeight: 12,
        textAlign: "center",
    },
    icon: {
        fontSize: 28,
    },
    imgContainer: {
        width: 52,
        height: 52,
        marginBottom: 6,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    }
})