import React from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '../Card';

const cardsLayout = props => {
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

export default cardsLayout;