import React from "react";
import ParticipantListItem from "./ParticipantListItem";
import { FlatList, View, Text } from "react-native";
import colors from "../../../../styles/colors";
import { useFonts } from "expo-font";

function ParticipantListViewer({ participantIds }) {
  const [loaded] = useFonts({// function for expo-font 
    ROBOTO_FONTS: require("../../../../styles/fonts"),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "#2B3034",
      }}
    >
      <View
        style={{
          height: 42,
          marginTop: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: colors.primary[100],
            fontFamily: ROBOTO_FONTS.RobotoBold,
          }}
        >
          Participants ({participantIds.length})
        </Text>
      </View>
      <FlatList
        data={participantIds}
        keyExtractor={(item) => `${item}_participant`}
        style={{ marginBottom: 4 }}
        renderItem={({ item }) => {
          return <ParticipantListItem participantId={item} />;
        }}
      />
    </View>
  );
}

export default ParticipantListViewer;