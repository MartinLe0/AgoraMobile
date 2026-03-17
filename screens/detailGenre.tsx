import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetailGenre({ route, navigation }) {
    const { genre } = route.params;

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{genre.libGenre}</Text>
            <Text style={styles.text}>ID : {genre.idGenre}</Text>
            <Button
                color="gray"
                title="Retour à la liste des genres"
                onPress={() => navigation.navigate("pageGererLesGenres")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    text: {
        fontSize: 18,
        marginBottom: 40,
    },
});
