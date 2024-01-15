import React, { useContext } from "react";
// import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Colors } from "../components/styles";
import History from "../screens/history";
import Book from "../screens/book";
import CustomDrawer from "../components/customDrawer";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Settings from "../screens/settings";
import BottomNavigator from "./tabNavigator";
import { ThemeContext, ThemeContextValue } from "../../contexts/themeContext";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

// type RootStackParamList = {
//   Home: undefined;
//   History: undefined;
//   Book: undefined;
//   Settings: undefined;
// };

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const { t } = useTranslation();

  const { theme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  return (
    // <NavigationContainer>
    <Drawer.Navigator
      // defaultStatus='open'
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: activeColors.primary,
        },
        drawerPosition: I18nManager.isRTL ? "right" : "left",
        headerTintColor: activeColors.light,
        drawerActiveBackgroundColor: activeColors.brand,
        drawerActiveTintColor: activeColors.light,
        drawerInactiveTintColor: activeColors.light,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name={t("home")}
        component={BottomNavigator}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="home-outline"
              size={20}
              style={{ color: activeColors.light }}
            />
          ),
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name={t("history")}
        component={History}
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="history"
              size={20}
              style={{ color: activeColors.light }}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={t("book")}
        component={Book}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="add-circle-outline"
              size={20}
              style={{ color: activeColors.light }}
            />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={t("settings")}
        component={Settings}
        options={{
          drawerIcon: () => (
            <Ionicons
              name="settings-outline"
              size={20}
              style={{ color: activeColors.light }}
            />
          ),

          // headerShown: false
        }}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default AppStack;
