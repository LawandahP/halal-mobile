import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../../../contexts/themeContext'
import { Colors } from '../styles';


interface VerticalCardProps {
    heading: string,
    description: string,
    icon?: any
    navigation?: any
    packageDetail?: any
}
export default function VerticalCard({heading, description, icon, navigation, packageDetail}: VerticalCardProps) {
    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate("PackageDetails", {package: packageDetail})}
            style={
            [styles.container, {backgroundColor: activeColors.secondary,shadowColor: activeColors.primary}
        ]}>
            <Image style={styles.image} source={{uri:icon}} />
            <View>
                <Text style={{color: activeColors.light, fontFamily: 'outfit-bold'}}>{heading}</Text>
                <Text style={{color: activeColors.light, fontFamily: 'outfit'}}>{description}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 10,
        // shadowOffset: { width: 0, height: 4},
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        gap: 10,
        shadowOpacity: 0.1,
        borderRadius: 10,
        marginVertical: 5,
        // alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    }
})