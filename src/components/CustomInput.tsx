import React from 'react'
import { Text, TextInput, TextInputProps } from "react-native";
import { theme } from "../styles/Theme"

interface CustomInputProps extends TextInputProps
{
    label? : string
    marginBottom? : number
    placeholder : string
}

const CustomInput = ({ label, marginBottom = 0, placeholder, ...rest } : CustomInputProps) =>
{
    return (
        <>
            { label ? <Text style={theme.inputLabel}>{label}</Text> : <></>}
            <TextInput
                style={[theme.input, theme.shadows, { marginBottom: marginBottom }]}
                placeholder={placeholder}
                {...rest}
            />
        </>
    )
}

export default CustomInput