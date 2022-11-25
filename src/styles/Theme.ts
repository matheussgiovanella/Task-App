import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window')

export const theme = StyleSheet.create(
    {
        input:
        {
            height: 48,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            fontFamily: 'Ubuntu-Regular'
        },
        inputLabel:
        {
            color: "#fff",
            fontSize: 18,
            textAlign: "left",
            marginBottom: 10,
            fontFamily: 'Ubuntu-Regular'
        },
        buttonDefault:
        {
            backgroundColor: "#3355ff",
            borderRadius: 10,
            padding: 4,
        },
        buttonDisabled:
        {
            backgroundColor: "#848484",
            borderRadius: 10,
            padding: 4,
        },
        buttonText:
        {
            color: "#fff",
            textAlign: "center",
            fontSize: 24,
            fontFamily: 'Ubuntu_700Bold'
        },
        container:
        {
            flex: 1,
            backgroundColor: '#333',
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            fontFamily: 'Ubuntu-Regular'
        },
        div:
        {
            width: width * 0.9,
            backgroundColor: "#535353",
            borderRadius: 10,
            margin: 24,
            padding: 12,
            justifyContent: "space-between",
            fontFamily: 'Ubuntu-Regular'
        },
        shadows:
        {
            shadowColor: "#000",
            shadowOffset:
            {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
        }
    }
)