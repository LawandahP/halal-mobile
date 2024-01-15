import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import CustomButton from '../../components/CustomButton'

interface Props {
    navigation: any;
  }

export default function LandingScreen(props: Props) {
  return (
    <View style={styles.container}>
        {/* <Text>Vader</Text> */}
        <Image
            style={styles.landingImage} 
            source={require('../../../assets/cleaner1.jpg')}
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize: 27, color: Colors.WHITE, textAlign: 'center', fontFamily: 'outfit'}}>
                Find
             <Text style={{fontFamily: 'outfit-bold'}}> Professional Cleaning </Text>Services
            </Text>

            <Text style={{fontSize: 17, color: Colors.WHITE, marginTop: 20, textAlign: 'center', paddingBottom: 10, fontFamily: 'outfit'}}>
                Best Platform to Find services near you which deliver professional services 
            </Text>

            <CustomButton onPress={() => props.navigation.navigate("Login")} text={'Get Started'} type={'SECONDARY'} bgColor={''} fgColor={''} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    landingImage: {
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderRadius: 15
    },
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    }
})