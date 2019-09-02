import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const ModalWindow = props => {
    return (
        <Modal 
          style={styles.modal}
          animationType = {"slide"}
          visible={props.visible}
          transparent={true}>
              <View style={styles.modal}>
                <View style={styles.container}>
                    {props.children}
                    <TouchableOpacity onPress={props.onClose}>
                        <View style={{alignSelf: "center"}}>
                            <Ionicons name="md-checkmark-circle" size={48} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
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
});

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element
}

Modal.defaultProps = {
    visible: false,
    onClose: () => {}
}

export default ModalWindow;