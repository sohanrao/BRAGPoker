import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

import { resetDeal } from '../../store/actions/cards';
import { resetBets } from '../../store/actions/money';

const ResetOverlay = () => {
    const dispatch = useDispatch();

    const doReset = () => {
        dispatch(resetDeal());
        dispatch(resetBets());
    }

    return (
        <TouchableWithoutFeedback onPress={doReset}>
            <View style={styles.container}></View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});

export default ResetOverlay;