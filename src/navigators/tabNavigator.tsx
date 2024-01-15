import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Colors } from "../components/styles";

import { Ionicons } from "@expo/vector-icons";
import { ThemeContext, ThemeContextValue } from "../../contexts/themeContext";
import Settings from "../screens/settings";
import AuthenticatedStack from "./authenticatedStack";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { theme } = useContext<ThemeContextValue>(ThemeContext);
  let activeColors = Colors[theme.mode];

  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: activeColors.brand,
        tabBarInactiveTintColor: activeColors.light,
        tabBarStyle: {
          backgroundColor: activeColors.secondary,
        },
        // tabBarShowLabel: false,
        // headerTitleAlign: "left",
        // headerTitleStyle: {
        //     paddingLeft: 10,
        //     // marginTop: 30
        // },
        headerShown: false,
        headerTintColor: activeColors.brand,
        headerTransparent: true,
        headerTitle: "",
        
      })}
    >
      <Tab.Screen name="Home" component={AuthenticatedStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default BottomNavigator;
