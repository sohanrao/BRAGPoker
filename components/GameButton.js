import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const gameButton = props => {
    const { children, onPressed, disabled } = props;
    return (
        <TouchableOpacity onPress={onPressed} style={{...props.style}} disabled={disabled}>
            <View style={styles.button}>
                <Text style={[styles.buttonText, disabled ? styles.disabledText : null]}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FC4445',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 13,
        elevation: 5
    },
    buttonText: {
        color: 'white',
        fontFamily: 'bree-serif',
        fontSize: 20
    },
    disabledText: {
        opacity: 0.3
    },
});

export default gameButton;