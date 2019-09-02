import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAvailableAmount } from '../store/actions/money';

const startupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            let score = await AsyncStorage.getItem('score');
            if (!score || isNaN(score)) {
                score = 1000;
            }
            props.navigation.navigate('Games');
            dispatch(setAvailableAmount(+score));
        }
        tryLogin();
    }, []);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color="purple" />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default startupScreen;