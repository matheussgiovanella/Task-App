import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import PageContainer from '../components/PageContainer';

const LoadingScreen = () => {
    return (
        <PageContainer>
            <SafeAreaView>
                <ActivityIndicator
                    size="large"
                />
            </SafeAreaView>
        </PageContainer>
    );
}

export default LoadingScreen;