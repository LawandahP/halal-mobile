import React from "react";

import Login from "../screens/login";
import SignUp from "../screens/signup";

// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../components/styles";

// import BottomStack from './tabNavigator';
import { useTheme } from "../../contexts/themeContext";
import LandingScreen from "../screens/LandingScreen";

type RootStackParamList = {
  LandingScreen: undefined;
  Login: undefined;
  SignUp: { sort: "latest" | "top" } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode];

  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: activeColors.light,
        headerTransparent: true,
        headerTitle: "",
        // headerLeftContainerStyle: {
        //     paddingLeft: 20
        // },
      }}
      initialRouteName="LandingScreen"
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    // {/* </NavigationContainer> */}
  );
};

export default AuthStack;
