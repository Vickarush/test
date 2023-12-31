import { useFonts } from "expo-font";

import { convertRFValue } from "../../../styles/spacing";
import React from "react";
import { Text, View } from "react-native";
import colors from "../../../styles/colors";
import Lottie from "lottie-react-native";
import joining_animation from "../../../assets/animation/joining_lottie.json";
export default function WaitingToJoinView() {
  const [loaded] = useFonts({// function for expo-font 
    ROBOTO_FONTS: require("../../../styles/fonts"),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Lottie
        source={joining_animation}
        autoPlay
        loop
        style={{
          height: 50,
          width: 50,
        }}
      />
      <Text
        style={{
          fontSize: convertRFValue(18),
          color: colors.primary[100],
          fontFamily: ROBOTO_FONTS.RobotoBold,
          marginTop: 28,
        }}
      >
        Creating a room
      </Text>
    </View>
  );
}
