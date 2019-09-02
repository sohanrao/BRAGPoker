import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import PropTypes from "prop-types";

import Modal from '../PayoutsModal';

const PAYOUT_DATA = [
    { title: 'Pair Plus Payout', data: [
        { name: 'Pair', value: '1 x 1' },
        { name: 'Flush', value: '1 x 3' },
        { name: 'Straight', value: '1 x 6' },
        { name: 'Three of a kind', value: '1 x 30' },
        { name: 'Straight Flush', value: '1 x 40' },
        { name: 'Mini Royal', value: '1 x 100' }
    ]},
    { title: 'Six Card Bonus Payout', data: [
        { name: 'Trips', value: '1 x 7' },
        { name: 'Straight', value: '1 x 20' },
        { name: 'Flush', value: '1 x 25' },
        { name: 'Full House', value: '1 x 40' },
        { name: 'Four of a kind', value: '1 x 100' },
        { name: 'Straight Flush', value: '1 x 200' },
        { name: 'Royal Flush', value: '1 x 400' }
    ]}
];

const Payouts = props => (
    <Modal visible={props.visible} onClose={props.onClose}>
        <SectionList 
            renderItem={({item, index}) => (<View style={{alignSelf: "stretch", flexDirection: "row"}}>
                <Text style={styles.text} key={index}>{item.name}</Text>
                <View style={{flex: 1}}></View>
                <Text style={styles.text}>{item.value}</Text>
            </View>)}
            renderSectionHeader={({section: {title}}) => (
                <Text style={[styles.text, styles.titleText]}>{title}</Text>
            )}
            sections={PAYOUT_DATA}
            keyExtractor={(item, index) => item.name + index}
        />
    </Modal>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'bree-serif'
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    }
});

Payouts.proptypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func
}

Payouts.defaultProps = {
    visible: false
}

export default Payouts;