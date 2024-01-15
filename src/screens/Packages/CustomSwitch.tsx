import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../../../contexts/themeContext';
import { Colors } from '../../components/styles';


interface Props {
    // onPress: () => {}
    onSelectRun: any
    option1?: any
    option2?: any
    selectionMode: any
}

export default function CustomSwitch(props: Props) {
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode];
  
  const [ selectedMode, setSelectionMode ] = useState(props.selectionMode)
  const updateSwitchData = (value: any) => {
    setSelectionMode(value);
    props.onSelectRun(value)
  }

  return (
    <View style={[styles.container, {backgroundColor: activeColors.secondary}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: selectedMode == 1 ? Colors.brand : activeColors.secondary}]}
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        >
        <Text style={{fontFamily: 'outfit-medium', color: Colors.white}}>
            {props.option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: selectedMode == 2 ? Colors.brand : activeColors.secondary}]}
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        >
        <Text style={{fontFamily: 'outfit-medium', color: Colors.white}}>
            {props.option2}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 15,
        height: 44,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    button: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})