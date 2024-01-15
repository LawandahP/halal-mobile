import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../../contexts/themeContext';
import { Colors } from '../../components/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { usePackages } from '../../../contexts/packageContext';
import BookingModal from './BookingModal';


export default function PackageDetailScreen() {
  const params = useRoute().params;
  const [showModal, setShowModal] = useState(false)

  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];

  const { markAsFavourite, loadingFavourite, getPackageDetail, packageDetail} = usePackages()

  const paragraphs = packageDetail?.description.split('\\n');

  useEffect(() => {
    getPackageDetail(params?.package?.id)
    console.log("Deets", packageDetail)
  }, [loadingFavourite]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <ScrollView style={{ backgroundColor: activeColors.primary }}>
        <Image style={styles.image} source={{ uri: packageDetail?.icon }} />
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={{ fontFamily: 'outfit-bold', color: activeColors.light, fontSize: 20 }}>
                {packageDetail?.name}
              </Text>
              <Text style={{fontFamily: 'outfit', fontSize: 15, color: Colors.brand}}>
                {packageDetail?.package_type}
              </Text>
            </View>
            
            <TouchableOpacity onPress={() => markAsFavourite(packageDetail.id, !packageDetail.is_favourite)}>
              <MaterialIcons 
                name={packageDetail?.is_favourite ? "favorite" : "favorite-border"} 
                size={30} color={packageDetail?.is_favourite ? Colors.brand : activeColors.light} 
              />
            </TouchableOpacity>
            
          </View>
          

          {paragraphs?.map((paragraph: any, index: any) => (
            <Text key={index} style={{ fontFamily: 'outfit', color: activeColors.light }}>
              {paragraph}
            </Text>
          ))}

        </View>
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.bookBtn} onPress={() => setShowModal(true)}>
          <Text style={{fontFamily: 'outfit-medium', textAlign: 'center', fontSize: 15, color: Colors.white}}>Book Service</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType='slide'
        visible={showModal}>
        <BookingModal hideModal={() => setShowModal(false)}/>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
  },
  image: {
    width: '100%',
    height: 300,
  },
  container: {
    flex: 1,
  },
  bookBtn: {
    padding: 15,
    backgroundColor: Colors.brand,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  }
});
