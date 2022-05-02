import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

export const InsertDataFireBase = () => {

    const [ rtData, setRtData ] = useState([]);
    const [ offline, setOffline ] = useState(true);

    const [ nombre, setNombre ] = useState('');
    const [ color, setColor ] = useState('');
    const [ precio, setPrecio ] = useState('');

    useEffect(() => {
        loadRData();
    }, [] );

    const loadRData = async() => {

        const subscribe: any = firestore().collection('prueba').onSnapshot((querySnapshot) => {
          const newData = [] as any;
          querySnapshot.forEach((doc) => {
              newData.push({
                  ...doc.data(),
                  key: doc.id
            });
          setRtData(newData);
          });
        });
        return subscribe;
    };

    const stateScreen = async() => {
        setOffline(!offline);
        if(offline){
            await database().goOffline();
            console.log('offline activado');
        }else{
            await database().goOnline();
            console.log('onine activado');
        }
    };

    const renderItem = ({ item }: any) => {
        return (
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <Text>{item.nombre} </Text>
            <Text>{item.color} </Text>
            <Text>{item.precio} </Text>
          </View>
        );
    };

    const insertar = () => {
        try{
            firestore().collection('prueba').add({
                nombre,
                color,
                precio,
            });
        }catch(error: any){
            Alert.alert(error.message);
        }finally{
            setNombre('');
            setColor('');
            setPrecio('');
        }
    }
    return (
        <View style={{ marginTop: 20, padding: 10 }}>
            <Text style={{ color: offline ? 'black' : 'red' }} >Insert Data FireBase RealTime - { offline ? 'Online' : 'Offline' }</Text>
            <View>
                <TextInput
                    placeholder="Nombre"
                    value={ nombre }
                    onChangeText={ (text):any => setNombre(text) }
                    style={ styles.input }
                />
                <TextInput
                    placeholder="Color"
                    value={ color }
                    onChangeText={ (text):any => setColor(text) }
                    style={ styles.input }
                />
                <TextInput
                    placeholder="Precio"
                    value={ precio }
                    onChangeText={ (text):any => setPrecio(text) }
                    style={ styles.input }
                />
                <Button
                    title="Insertar"
                    onPress={ () => insertar() }
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    title={ offline ? 'Offline' : 'Online' }
                    onPress={ () => stateScreen() }
                />
            </View>
            <Text>Listado</Text>
            <FlatList
            data={ rtData }
            renderItem={ renderItem }
            keyExtractor = { (item): any => item.key }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    }
})
