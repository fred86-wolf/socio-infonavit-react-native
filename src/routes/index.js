import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ACCESS_TOKEN, LOGO} from '../consts'
import {getItem} from '../utils'
import Login from '../screens/Login';
import Home from '../screens/Home';
import DrawerContent from '../components/DrawerContent';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default App = () => {
    const [access, setAccess] = useState(null);
    useEffect(() =>{
        loadUser();
    },[])
    const loadUser = async () => {
        let access = await getItem(ACCESS_TOKEN);
        setAccess(access);
    } 
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Home' component={MainStack}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

MainStack = () => {
    return(
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name='Home' component={Home} />
        </Drawer.Navigator>
    )
}