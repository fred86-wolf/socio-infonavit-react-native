import React, { useState } from 'react';
import {View, Text,Image,TouchableOpacity, StyleSheet} from 'react-native';
import {GRIS, LOGO,ROJO} from '../consts'
import Modal from '../components/Modal';
import axios from 'axios';
import { clearAll } from '../utils';
export default DrawerContent = (props) => {
    const {navigation} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const handleLogout = () => {
        setRenderComponent(
        <View style={{borderWidth:0.5, borderRadius:10, height:100}}>
            <View style={{borderBottomWidth:0.5, padding:10}}>
                <Text style={{fontWeight:'bold'}}>¿Desea salir de la Aplicacion?</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', marginTop:5}}>
                <TouchableOpacity onPress={Logout} style={{borderRadius:10, backgroundColor:ROJO, width:50, height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Si</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{borderRadius:10, backgroundColor:GRIS, width:50, height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>No</Text>
                </TouchableOpacity>
            </View>
        </View>);
        setShowModal(true);
    }
    const Logout = async () => {
        clearAll();
        const url = 'https://staging.api.socioinfonavit.io/api/v1/logout';
        const {data} = await axios.delete(url);
        navigation.navigate('Login');
    }
    const closeModal = () => setShowModal(false);
    return(
        <View style={styles.container}>
            <View style={styles.childContainer}>
                <View>
                    <Image style={styles.logo} source={LOGO}/>
                    <Text style={styles.txtTitle}>Benevits</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.txtLogout}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {renderComponent && <Modal visible={showModal} setVisible={setShowModal}>
                {renderComponent}
                </Modal>}
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