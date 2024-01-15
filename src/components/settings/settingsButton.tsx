import React, { useContext } from "react";
import { Colors } from "../styles";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "./styledText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ThemeContext,
  ThemeContextValue,
} from "../../../contexts/themeContext";

interface TextProps {
  label: string;
  icon?: any;
  isActive: boolean;
  onPress: () => void;
}

const SettingsButton = (props: TextProps) => {
  const { theme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  return (
    <TouchableOpacity
      style={[{ backgroundColor: activeColors.secondary }, styles.settingsItem]}
      onPress={props.onPress}
    >
      <View style={styles.labelGroup}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={props.icon}
          size={24}
          color={activeColors.light}
        />
        <StyledText
          styles={[
            {
              color: activeColors.light,
            },
          ]}
        >
          {props.label}
        </StyledText>
      </View>

      <MaterialCommunityIcons
        style={styles.icon}
        name={
          props.isActive
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={24}
        color={props.isActive ? activeColors.brand : activeColors.darkLight}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 25,
    marginBottom: 2,
  },
});

export default SettingsButton;
