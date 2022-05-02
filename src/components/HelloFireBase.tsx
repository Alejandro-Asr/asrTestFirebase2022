import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const HelloFireBase = () => {

  const [data, setData] = useState([] as any);

  const dameColeccionPruebas = async() => {

    const prueba = await firestore().collection('prueba').get();
    console.log(prueba.docs);
    setData(prueba.docs);
    //return prueba;
  };

  useEffect(() => {
    dameColeccionPruebas();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text>{item.data().nombre} </Text>
        <Text>{item.data().color} </Text>
        <Text>{item.data().precio} </Text>
      </View>
    );
  }

  return (
    <View>
        <Text>Hola FireBase 2</Text>
        <FlatList
          data={ data }
          renderItem={ renderItem }
          keyExtractor = { (item) => item.id }
        />
    </View>
  );
};
