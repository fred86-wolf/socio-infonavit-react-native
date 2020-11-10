import React, {useState} from 'react';
import {View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import axios from 'axios';
import {getItem, saveItem} from '../utils';
import {ROJO,GRIS, URL,ACCESS_TOKEN, LOGO,LOGOMAIN} from '../consts';
const {width,height} = Dimensions.get('window');
import Modal from '../components/Modal';
const logoMain = require('../../assets/logo.png');
const logoSecondary = require('../../assets/vector_familia.png');
export default Login = ({navigation}) => {
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [backColor, setBackColor] = useState(GRIS);

    const sendPostLogin = async (user) => {
        try {
            const {headers} = await axios.post(URL,{user:user})
            const accessToken = await saveItem(ACCESS_TOKEN, headers.authorization);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    }
    const selectComponent = (key) => {
        switch (key) {
            case 'password':
                setRenderComponent(<Text>En breve se Enviare un mensaje a tu celular</Text>);
                setShowModal(true);
                break;
            case 'register':
                setRenderComponent(<Text>Se enviara un correo con tus datos de Registro</Text>);
                setShowModal(true);
                break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    }
    const {values, isSubmitting, setFieldValue, handleSubmit, errors} = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: values => {
           //TODO API ENPOINT
           const user = {email:values.email, password:values.password}
           sendPostLogin(user);
        },
        validate:values => {
            if (values.email && values.password) {
                setBackColor(ROJO);
                setIsValid(false);
            } else {
                setBackColor(GRIS);
                setIsValid(true);
            }
        }
    })
    return(
        <View style={styles.container}>
            <View style={styles.childFirstContainer}>
                <Image style={styles.familyImage} source={LOGOMAIN}/>
                <Image style={styles.logoImage} source={LOGO}/>
            </View>
            <View style={styles.childSecondContainer}>
                <View style={styles.frmLogin}>
                    <TextInput style={styles.inputEmail} keyboardType='email-address' placeholder='Correo' value={values.email} onChangeText={text => setFieldValue('email', text)}/>
                    <TextInput style={styles.inputPassword} secureTextEntry={true} placeholder='Contraseña' value={values.password} onChangeText={text => setFieldValue('password', text)}/>
                    <TouchableOpacity onPress={() => selectComponent('password')}>
                        <Text style={styles.textPassword}>Olvidé mi contraseña</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={false} style={[styles.btnLogin, {backgroundColor:backColor}]} onPress={handleSubmit}>
                        <Text style={styles.textLogin}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewRegister}>
                    <TouchableOpacity onPress={() => selectComponent('register')}>
                        <Text>No tengo cuenta. <Text style={styles.textRegister}>Registrarme</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
            { renderComponent && <Modal visible={showModal} setVisible={setShowModal}>
                {renderComponent}
            </Modal>}
        </View>
    )
}
const styles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    childFirstContainer:{
        flex:2, 
        width, 
        backgroundColor:ROJO,
        justifyContent:'center', 
        alignItems:'center', 
        borderBottomLeftRadius:20, 
        borderBottomRightRadius:20
    },
    childSecondContainer:{
        flex:3, 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    familyImage:{
        width:width/2.5, 
        height:height/5, 
        marginTop:10
    },
    logoImage:{
        width:width/1.4, 
        marginTop:5
    },
    frmLogin:{
        marginTop:20, 
        width: width/1.2
    },
    inputEmail:{
        borderBottomWidth:0.5, 
        height:40
    },
    inputPassword:{
        borderBottomWidth:0.5,
        height:40, 
        marginTop:10
    },
    textPassword:{
        marginTop:10, 
        textDecorationLine:'underline', 
        alignSelf:'flex-end'
    },
    btnLogin:{ 
        borderRadius:20,
        marginTop:15, 
        height:height/15, 
        justifyContent:'center', 
        alignItems:'center'
    },
    textLogin:{
        fontSize:20, 
        color:'#ffffff'
    },
    viewRegister:{
        alignItems:'center', 
        justifyContent:'flex-end', 
        marginVertical:10
    },
    textRegister:{
        textDecorationLine:'underline'
    }
});