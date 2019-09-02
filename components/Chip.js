import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";

const CHIP_VALUES = {
    blue: 1,
    yellow: 5,
    green: 25,
    red: 50,
    black: 100
}

const getChipColor = value => {
    const color = Object.keys(CHIP_VALUES).find(key => CHIP_VALUES[key] === value);
    return color || 'red';
}

const Chip = props => {
    const { value, pressed, position } = props;
    const color = getChipColor(value);
    const classes = {
        chip: color + 'Chip',
        inner: color + 'ChipInner',
        amount: color + 'Amount',
        small: 'smallText'
    };
    const smallText = value && value.toString().split('').length > 2;

    return (
        <TouchableOpacity onPress={pressed} style={[position, styles.chip, styles[classes.chip]]}>
            <View style={[styles.chipInner, styles[classes.inner]]}>
                <Text 
                    style={
                        [styles.amount, 
                          styles[classes.amount], 
                          smallText ? styles[classes.small] : null
                        ]}>
                    {value}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chip: {
        borderColor: "white",
        borderWidth: 6,
        borderStyle: "dotted",
        borderRadius: 25,
        width: 50,
        height: 50,
        elevation: 7,
        padding: 5,
    },
    blueChip: {
        backgroundColor: "darkblue",
    },
    yellowChip: {
        backgroundColor: "orange",
    },
    greenChip: {
        backgroundColor: "darkgreen",
    },
    redChip: {
        backgroundColor: "#cc0000",
    },
    blackChip: {
        backgroundColor: "black",
    },
    chipInner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 22,
        borderStyle: "solid"
    },
    blueChipInner: {
        borderColor: "blue"
    },
    yellowChipInner: {
        borderColor: "yellow"
    },
    greenChipInner: {
        borderColor: "green"
    },
    redChipInner: {
        borderColor: "salmon"
    },
    blackChipInner: {
        borderColor: "#666"
    },
    amount: {
        fontWeight: "bold"
    },
    blueAmount: {
        color: "lightblue"
    },
    yellowAmount: {
        color: "lightyellow"
    },
    greenAmount: {
        color: "lightgreen"
    },
    redAmount: {
        color: "salmon"
    },
    blackAmount: {
        color: "#ccc"
    },
    smallText: {
        fontSize: 10
    }
});

Chip.proptypes = {
    value: PropTypes.number,
    pressed: PropTypes.func,
    position: PropTypes.shape({
        position: PropTypes.string,
        top: PropTypes.number,
        left: PropTypes.number
    })
}

export default Chip;