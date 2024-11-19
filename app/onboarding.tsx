import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    useWindowDimensions,
    ScrollView
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
    const {width} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = React.useState(0);
    const scrollViewRef = React.useRef<ScrollView>(null);

    const slides = React.useMemo(() => [
        {
            title: "Capture Your Story",
            subtitle: "Take amazing photos and videos with our powerful camera",
            icon: "📸"
        },
        {
            title: "Share Instantly",
            subtitle: "Connect with friends through instant sharing",
            icon: "🎭"
        },
        {
            title: "Save Memories",
            subtitle: "Keep your favorite moments in your gallery",
            icon: "💫"
        }
    ], []);

    const handleContinue = React.useCallback(async () => {
        if (currentPage < slides.length - 1) {
            setCurrentPage(prev => prev + 1);
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    x: width * (currentPage + 1),
                    animated: true
                });
            }
        } else {
            await AsyncStorage.setItem("hasOpened", "true");
            router.replace("/(tabs)");
        }
    }, [currentPage, slides.length]);

    const renderDots = () => {
        return slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
            });

            return (
                <Animated.View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            opacity,
                            transform: [{scale: opacity}]
                        }
                    ]}
                />
            );
        });
    };

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                )}
                onMomentumScrollEnd={(e) => {
                    const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentPage(newPage);
                }}
                scrollEventThrottle={16}
            >
                {slides.map((slide, index) => (
                    <View key={index} style={[styles.slide, {width}]}>
                        <View style={styles.iconContainer}>
                            <ThemedText style={styles.icon}>{slide.icon}</ThemedText>
                        </View>
                        <ThemedText style={styles.title}>{slide.title}</ThemedText>
                        <ThemedText style={styles.subtitle}>{slide.subtitle}</ThemedText>
                    </View>
                ))}
            </Animated.ScrollView>

            <View style={styles.pagination}>
                {renderDots()}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleContinue}
            >
                <ThemedText style={styles.buttonText}>
                    {currentPage === slides.length - 1 ? "Get Started" : "Continue"}
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 60,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    icon: {
        fontSize: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        maxWidth: '80%',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        marginBottom: 10,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        marginHorizontal: 40,
        marginBottom: 40,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
});
