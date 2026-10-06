import { View, Dimensions, useWindowDimensions, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const TestScreen = () =>{
    const {width, height} = useWindowDimensions();
    console.log(width, height)
    return (
        <View style={styles.container}>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "orange"
    }
})

export default TestScreen;