import React from "react";
import MainContainer from "../../components/mainContainer";
import Header from "./Header";
// import Slider from "./Slider";
import Categories from "./Categories";
import { View } from "react-native";
import { CategoriesProvider } from "../../../contexts/categoriesContext";
import Packages from "./Packages";
import { PackagesProvider } from "../../../contexts/packageContext";
// import { Colors } from "../../components/styles";


interface NavigationProps {
  navigation: any;
}

const HomeScreen = ({navigation}: NavigationProps) => {
  
  return (
    <MainContainer>
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
      
    </MainContainer>
  );
};


export default HomeScreen;
