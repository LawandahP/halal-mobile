import { ActivityIndicator, SafeAreaView, StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect } from 'react'
import { usePackages } from '../../../contexts/packageContext'
import { Colors } from '../../components/styles'
import VerticalCard from '../../components/Cards/verticalCard'
import { useTheme } from '../../../contexts/themeContext'
import CustomSwitch from './CustomSwitch'
import MainContainer from '../../components/mainContainer'


interface Props {
  navigation?: any;
}
export default function AllPackages({navigation}: Props) {
  const { packages, getPackages, loading } = usePackages()
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode]

  // function for filter
  // const [ tab, setTab ] = useState(1)

  const onSelectSwitch = (value: number) => {
    // setTab(value)
    console.log("Tab", value)
    getPackages("", value == 1 ? "Hourly Services" : value == 2 ? "Monthly Services" : "Hourly Services")
  }

  useEffect(() => {
    getPackages("", "Hourly Services")
    console.log("Packages", packages)
  }, []);
  
  return (
    <MainContainer>

      <View style={styles.container}>
        <CustomSwitch 
          selectionMode={1} 
          option1={'Hourly Packages'} 
          option2={'Monthly Packages'} 
          onSelectRun={onSelectSwitch}  
        />

            {loading ? (
              <ActivityIndicator size="large" color={Colors.brand} />
            ) : (
              <>
                {packages?.map((item: any) => (
                  <VerticalCard 
                      packageDetail={item}
                      navigation={navigation}
                      key={item?.id}
                      heading={item?.name}
                      description={item?.description}
                      icon={item?.icon ? item?.icon : item?.category?.icon} 
                  />
                ))}
              </>
            )
          }
      </View>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});