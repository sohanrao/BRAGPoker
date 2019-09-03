import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ResultMarquee = () => {
    const totalWin = useSelector(state => state.money.totalWin);
    const result = totalWin > 0;
    const [winAnim, setWinAnim] = useState(new Animated.Value(0));
    const [lossAnim, setLossAnim] = useState(new Animated.Value(0));
    const animState = result ? winAnim : lossAnim;
    const dealing = useSelector(state => state.cards.dealing);
    const classes = [styles.container];
    const outputRange = result ? [0, 250] : [0, -250];
    const animStyles = {
        opacity: animState.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        }),
        transform: [
            {
                translateY: animState.interpolate({
                    inputRange: [0, 1],
                    outputRange
                })
            }
        ]
    }
    classes.push(result ? styles.posLeft : styles.posRight);
    classes.push(animStyles);

    useEffect(() => {
        const anim = totalWin > 0 ? winAnim : totalWin < 0 ? lossAnim : null;
        if (anim) {
            Animated.timing(anim, {
                toValue: 1,
                duration: 6000
            }).start();
        }
    }, [totalWin]);

    useEffect(() => {
        if (dealing) {
            setWinAnim(new Animated.Value(0));
            setLossAnim(new Animated.Value(0));
        }
    }, [dealing]);

    return(
        <Animated.View style={classes}>
            {totalWin > 0 ? <Text style={styles.text}>{'+$'+totalWin}</Text> : null}
            {totalWin < 0 ? <Text style={styles.text}>{'-$'+Math.abs(totalWin)}</Text> : null}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    posLeft: {
        top: 20,
        left: 10,
    },
    posRight: {
        right: 10,
        bottom: 125
    },
    text: {
        color: "white"
    }
});

ResultMarquee.propTypes = {
    result: PropTypes.bool.isRequired
}

ResultMarquee.defaultProps = {
    result: false
}

export default ResultMarquee;