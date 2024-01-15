import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ListPackages from '../screens/Packages/ListPackages';
import { useTheme } from '../../contexts/themeContext';
import { Colors } from '../components/styles';
import HomeScreen from '../screens/HomeScreen';
import { PackagesProvider } from '../../contexts/packageContext';
import { Text, TouchableOpacity } from 'react-native';
import AllPackages from '../screens/Packages/AllPackages';
import PackageDetailScreen from '../screens/Packages/PackageDetailScreen';
import { FontAwesome } from '@expo/vector-icons';

type RootStackParamList = {
    PackageList: any;
    Home: any;
    AllPackages: any;
    PackageDetails: any
  };
  
export default function AuthenticatedStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode]
  // const param = useRoute().params
  
  return (

    <PackagesProvider>
      <Stack.Navigator
        
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: activeColors.light,
          headerTransparent: true,
          // headerTitle: "",
          // set headerTutle according to rooute
          headerTitle: () => {
            if (route.name === "Home") {
              return null
            } else if (route.name == "PackageList") {
              return <Text style={{
                fontFamily: 'outfit-medium', 
                fontSize: 20,
                color: activeColors.light
              }}>{route?.params?.category}</Text>
            } else if (route.name == "AllPackages"){
              return <Text style={{
                fontFamily: 'outfit-medium', 
                fontSize: 20,
                color: activeColors.light
              }}>Packages</Text>
            } else {
              return ""
            }
          },
          navigationBarColor: activeColors.secondary,
          // headerLeftContainerStyle: {
          //     paddingLeft: 20
          // },
        })}
      //   initialRouteName="PackageList"
      >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PackageList" component={ListPackages} />
          <Stack.Screen name="AllPackages" component={AllPackages} />
          <Stack.Screen name="PackageDetails" component={PackageDetailScreen} />
      </Stack.Navigator>
    </PackagesProvider>
  )
}