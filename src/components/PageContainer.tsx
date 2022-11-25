import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from "../styles/Theme"

interface PageContainerProps
{
    children : ReactNode
}

const PageContainer = ({children, ...rest} : PageContainerProps) => {
    return (
        <View
            style={theme.container}
            {...rest}
        >
            {children}
        </View>
    );
}

export default PageContainer;