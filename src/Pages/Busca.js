import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Busca() {
    const [usuarios, setUsuarios ] = useState( [] );
    const [error, setError ] = useState(false);
    const [busca, setBusca] = useState(false);
    const [filtro, setFiltro ] = useState(false);
    const[edicao, setEdicao ] = useState(false);
    const [userId, setUserId ] = useState(0);
    const [UserNome, setNome ] = useState();
    const [userEmail, setEmail ] = useState();
    const [userSenha, setSenha ] = useState();
    const [ deleteResposta, setResposta] = useState(false);

    async function getUsuarios(){
        await fetch('http://10.139.75.26:5251/api/Users/GetAllUsers',{
            method: 'GET',
            headers: {
                'content-type':'application/json'
            }
        })
        .then(res=> res.json())
        .then(json=> setUsuarios(json))
        .catch(err=> setError(true))
    }

    async function getUsuario()
    {
        await fetch('http://10.139.75.26:5251/api/Users/GetAllUsers'+ userId, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            boby: JSON.stringify({
                userId: userId,
                userEmail: userEmail,
                userPassword: userSenha,
                userName: UserNome
            })
        })
        .then((responde) => responde.json())
        .catch( err => console.log( err ) );
        getUsuario();
        setEdicao(false);
    }

    async function editUser(){
        await fetch('http://10.139.75.26:5251/api/Users/GetAllUsers' + userId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset-UTF-8',
            },
            body: JSON.stringify({
                userId: userId,
                userEmail: userEmail,
                userPassword: userSenha,
                userName: UserNome
            })
        })
            .then((reponde) => reponde.json())
            .catch(err => console.log(err));
        getUsuario();
        setEdicao(false);
    }

    function showAlert(id, userName) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário ?',
            [
                { text: 'Sim', onPress: () => deleteUsuario(id, userName)},
                { text: 'Não', onPress: () =>('')},
            ],
            { cancelable: false}
        );
    }

    async function deleteUsuario(id, userName){
        await fetch('http://10.139.75.26:5251/api/Users/DeleteUser/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset-UTF-8',
            },
        })
        .then( res => res.json())
        .then(json => setResposta(json))
        .catch( err => setError(true))

        if(deleteResposta == true)
        {
            Alert.alert(
                '',
                'Usuario' + userName + 'excluindo com sucesso',
                [
                    { text: '', onPress: () => ('')},
                    { text: 'Ok', onPress: () =>('')},
                ],
                { cancelable: false}
            );
            getUsuarios();
        }

        else{
            Alert.alert(
                '',
                'Usuario' + userName + 'não foi excluido.',
                [
                    { text: '', onPress: () =>('')},
                    { text: 'Ok', onPress: () =>('')},
                ],
                { cancelable: false}
            );
            getUsuarios();
        }
    };

    useEffect( () => {
        getUsuarios();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getUsuarios();
        }, [])
    );

    return(
        <View style={style.container}>
            {edicao == false ?
            <FlatList 
            style={style.flat}
            data={usuarios}
            keyExtractor={(item) => item.UserId}
            renderItem={({ item }) => (
                <Text style={style.text}>
                    {item.userName}
                    <TouchableOpacity style={style.btnEdit} onPress={() => { setEdicao(true); getUsuario(item.UserId)}}>
                        <Text style={style.btntexto}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnDelete} onPress={() => showAlert(item.UserId, item.userName)}>
                        <Text style={style.btntexto}>EXCLUIR</Text>
                    </TouchableOpacity>
                </Text>
            )}
            />
            :
            <View style={style.editar}>
                <TextInput 
                inputMode="text"
                style={style.input}
                value={UserNome}
                onChangeText={(digitado) => setNome(digitado)}
                placeholder="white"
                />
                <TextInput 
                inputMode="email"
                style={style.input}
                value={userEmail}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholder="white"
                />
                <TextInput 
                inputMode="text"
                secureTextEntry={true}
                style={style.input}
                value={userSenha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholder="white"
                />
                <TouchableOpacity style={style.btnCreate} onPress={() => editUser()}>
                    <Text style={style.btnLoginText}>SALVAR</Text>
                </TouchableOpacity>
            </View>

            }
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "black",
    },
    text: {
        borderBlockColor: "white",
        color: "white"
    },
    btntexto: {
        width: "100%",
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    btnEdit: {
        width: 250, // Largura do botão
        height: 20, // Altura do botão
        backgroundColor: "red",
        color: "white"
    },
    btnDelete: {
        width: 250, // Largura do botão
        height: 20, // Altura do botão
        backgroundColor: "red",
        color: "white"
    }
})