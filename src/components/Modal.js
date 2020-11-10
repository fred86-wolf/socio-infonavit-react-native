import React from 'react';
import { Text } from 'react-native';
import {Overlay} from 'react-native-elements';

export default Modal = (props) => {
    const {visible, setVisible, children} = props;
    const closeModal = () => setVisible(false);
    return(
        <Overlay isVisible={visible} onBackdropPress={closeModal}>
            {children}
        </Overlay>
    )
}
