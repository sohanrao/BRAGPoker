import React from 'react';
import { Modal, StyleSheet, View, Text, Button, SectionList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PAYOUT_DATA = [
    { title: 'Ultimate Texas Hold\'em Paytables', data: [
        { item1: 'Hand', item2: 'Trips', item3: 'Blind', isSubHeading: true },
        { item1: 'Royal Flush', item2: '50 to 1', item3: '500 to 1' },
        { item1: 'Straight Flush', item2: '40 to 1', item3: '50 to 1' },
        { item1: 'Four of a Kind', item2: '30 to 1', item3: '10 to 1' },
        { item1: 'Full House', item2: '8 to 1', item3: '3 to 1' },
        { item1: 'Flush', item2: '6 to 1', item3: '6 to 5' },
        { item1: 'Straight', item2: '5 to 1', item3: '1 to 1' }
    ]},
    { title: 'Bad Beat Bonus - Hand Beaten', data: [
        { item1: 'Straight Flush', item2: '10,000 to 1' },
        { item1: 'Quads', item2: '500 to 1' },
        { item1: 'Full House', item2: '40 to 1' },
        { item1: 'Flush', item2: '25 to 1' },
        { item1: 'Straight', item2: '20 to 1' },
        { item1: 'Trips', item2: '9 to 1' }
    ]}
];

const payouts = props => {
    const renderRow = (item, index) => {
        const textClasses = [styles.text];
        const textEl = (content) => <Text style={textClasses}>{content}</Text>;
        if (item.isSubHeading) {
            textClasses.push({fontWeight: 'bold', fontSize: 18});
        }
        return (
            <View key={index} style={{alignSelf: "stretch", flexDirection: "row", justifyContent: "flex-start"}}>
                {textEl(item.item1)}
                {textEl(item.item2)}
                {item.item3 ? textEl(item.item3) : null}
            </View>
        );
    }
    return (
        <Modal 
          style={styles.modal}
          animationType = {"slide"}
          visible={props.visible}
          transparent={true}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <SectionList 
                        renderItem={({item, index}) => (
                            renderRow(item, index)
                        )}
                        renderSectionHeader={({section: {title}}) => (
                            <Text style={[styles.text, styles.titleText]}>{title}</Text>
                        )}
                        sections={PAYOUT_DATA}
                        keyExtractor={(item, index) => item.item1 + index}
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
        flex: 1,
        fontSize: 16,
        fontFamily: 'bree-serif',
        marginRight: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    }
});

export default payouts;