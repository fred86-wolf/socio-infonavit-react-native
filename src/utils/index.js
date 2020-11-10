import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (keyName, keyValue) => {
    try {
        await AsyncStorage.setItem(keyName,keyValue);
        return true;
    } catch (error) {
        return false;
    }
}

export const getItem = async keyName => {
    try {
        return AsyncStorage.getItem(keyName);
    } catch (error) {
        return false;
    }
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        return false;
    }
}