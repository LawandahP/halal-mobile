import React from "react";
import MainContainer from "../../components/mainContainer";
import Header from "./Header";
// import Slider from "./Slider";
import Categories from "./Categories";
import { ScrollView, View, StyleSheet } from "react-native";
import { CategoriesProvider } from "../../../contexts/categoriesContext";
import Packages from "./Packages";
import { PackagesProvider } from "../../../contexts/packageContext";
import { useTheme } from "../../../contexts/themeContext";
import { Colors } from "../../components/styles";
// import { Colors } from "../../components/styles";


interface NavigationProps {
  navigation: any;
}

const HomeScreen = ({navigation}: NavigationProps) => {
  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];
  return (
    // <MainContainer>
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <ScrollView style={{ backgroundColor: activeColors.primary }}>
      <Header />
      {/* <Slider /> */}
      <View style={{padding: 20}}>
        <CategoriesProvider>
          <Categories navigation={navigation} />
        </CategoriesProvider>
        <PackagesProvider>
          <Packages navigation={navigation}/>
        </PackagesProvider> 
      </View>
      </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeScreen;

