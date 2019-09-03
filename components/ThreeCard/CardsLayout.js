import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from "prop-types";

import Card from '../Card';

const CardsLayout = props => {
    const [fadeIn1] = useState(new Animated.Value(0));
    const [fadeIn2] = useState(new Animated.Value(0));
    const [fadeIn3] = useState(new Animated.Value(0));

    const duration = 400;
    const delayDuration = props.dealer ? 1000 : 0;
    const interval = 200;

    useEffect(() => {
        Animated.timing(fadeIn1, {
            toValue: 1,
            duration,
            delay: delayDuration + (interval * 0)
        }).start();
        Animated.timing(fadeIn2, {
            toValue: 1,
            duration,
            delay: delayDuration + (interval * 1)
        }).start();
        Animated.timing(fadeIn3, {
            toValue: 1,
            duration,
            delay: delayDuration + (interval * 2)
        }).start();
    }, []);

    const getStateName = index => {
        const num = index + 1;
        if (num === 1) {
            return fadeIn1;
        } else if (num === 2) {
            return fadeIn2;
        } else {
            return fadeIn3;
        }
    }

    return (
        <View style={styles.container}>
            {props.cards.map((card, index) => 
                <Animated.View key={card.label} style={{
                    opacity: getStateName(index),
                    transform: [
                        {
                            translateX: getStateName(index).interpolate({
                                inputRange: [0, 1],
                                outputRange: [500, 0]
                            })
                        },
                        {
                            translateY: getStateName(index).interpolate({
                                inputRange: [0, 1],
                                outputRange: [-500, 0]
                            })
                        }
                    ]
                }}>
                    <Card 
                        num={card.key} 
                        suit={card.suit} 
                        reveal={props.reveal}
                        closed={props.dealer && index !== 1}
                        size={props.size}/>
                </Animated.View>
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
    dealer: PropTypes.bool,
    size: PropTypes.string,
}

export default CardsLayout;