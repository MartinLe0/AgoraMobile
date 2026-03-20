import React, { useState } from "react";
import { addDoc, updateDoc, deleteDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
import { db } from "../services/firebaseConfig";

export default function EditMarque({ route, navigation }) {
    const marque = route?.params?.marque ?? null;
    const [nomMarque, setNomMarque] = useState(marque ? marque.nomMarque : "");

    const handleCreate = async () => {
        try {
            if (!nomMarque.trim()) {
                Alert.alert("Erreur", "Le nom est obligatoire");
                return;
            }
            const q = query(collection(db, "marques"), orderBy("idMarque", "desc"), limit(1));
            const snapshot = await getDocs(q);
            let newId = 1;

            if (!snapshot.empty) {
                const highest = snapshot.docs[0].data();
                if (highest.idMarque) newId = highest.idMarque + 1;
            }

            await addDoc(collection(db, "marques"), {
                idMarque: newId,
                nomMarque: nomMarque,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!nomMarque.trim()) {
                Alert.alert("Erreur", "Le nom est obligatoire");
                return;
            }
            const docRef = doc(db, "marques", marque.id);
            await updateDoc(docRef, { nomMarque: nomMarque });
            navigation.goBack();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async () => {
        try {
            Alert.alert("Confirmation", "Supprimer cette marque ?", [
                { text: "Annuler" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(db, "marques", marque.id));
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
            <Text style={styles.title}>{marque ? "Modifier la marque" : "Créer une marque"}</Text>
            
            <TextInput 
                style={styles.input} 
                value={nomMarque} 
                onChangeText={setNomMarque} 
                placeholder="Nom de la marque" 
            />

            {marque ? (
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
