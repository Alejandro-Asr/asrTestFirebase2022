import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export const LoginFireBaseEmail = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const crearUsuario = () => {
        console.log(email, password, 'login');
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    }

                    console.error(error);
                });
    };

    const login = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const logout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    const editProfile = async () => {

        auth().currentUser!.updateProfile({
            displayName: 'John Doe',
        }).then(() => {
            console.log('User profile updated!');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <View>
            <Text>LoginFireBaseEmail</Text>
            <TextInput
                    placeholder="Email"
                    value={ email }
                    onChangeText={ (text):any => setEmail(text) }
                    style={ styles.input }
                />
            <TextInput
                    placeholder="Password"
                    value={ password }
                    onChangeText={ (text):any => setPassword(text) }
                    style={ styles.input }
            />
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Crear Usuario"
                    onPress={ () => crearUsuario() }
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="login"
                    onPress={ () => login() }
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Logout"
                    onPress={ () => logout() }
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Editar Datos"
                    onPress={ () => editProfile() }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    }
})