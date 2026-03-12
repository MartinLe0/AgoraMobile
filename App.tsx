import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

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

function MainStack() {
    return (
        <Stack.Navigator
            initialRouteName="pageConnexion"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="pageConnexion" component={Connexion} />
            <Stack.Screen name="pageMenu" component={Menu} />
            <Stack.Screen name="pageGererLesGenres" component={GererLesGenres} />
            <Stack.Screen name="pageDetailGenre" component={DetailGenre} />
            <Stack.Screen name="pageGererLesJeux" component={GererLesJeux} />
            <Stack.Screen name="pageDetailJeu" component={DetailJeu} />
            <Stack.Screen name="pageGererLesMarques" component={GererLesMarques} />
            <Stack.Screen name="pageGererLesPegi" component={GererLesPegi} />
            <Stack.Screen name="pageGererLesPlateformes" component={GererLesPlateformes} />
            <Stack.Screen name="pageDetailMarque" component={DetailMarque} />
            <Stack.Screen name="pageDetailPegi" component={DetailPegi} />
            <Stack.Screen name="pageDetailPlateforme" component={DetailPlateforme} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}
