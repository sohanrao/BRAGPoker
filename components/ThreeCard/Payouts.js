import React from 'react';
import { Modal, StyleSheet, View, Text, Button, SectionList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const payouts = props => {
    return (
        <Modal 
          style={styles.modal}
          animationType = {"slide"}
          visible={props.visible}
          transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
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
                    <TouchableOpacity onPress={props.onClose}>
                        <View style={{alignSelf: "center"}}>
                            <Ionicons name="md-checkmark-circle" size={48} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 40,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        opacity: 0.95
    },
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

export default payouts;