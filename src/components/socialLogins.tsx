import { View, TouchableOpacity, StyleSheet } from 'react-native'

import GoogleSVG from '../../assets/images/google.svg';
import TwitterSVG from '../../assets/images/twitter.svg'
import FacebookSVG from '../../assets/images/facebook.svg'

const SocialLogins = () => {
  return (
    <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
            <GoogleSVG height={24} width={24}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <FacebookSVG height={24} width={24}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <TwitterSVG height={24} width={24}/>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    view: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },

    button: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10
    }
})

export default SocialLogins