import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/themeContext';
import { Colors } from '../../components/styles';
import { useAuth } from '../../../contexts/authContext';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {

  const { t } = useTranslation();
  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];
  const { userInfo } = useAuth();

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../../assets/images/image1.jpg")}
            style={styles.userImage}
          />
          <View>
            <Text style={{ color: Colors.white, fontFamily: 'outfit'}}>{t("hello")}</Text>
            <Text style={{ fontSize: 17, color: Colors.white,  fontFamily: 'outfit-medium'}}>
              {userInfo?.full_name}
            </Text>
          </View>
        
        </View>
        <Feather name="bookmark" size={24} color={Colors.white} />
      </View>

      {/* SearchBar Section */}
      <View style={styles.searchButtonContainer}>
        <TextInput
          style={styles.search}
          placeholder={`${t("search")}`}
          placeholderTextColor={activeColors.darkLight}
        />
         <FontAwesome
          name="search"
          size={24}
          style={styles.searchBtn}
          color={Colors.brand}
        />
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
    search: {
      backgroundColor: Colors.white,
      borderRadius: 8,
      padding: 7,
      paddingHorizontal: 16,
      width: '85%',
      fontSize: 16,
      fontFamily: 'outfit'
    },

    userImage: {
      width: 45,
      height: 45,
      borderRadius: 99,
      borderWidth: 1,
      // borderColor: activeColors.brand,
    },
  
    container: {
      padding: 20,
      paddingTop: 50,
      backgroundColor: Colors.brand,
      borderBottomLeftRadius:25,
      borderBottomRightRadius: 25
    },

    profileContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    },

    profileMainContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    searchButtonContainer: {
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    },

    searchBtn: {
      backgroundColor: Colors.white,
      padding: 10,
      borderRadius: 8
    }
  });