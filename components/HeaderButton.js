import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const customHeaderButton = props => (
    <HeaderButton 
        {...props}
        IconComponent={Ionicons}
        iconSize={30}
        color="white"
    />
);

export default customHeaderButton;