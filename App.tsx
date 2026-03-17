import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

import Connexion from "./screens/connexion";
import Menu from "./screens/menu";
import GererLesGenres from "./screens/gererLesGenres";
import DetailGenre from "./screens/detailGenre";
import GererLesJeux from "./screens/gererLesJeux";
import DetailJeu from "./screens/detailJeu";
import GererLesMarques from "./screens/gererLesMarques";
import GererLesPegi from "./screens/gererLesPegi";
import GererLesPlateformes from "./screens/gererLesPlateformes";
import DetailMarque from "./screens/detailMarque";
import DetailPegi from "./screens/detailPegi";
import DetailPlateforme from "./screens/detailPlateforme";

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="pageMenu" component={Menu} options={{ title: 'Menu' }} />
            <Stack.Screen name="pageGererLesGenres" component={GererLesGenres} options={{ title: 'Genres' }} />
            <Stack.Screen name="pageDetailGenre" component={DetailGenre} options={{ title: 'Détail Genre' }} />
            <Stack.Screen name="pageGererLesJeux" component={GererLesJeux} options={{ title: 'Jeux' }} />
            <Stack.Screen name="pageDetailJeu" component={DetailJeu} options={{ title: 'Détail Jeu' }} />
            <Stack.Screen name="pageGererLesMarques" component={GererLesMarques} options={{ title: 'Marques' }} />
            <Stack.Screen name="pageGererLesPegi" component={GererLesPegi} options={{ title: 'PEGI' }} />
            <Stack.Screen name="pageGererLesPlateformes" component={GererLesPlateformes} options={{ title: 'Plateformes' }} />
            <Stack.Screen name="pageDetailMarque" component={DetailMarque} options={{ title: 'Détail Marque' }} />
            <Stack.Screen name="pageDetailPegi" component={DetailPegi} options={{ title: 'Détail PEGI' }} />
            <Stack.Screen name="pageDetailPlateforme" component={DetailPlateforme} options={{ title: 'Détail Plateforme' }} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="pageConnexion" component={Connexion} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
        return subscriber; // unsubscribe on unmount
    }, [initializing]);

    if (initializing) return null; // Or a loading screen

    return (
        <NavigationContainer>
            {user ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
