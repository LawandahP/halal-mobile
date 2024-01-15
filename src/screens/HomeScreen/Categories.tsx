// CategoriesComponent.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { useCategories } from '../../../contexts/categoriesContext';
import Heading from '../../components/Heading';
import { useTheme } from '../../../contexts/themeContext';
// import { useNavigation } from '@react-navigation/native';

interface CategoryProps {
  navigation: any;
}

const Categories = ({navigation}: CategoryProps) => {
  // const navigation = useNavigation()
  const { categories, loading } = useCategories();
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode]

  return (
    <View>
      <Heading heading={'Categories'} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.brand} />
      ) : (
        <SafeAreaView>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categories} 
            renderItem={({item}) => (
              <TouchableOpacity 
                style={styles.container}
                onPress={() => navigation.navigate('PackageList', {id:item?.id, category: item?.name})}>
                <View style={styles.categoryContainer}>
                  <View style={styles.inconContainer}>
                    <Image 
                      style={{width: 30, height: 30}}
                      source={{uri:item?.icon}} />
                  </View>
                  <Text style={{color: activeColors.light, fontFamily: 'outfit', fontSize: 12}}>{item?.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  
  categoryContainer: {
    alignItems: 'center',
  },
  inconContainer: {
    backgroundColor: Colors.lightGray,
    padding: 17,
    borderRadius: 99
  }
})
export default Categories;





