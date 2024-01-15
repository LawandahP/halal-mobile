import { Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, View, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/themeContext';
import { Colors, InputIcon, StyledTextInput } from '../../components/styles';

import Heading from '../../components/Heading';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    hideModal: any
}

export default function BookingModal({hideModal}: Props) {
  const { theme } = useTheme();
  let activeColors = Colors[theme.mode];
  
  const [ date, setDate ] = useState(new Date())
  const [ showPicker, setShowPicker] = useState(false)
  
  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = (params: { type: any } , selectedDate: any) => {
    if (params.type = 'set') {
        const currentDate = selectedDate;
        setDate(currentDate)

        if (Platform.OS === "android") {
            toggleDatePicker()
            setDate(currentDate);
        }
    } else {
        toggleDatePicker()
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.primary }]}>
        <ScrollView style={{ backgroundColor: activeColors.primary }}>
            <TouchableOpacity 
                onPress={() => hideModal()}
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 20}}>
                <MaterialCommunityIcons name="window-close" size={25} color={activeColors.light} />
                <Text style={{fontFamily: 'outfit', color: activeColors.light, fontSize: 22}}>Booking</Text>
            </TouchableOpacity>
            
            <Heading heading={'Select Date'} />
            
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: activeColors.secondary,
                        // borderWidth: error ? 1 : 0,
                        // borderColor: error ? "red" : "",
                    },
                ]}
            >   
                <InputIcon>
                    <MaterialIcons name="date-range" size={27} color={Colors.brand} />
                </InputIcon>

                { showPicker && 
                    <DateTimePicker 
                        mode="date" 
                        display='spinner' 
                        value={date} 
                        onChange={onChange}
                    />
                }
                {
                    !showPicker &&
                    <Pressable onPress={toggleDatePicker}>
                        <StyledTextInput 
                            editable={false}
                            value={date.toLocaleDateString()}
                            onChangeText={setDate}
                            onPressIn={toggleDatePicker}
                        />
                    </Pressable>
                }
            </View>
           


            {/* <View style={styles.calenderContainer}>
                <DateTimePickerx
                    selectedItemColor={Colors.brand}
                    minimumDate={Date.now()}
                    value={value}
                    onValueChange={(date: any) => setValue(date)}
                />
            </View> */}
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    calenderContainer: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        backgroundColor: "#9ed1fb",
        borderRadius: 20
    },
    label: {
        marginVertical: 5,
        fontSize: 16,
    },
    inputContainer: {
        height: 60,
        flexDirection: "row",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
})