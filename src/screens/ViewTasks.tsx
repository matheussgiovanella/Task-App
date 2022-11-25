import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Keyboard } from 'react-native';
import LottieView from 'lottie-react-native'
import Checkbox from 'expo-checkbox'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from "../components/CustomButton"
import DivContainer from "../components/DivContainer"
import PageContainer from "../components/PageContainer"
import CustomInput from '../components/CustomInput';

const ViewTasks = (props : any) => {
    const [taskList, setTaskList] = useState([])
    const [taskItem, setTaskItem] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {

        const getTasks = async () => {

            const asyncTaskList = await AsyncStorage.getItem("@taskList")
            if (asyncTaskList)
            {
                setTaskList(JSON.parse(asyncTaskList))
            }
        }

        getTasks()
    }, [])

    const [isKeyboardUp, setIsKeyBoardUp] = useState(false)

    Keyboard.addListener("keyboardDidShow", () => setIsKeyBoardUp(true))
    Keyboard.addListener("keyboardDidHide", () => setIsKeyBoardUp(false))

    const addItem = async () => {
        if (taskItem !== "") {
            const newTask =
            {
                id: String(new Date().getTime()),
                name: taskItem,
                done: false
            }

            const orderTaskList = [...taskList, newTask]
                .sort((a, b) => (a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)))

            setTaskList(orderTaskList)
            setTaskItem("")
            setError(false)

            await AsyncStorage.setItem("@taskList", JSON.stringify(orderTaskList))
        }
        else {
            setError(true)
            Alert.alert("Erro", "Tarefa não pode ficar em branco")
        }
    }
    const handleDeleteItem = (id : string, name : string) => {
        Alert.alert("Atenção", `Deseja excluir a tarefa ${name}?`, [
            {
                text: "Sim",
                onPress: (async () => {
                    const newTaskList = [...taskList.filter((item) => item.id !== id)]
                    setTaskList(newTaskList)
                    await AsyncStorage.setItem("@taskList", JSON.stringify(newTaskList))
                })
            },
            {
                text: "Não"
            }
        ])
    }
    const handleCheckTask = async (id : string) => {
        const newTaskList = taskList.map((item) => {
            if (item.id === id) {
                return { ...item, done: !item.done }
            }
            return item
        })
        setTaskList(newTaskList)
        await AsyncStorage.setItem("@taskList", JSON.stringify(newTaskList))
    }

    let errorStyle = styles.errorText
    if (error) {
        errorStyle = styles.errorTextDisplay
    }

    return (
        <PageContainer>
            <DivContainer>
                <Text style={styles.text}>
                    Adicionar Tarefa
                </Text>
                <CustomInput
                    placeholder="Digite a tarefa"
                    keyboardType="default"
                    onChangeText={(text) => setTaskItem(text)}
                    value={taskItem}
                />
                <Text style={errorStyle}>
                    Tarefa não pode ficar em branco
                </Text>
                <CustomButton
                    label="Salvar"
                    disabled={false}
                    onPress={addItem}
                />
            </DivContainer>

            <DivContainer style={{ flex: 1, justifyContent: "flex-start" }}>
                <ScrollView contentContainerStyle={{ flex: taskList.length > 0 || isKeyboardUp ? 0 : 1 }} style={{ flex: 1 }}>
                    <Text style={[styles.text, { borderBottomColor: "#fff", borderBottomWidth: 1 }]}>
                        Tarefas
                    </Text>
                    {
                        taskList.length > 0 ?
                            taskList.map((item) => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={1}
                                        onPress={() => handleCheckTask(item.id)}
                                        onLongPress={() => handleDeleteItem(item.id, item.name)}
                                    >
                                        <View style={styles.listItem}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Checkbox
                                                    value={item.done}
                                                    onValueChange={() => handleCheckTask(item.id)}
                                                    color={item.done ? "#848484" : "#848484"}
                                                />
                                                <Text style={[styles.listItemText, { textDecorationLine: item.done ? 'line-through' : 'none' }]}>{item.name}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => handleDeleteItem(item.id, item.name)}>
                                                <FontAwesome5 name="trash-alt" size={24} color="#ff4444" />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                                <LottieView
                                    autoPlay
                                    loop={true}
                                    style={
                                        {
                                            width: 200,
                                            height: 200
                                        }
                                    }
                                    source={require('../assets/animations/93134-not-found.json')}
                                />
                                <Text style={[styles.text, { textAlign: "center" }]}>Lista Vazia</Text>
                            </View>
                    }
                </ScrollView>
            </DivContainer>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
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
    },
    listItem:
    {
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 10,
        justifyContent: "space-between"
    },
    listItemText:
    {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'Ubuntu-Regular'
    }
})

export default ViewTasks;