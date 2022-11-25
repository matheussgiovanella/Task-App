import React from 'react';
import { SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import DivContainer from '../components/DivContainer';
import PageContainer from '../components/PageContainer';

const ViewMenu = (props : any) => {
    return (
        <PageContainer>
            <SafeAreaView>
                <DivContainer>
                    <CustomButton
                        label="Navegar para ViewTasks"
                        disabled={false}
                        onPress={() => props.navigation.navigate("ViewTasks")}
                    />
                </DivContainer>
            </SafeAreaView>
        </PageContainer>
    );
}

export default ViewMenu;