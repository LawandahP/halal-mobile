import React, { useContext } from "react";
import { Colors } from "../styles";
import { StyleSheet, View } from "react-native";
import StyledText from "./styledText";
import {
  ThemeContext,
  ThemeContextValue,
} from "../../../contexts/themeContext";

interface TextProps {
  label: any;
  children: any;
}

const SettingsItem = (props: TextProps) => {
  const { theme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  return (
    <View
      style={[{ backgroundColor: activeColors.secondary }, styles.settingsItem]}
      {...props}
    >
      <StyledText
        styles={[
          {
            color: activeColors.light,
          },
        ]}
      >
        {props.label}
      </StyledText>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 25,
    marginBottom: 2,
  },
});

export default SettingsItem;
