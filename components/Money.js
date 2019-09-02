import React, { useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

const Money = props => {
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
        alignSelf: "center",
        minWidth: 100,
        marginVertical: 10,
        paddingVertical: 5
    },
    text: {
        fontFamily: 'bree-serif',
        fontSize: 20,
        color: "white",
        alignSelf: "center"
    }
});

Money.propTypes = {
    amt: PropTypes.number.isRequired
}

Money.defaultProps = {
    amt: 0
}

export default Money;