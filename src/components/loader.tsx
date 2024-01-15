import { ActivityIndicator, View } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/themeContext";

const Loader = () => {
  const { theme } = useTheme();
  let activeColors = theme.mode;
  return (
    <View
      style={{
        // flex:1, justifyContent: 'center',
        paddingBottom: 7,
        alignContent: "center",
        borderColor: activeColors.light,
      }}
    >
      <ActivityIndicator size={"small"} />
    </View>
  );
};

export default Loader;
