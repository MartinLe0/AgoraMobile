import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Connexion({ navigation }) {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>Agora Mobile</Text>
            <Button
                color="gray"
                title="Connecter"
                onPress={() => navigation.navigate("pageMenu")}
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
