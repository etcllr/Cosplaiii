import { Redirect } from "expo-router";
import { useFirstTimeOpen } from "../hooks/useFirstTimeOpen";

export default function Index() {
    const { isFirstTime, isLoading } = useFirstTimeOpen();

    if (isLoading) {
        return null;
    }

    return isFirstTime ? <Redirect href="/onboarding" /> : <Redirect href="/(tabs)" />;
}
