import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../styles/colors";
import { useFonts } from "expo-font";

const Button = ({
  text,
  backgroundColor,
  onPress,
  style = {},
  textStyle = {},
}) => {
  const [loaded] = useFonts({// function for expo-font 
    ROBOTO_FONTS: require("../../styles/fonts"),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor ? backgroundColor : "#5568FE",
        borderRadius: 12,
        marginVertical: 12,
        ...style,
      }}
    >
      <Text
        style={{
          color: colors.primary["100"],
          fontSize: 16,
          fontFamily: ROBOTO_FONTS.RobotoBold,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
