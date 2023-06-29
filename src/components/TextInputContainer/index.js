import React from "react";
import { View, TextInput } from "react-native";
import colors from "../../styles/colors";
//import { ROBOTO_FONTS } from "../../styles/fonts";
import { useFonts } from "expo-font";

const TextInputContainer = ({ placeholder, value, setValue }) => {
  const [loaded] = useFonts({// function for expo-font 
    ROBOTO_FONTS: require("../../styles/fonts"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202427",
        borderRadius: 12,
        marginVertical: 12,
      }}
    >
      <TextInput
        style={{
          margin: 8,
          padding: 8,
          width: "90%",
          textAlign: "center",
          fontSize: 16,
          color: colors.primary[100],
          fontFamily: Fonts.ROBOTO_FONTS.RobotoBold,
        }}
        multiline={true}
        numberOfLines={1}
        cursorColor={"#5568FE"}
        placeholder={placeholder}
        placeholderTextColor={"#9A9FA5"}
        onChangeText={(text) => {
          setValue(text);
        }}
        value={value}
      />
    </View>
  );
};

export default TextInputContainer;
