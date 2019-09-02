import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from "prop-types";

import Card from '../Card';

const CardsLayout = props => {
    return (
        <View style={styles.container}>
            {props.cards.map((card, index) => 
                <Card 
                    key={card.label} 
                    num={card.key} 
                    suit={card.suit} 
                    reveal={props.reveal}
                    closed={props.dealer && index !== 1}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
});

CardsLayout.proptypes = {
    cards: PropTypes.array,
    reveal: PropTypes.bool,
    dealer: PropTypes.bool
}

export default CardsLayout;