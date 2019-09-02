import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";

const GameButton = props => {
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
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderColor: 'white',
        borderWidth: 4,
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

GameButton.proptypes = {
    children: PropTypes.node,
    onPressed: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object
}

export default GameButton;