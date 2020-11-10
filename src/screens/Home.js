import React,{useState,useEffect} from 'react';
import {View,Image, Text,TouchableOpacity,StyleSheet,SafeAreaView, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import { ACCESS_TOKEN, LOGO, ROJO,URL_B,URL_W } from '../consts';
import { getItem } from '../utils';

export default Home  = ({navigation}) => {
    const [wallets, setWallets] = useState([]);
    const [locked, setLocked] = useState([]);
    const [unlocked, setUnlocked] = useState([]);
    const [accessToken, setAccessToken] = useState([]);
    useEffect(() => {
        getWallets();
        getBenevits();
    },[])
    const getWallets = async () => {
        try {
            const {data} = await axios.get(URL_W);
            setWallets(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getBenevits = async () => {
        try {
            let access = await getItem(ACCESS_TOKEN);
            const {data} = await axios.get(URL_B,{headers:{ Authorization:access}});
            console.log('Locked',data.locked);
            setLocked(data.locked);
            setUnlocked(data.unlocked);
        } catch (error) {
            console.log('Error',error);
        }
    }
    return(
        <View style={{flex:1}}>
            <View style={{height:70,padding:10, backgroundColor:ROJO, }}>
                <View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'center',marginTop:10}}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name='bars' type='font-awesome' color='#ffffff'/>
                    </TouchableOpacity>
                    <Image source={LOGO}/>
                    <TouchableOpacity/>
                </View>
            </View>
            <View style={{flex:1}}>
                {wallets && wallets.map((wallet) => {
                    return(
                        <View>
                            <Text>{wallet.name}</Text>
                        </View>
                    )
                })}
            </View>
            <View>
            {unlocked && unlocked.map((un) => {
                    return(
                        <View>
                            <Text>{un.name}</Text>
                            <Image style={{ width: 50,height: 50}} source={{uri:un.vector_full_path}}/>
                        </View>
                    )
                })}
            </View>
            <SafeAreaView>
            <FlatList
            horizontal={true}
            data={unlocked}
            renderItem={({ item }) => (
                <View>
                    <View>
                        <Image style={{ width: 50,height: 50}} source={{uri:item.vector_full_path}} />
                    </View>
                    <View>
                        <Text>
                            {item.name}
                        </Text>
                    </View>
                </View>
            )}
        />
        </SafeAreaView>
        </View>
    )
}