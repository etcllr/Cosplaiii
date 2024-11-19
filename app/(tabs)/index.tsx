import React from "react";
import {CameraView} from "expo-camera";
import {View} from "react-native";

export default function HomeScreen() {
    const cameraRef = React.useRef<CameraView>(null);

    return (
        <View style={{ flex: 1 }}>
            <CameraView ref={cameraRef} style={{ flex: 1 }} />
        </View>
    );
}
