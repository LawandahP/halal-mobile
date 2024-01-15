import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './styles';
import { useTheme } from '../../contexts/themeContext';


interface HeadingProps {
    heading: string
    isViewAll?: boolean
    onPress?: any
}


export default function Heading( {heading, isViewAll, onPress}: HeadingProps) {
    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      {isViewAll && 
        <TouchableOpacity>
          <Text 
            style={{color: activeColors.light, fontFamily: 'outfit'}}
            onPress={onPress}
            >
              View All
          </Text>
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: 5

    },

    heading: {
      fontSize: 18,
      fontFamily: 'outfit-medium',
      // marginBottom: 10,
      color: Colors.brand,
    },
  });