import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Empêcher l'écran de chargement de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="onboarding"
                    options={{
                        headerShown: false,
                        animation: "fade",
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
