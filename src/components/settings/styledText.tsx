import React from 'react'
import { Colors } from '../styles';
import { Text } from 'react-native';



interface TextProps {
    styles?: any;
    small?: boolean;
    big?: boolean;
    bold?: boolean;
    children: any;
}

const StyledText = (props:TextProps) => {
    let activeColors = Colors;
    return (
        <Text
            style={[
                {
                    color: activeColors.brand,
                    fontSize: props.small ? 14 : props.big ? 24 : 16,
                    fontWeight: props.bold || props.big ? "bold" : "normal",
                    fontFamily: 'outfit'
                },
                props.styles
            ]}
            {...props}
        >
            {props.children}
        </Text>
    )
}

export default StyledText