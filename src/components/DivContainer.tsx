import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions, ViewStyle, ViewProps } from 'react-native';
import { theme } from "../styles/Theme"

const { height, width } = Dimensions.get('window')

interface DivContainerProps extends ViewProps
{
    children : ReactNode
    style? : ViewStyle
}

const DivContainer = ({ children, style, ...rest } : DivContainerProps) => {
    return (
        <View
            style={[theme.div, theme.shadows, style]}
            {...rest}
        >
            {children}
        </View>
    );
}

export default DivContainer;