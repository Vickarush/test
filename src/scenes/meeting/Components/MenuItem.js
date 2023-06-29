import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../../../styles/colors";
import { useFonts } from "expo-font";
import { convertRFValue } from "../../../styles/spacing";

export default function MenuItem({ title, description, icon, onPress }) {
  const [loaded] = useFonts({// function for expo-font 
    ROBOTO_FONTS: require("../../../styles/fonts"),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 18,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        {icon && (
          <View
            style={{
              marginRight: 14,
            }}
          >
            {icon}
          </View>
        )}

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontFamily: ROBOTO_FONTS.RobotoMedium,
              color: colors.primary[100],
              fontSize: convertRFValue(12),
            }}
          >
            {title}
          </Text>

          {description && (
            <Text
              style={{
                fontFamily: ROBOTO_FONTS.Roboto,
                color: colors.primary[400],
                fontSize: convertRFValue(12),
              }}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
