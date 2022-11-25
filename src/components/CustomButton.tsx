import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../styles/Theme"

interface CustomButtonProps extends TouchableOpacityProps
{
    label : string
    disabled? : boolean
}

const CustomButton = ({ label, disabled = false, ...rest } : CustomButtonProps) =>
{
    let style = theme.buttonDefault
    
    if (disabled)
    {
        style = theme.buttonDisabled
    }

    return (
        <TouchableOpacity
            style={[style, theme.shadows]}
            disabled={disabled}
            {...rest}
        >
            <Text style={theme.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton