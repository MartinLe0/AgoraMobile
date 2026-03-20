import React, { useState } from "react";
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { db } from "../services/firebaseConfig";

export default function EditGenre({ route, navigation }) {
    const genre = route?.params?.genre ?? null;
    const [libGenre, setLibGenre] = useState(genre ? genre.libGenre : "");

    const handleCreate = async () => {
        try {
            if (!libGenre.trim()) {
                Alert.alert("Erreur", "Le libellé est obligatoire");
                return;
            }
            const q = query(collection(db, "genres"), orderBy("idGenre", "desc"), limit(1));
            const snapshot = await getDocs(q);
            let newId = 1;

            if (!snapshot.empty) {
                const highest = snapshot.docs[0].data();
                if (highest.idGenre) newId = highest.idGenre + 1;
            }

            await addDoc(collection(db, "genres"), {
                idGenre: newId,
                libGenre: libGenre,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!libGenre.trim()) {
                Alert.alert("Erreur", "Le libellé est obligatoire");
                return;
            }
            const docRef = doc(db, "genres", genre.id);
            await updateDoc(docRef, { libGenre: libGenre });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            Alert.alert("Confirmation", "Supprimer ce genre ?", [
                { text: "Annuler" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "genres", genre.id));
                        navigation.goBack();
                    },
                },
            ]);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <View style={styles.viewStyle}>
            <Text style={styles.title}>{genre ? "Modifier le genre" : "Créer un genre"}</Text>
            
            <TextInput 
                style={styles.input} 
                value={libGenre} 
                onChangeText={setLibGenre} 
                placeholder="Libellé du genre" 
            />

            {genre ? (
                <>
                    <View style={styles.buttonSpace}><Button title="Modifier" onPress={handleUpdate} /></View>
                    <View style={styles.buttonSpace}><Button title="Supprimer" color="red" onPress={handleDelete} /></View>
                </>
            ) : (
                <View style={styles.buttonSpace}><Button title="Créer" onPress={handleCreate} /></View>
            )}

            <Button color="gray" title="Retour" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "lightgreen",
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
        padding: 10,
        marginBottom: 20,
        backgroundColor: "white",
    },
    buttonSpace: {
        marginBottom: 10,
        width: "100%",
    }
});
