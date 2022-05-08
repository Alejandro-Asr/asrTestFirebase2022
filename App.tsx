import React from 'react';
import { SafeAreaView } from 'react-native';
import { LoginFireBaseEmail } from './src/components/LoginFireBaseEmail';
// import { InsertDataFireBase } from './src/components/InsertDataFireBase';
// import { HelloFireBase } from './src/components/HelloFireBase';
// import { LoadDataFireBaseRealTime } from './src/components/LoadDataFireBaseRealTime';

export const App = () => {

  return (
    <SafeAreaView>
      {/* <HelloFireBase /> */}
      {/* <LoadDataFireBaseRealTime /> */}
      {/* <InsertDataFireBase /> */}
      <LoginFireBaseEmail />
    </SafeAreaView>
  );
};
