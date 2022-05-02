import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const LoadDataFireBaseRealTime = () => {

  const [ rtData, setRtData ] = useState([]);

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

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text>{item.nombre} </Text>
        <Text>{item.color} </Text>
        <Text>{item.precio} </Text>
      </View>
    );
  };

  return (
    <View>
        <Text>LoadData FireBase RealTime</Text>
        <FlatList
          data={ rtData }
          renderItem={ renderItem }
          keyExtractor = { (item): any => item.key }
        />
    </View>
  )
}
