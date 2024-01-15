import { ActivityIndicator, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Heading from '../../components/Heading'
import { usePackages } from "../../../contexts/packageContext";
import VerticalCard from '../../components/Cards/verticalCard';
// import { useTheme } from '../../../contexts/themeContext';
import { Colors } from '../../components/styles';


interface Props {
  navigation: any
}

export default function Packages({navigation}: Props) {
  const { getPackages, packages, loading } = usePackages();
    // const { theme } = useTheme()
    // let activeColors = Colors[theme.mode]
  useEffect(() => {
    console.log("loading", loading)
    getPackages("", "") 
  }, [])

  return (
    <View style={{marginTop: 20}}>
      <Heading heading={'Packages'} onPress={() => navigation.navigate("AllPackages")} isViewAll />
        {loading ? (
          <ActivityIndicator size="large" color={Colors.brand} />
        ) :
        <SafeAreaView>
          {packages.map((item: any) => (
              <VerticalCard 
                  packageDetail={item}
                  navigation={navigation}
                  key={item?.id}
                  heading={item?.name}
                  description={item?.description}
                  icon={item?.icon ? item?.icon : item?.category?.icon} 
              />
            ))}
        </SafeAreaView>
      }
    </View>
    
  )
}