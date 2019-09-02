import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Card extends Component {
    render () {
        const { suit, num, closed, reveal } = this.props;
        let card = (
            <View style={styles.card}>
                <View style={styles.closedCard}><MaterialCommunityIcons name="cards" size={48} /></View>
            </View>
        );

        if (!closed || reveal) {
            card = (
                <View style={styles.card}>
                    <Text style={{
                        fontFamily: 'card-characters',
                        fontSize: 30,
                        color: getColor(suit)
                    }}>{num}</Text>
                    {getSuitIcon(suit)}
                    <View style={{alignItems:"flex-end", marginTop: -10}}>
                        {getSuitIcon(suit, 'lg')}
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

const getSuitIcon = (type, size) => {
    return <MaterialCommunityIcons name={'cards-' + type} size={size === 'lg' ? 40 : 20} color={getColor(type)} />
}

const styles = StyleSheet.create({
    card: {
        width: 70,
        height: 100,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "white",
        padding: 5,
        margin: 5,
        borderColor: "white",
        borderWidth: 1
    },
    closedCard: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: -3
    }
});

Card.proptypes = {
    suit: PropTypes.string.isRequired,
    num: PropTypes.string.isRequired,
    closed: PropTypes.bool,
    reveal: PropTypes.bool
}

Card.defaultProps = {
    suit: 'heart',
    num: 'A'
}

export default Card;