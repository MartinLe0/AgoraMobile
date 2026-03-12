import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Menu({ navigation }) {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Menu</Text>
            <Button
                color="gray"
                title="Gérer les genres"
                onPress={() => navigation.navigate("pageGererLesGenres")}
            />
            <Button
                color="gray"
                title="Gérer les jeux"
                onPress={() => navigation.navigate("pageGererLesJeux")}
            />
            <Button
                color="gray"
                title="Gérer les marques"
                onPress={() => navigation.navigate("pageGererLesMarques")}
            />
            <Button
                color="gray"
                title="Gérer les PEGI"
                onPress={() => navigation.navigate("pageGererLesPegi")}
            />
            <Button
                color="gray"
                title="Gérer les plateformes"
                onPress={() => navigation.navigate("pageGererLesPlateformes")}
            />
            <Button
                color="gray"
                title="Quitter"
                onPress={() => navigation.navigate("pageConnexion")}
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    }
});
