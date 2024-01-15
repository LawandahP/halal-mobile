import React from 'react'
import { SafeAreaView , ScrollView, StyleSheet } from 'react-native'
import { Colors } from './styles';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../../contexts/themeContext';


interface MainProps {
    children: any,
    styles?: any,
}

const MainContainer = (props: MainProps) => {

    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary}]}>
            <ScrollView style={[{
                backgroundColor: activeColors.primary
            }, props.styles]}
                showsVerticalScrollIndicator={false}
                {...props}
            >
                {props.children}
                <StatusBar 
                    style={theme.mode == "dark" ? "light" : "dark"} 
                    backgroundColor={activeColors.primary} />
            </ScrollView>
        </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default MainContainer