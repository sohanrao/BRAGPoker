import React, { useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';

const money = props => {

    const playing = useSelector(state => state.cards.playing);

    useEffect(() => {
        if (playing) {
            AsyncStorage.setItem(
                'score',
                props.amt.toString()
            );
        }
    }, [props.amt, playing]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{'$'+props.amt}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        padding: 15
    },
    text: {
        fontFamily: 'bree-serif',
        fontSize: 20,
        color: "white"
    }
});

export default money;