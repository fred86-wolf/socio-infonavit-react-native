import React from 'react';
import {View, Text,Image,TouchableOpacity, StyleSheet} from 'react-native';
import {LOGO,ROJO} from '../consts'
export default DrawerContent = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.childContainer}>
                <View>
                    <Image style={styles.logo} source={LOGO}/>
                    <Text style={styles.txtTitle}>Benevits</Text>
                </View>
                <View>
                    <Text style={styles.txtLogout}>Cerrar sesión</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:ROJO
    },
    childContainer:{
        flex:1,
        marginHorizontal:10,
        marginTop:25,
        justifyContent:'space-between'
    },
    logo:{
        
    },
    txtTitle:{
        marginTop:20,
        color:'#ffffff',
        fontSize:20,
        fontWeight:'bold'
    },
    txtLogout:{
        color:'#ffffff',
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10
    }
})