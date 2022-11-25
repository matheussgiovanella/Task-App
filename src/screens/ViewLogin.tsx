import base64 from 'base-64';
import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import DivContainer from '../components/DivContainer';
import PageContainer from '../components/PageContainer';

interface Usuario {
    email: string
    password: string
}

const ViewLogin = (props: any) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [usuario, setUsuario] = useState<Usuario>({ email: "", password: "" })

    const auth = async () => {
        setLoading(true)
        
        let res = await fetch('http://177.44.248.30:3333/auth',
            {
                method: 'POST',
                headers:
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64.encode(usuario.email + ':' + usuario.password)}`
                }
            })
        setLoading(false)
        if (res.status === 200) {
            setUsuario({ ...usuario, password: "" })
            setError(false)
            props.navigation.navigate('ViewMenu')
        }
        else {
            setError(true)
            Alert.alert("Erro", "Erro no Login")
        }
    }

    let errorStyle = styles.errorText
    if (error) {
        errorStyle = styles.errorTextDisplay
    }

    return (
        <PageContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            >
                <SafeAreaView>
                    <DivContainer>
                        {
                            loading ? <ActivityIndicator
                                style={{ marginTop: 10 }}
                                size="large"
                            />
                                :
                                <>
                                    <Text style={styles.text}>
                                        Fazer Login
                                    </Text>
                                    <CustomInput
                                        placeholder="Email"
                                        label="Email"
                                        keyboardType="default"
                                        marginBottom={10}
                                        autoCapitalize="none"
                                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                                        value={usuario.email}
                                    />
                                    <CustomInput
                                        placeholder="Password"
                                        label="Password"
                                        secureTextEntry
                                        keyboardType="default"
                                        marginBottom={0}
                                        onChangeText={(text) => setUsuario({ ...usuario, password: text })}
                                        value={usuario.password}
                                    />
                                    <Text style={errorStyle}>
                                        Erro no login
                                    </Text>
                                    <CustomButton
                                        label="Entrar"
                                        disabled={false}
                                        onPress={auth}
                                    />
                                </>
                        }
                    </DivContainer>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    input:
    {
        height: 48,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Ubuntu-Regular'
    },
    errorText:
    {
        color: "transparent",
        marginBottom: 20
    },
    errorTextDisplay:
    {
        color: "#ff2222",
        marginBottom: 20
    },
    text:
    {
        color: "#fff",
        fontSize: 24,
        textAlign: "left",
        marginBottom: 12,
        fontFamily: 'Ubuntu-Regular'
    }
})

export default ViewLogin;