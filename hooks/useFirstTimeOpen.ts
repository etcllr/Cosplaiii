import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFirstTimeOpen() {
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkFirstTimeOpen() {
            try {
                const hasOpened = await AsyncStorage.getItem("hasOpened");
                setIsFirstTime(hasOpened === null);
            } catch (error) {
                console.error("Failed to check if first time opening the app", error);
            } finally {
                setIsLoading(false);
            }
        }
        checkFirstTimeOpen();
    }, []);

    return { isFirstTime, isLoading };
}
