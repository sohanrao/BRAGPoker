import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SIZES = {
    lg: { class: 'lgCard', cardNumFontSize: 30, closedIconSize: 48, suitIconMain: 40, suitIconSide: 20 },
    md: { class: 'mdCard', cardNumFontSize: 24, closedIconSize: 36, suitIconMain: 32, suitIconSide: 15 },
    sm: { class: 'smCard', cardNumFontSize: 18, closedIconSize: 24, suitIconMain: 24, suitIconSide: 10 },
};

class Card extends Component {
    render () {
        const { suit, num, closed, reveal, size } = this.props;
        const sizeData = SIZES[size];
        const classes = [styles.card, styles[sizeData.class]];
        let card = (
            <View style={classes}>
                <View style={styles.closedCard}>
                    <Text style={styles.txtDealerCard}>Dealer Card</Text>
                    <MaterialCommunityIcons name="cards" size={sizeData.closedIconSize} />
                </View>
            </View>
        );

        if (!closed || reveal) {
            card = (
                <View style={classes}>
                    <Text style={styles.txtCardNum(suit, sizeData.cardNumFontSize)}>{num}</Text>
                    {getSuitIcon(suit, '', sizeData)}
                    <View style={styles.suitContainer}>
                        {getSuitIcon(suit, 'main', sizeData)}
                    </View>
                </View>
            )
        }
        return card;
    }
}

const getColor = (type) => {
    return (type === 'heart' || type === 'diamond') ? 'red' : 'black';
}

const getSuitIcon = (suit, type, sizeData) => {
    return <MaterialCommunityIcons name={'cards-' + suit} size={type === 'main' ? sizeData.suitIconMain : sizeData.suitIconSide} color={getColor(suit)} />
}

const styles = StyleSheet.create({
    card: {
        elevation: 3,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        margin: 5,
    },
    closedCard: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: -3
    },
    lgCard: {
        width: 70,
        height: 100,
        borderRadius: 5,
        padding: 5,
    },
    mdCard: {
        width: 55,
        height: 76,
        borderRadius: 3,
        padding: 3,
    },
    smCard: {
        width: 40,
        height: 52,
        borderRadius: 3,
        padding: 1,
        paddingHorizontal: 2
    },
    suitContainer: {
        alignItems:"flex-end", 
        marginTop: -10
    },
    txtCardNum: (suit, fontSize) => {
        return {
            fontFamily: 'card-characters',
            fontSize,
            color: getColor(suit)
        }
    },
    txtDealerCard: {
        fontSize: 10,
        color: "white",
        paddingHorizontal: 5
    }
});

Card.proptypes = {
    suit: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
    closed: PropTypes.bool,
    reveal: PropTypes.bool,
    size: PropTypes.string
}

Card.defaultProps = {
    suit: 'heart',
    num: 'A',
    size: 'lg'
}

export default Card;