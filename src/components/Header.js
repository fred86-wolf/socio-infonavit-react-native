import React from 'react';
import {View,Text,Image} from 'react-native';
import { ROJO } from '../consts';

export default Header = () => {
    return(
        <View style={{ backgroundColor:ROJO}}>
            <Text style={{color:'#ffffff'}}>Home</Text>
        </View>
    )
}