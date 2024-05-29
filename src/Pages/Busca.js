import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {

    const [clients, setClient] = useState([]);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [clienteId, setClienteId] = useState(0);
    const [clienteName, setNome] = useState();
    const [clienteEmail, setEmail] = useState();
    const [clienteGenere, setGenere] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getClients() {
        await fetch('http://10.139.75.26:5251/api/Client/GetAllClients', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setClient(json))
            .catch(err => setError(true))
    }

    async function getCliente(id) {
        console.log("aqui");
        await fetch('http://10.139.75.26:5251/api/Client/GetClientId/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then((responde) => responde.json())
            .then(json => {
                setClienteId(json.clienteId);
                setEmail(json.clienteEmail);
                setNome(json.clienteName);
                setGenere(json.clienteGenere);
            })
            .catch(err => console.log(err));
        getUsuario();
        setEdicao(false);
    }

    async function editUser() {
        await fetch('http://10.139.75.26:5251/api/Client/UpdateClient' + clienteId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset-UTF-8',
            },
            body: JSON.stringify({
                clienteId: clienteId,
                clienteEmail: clienteEmail,
                clienteGenere: clienteGenere,
                clienteName: clienteName
            })
        })
            .then((reponde) => reponde.json())
            .catch(err => console.log(err));
        getClients();
        setEdicao(false);
    }

    function showAlert(id, userName) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário ?',
            [
                { text: 'Sim', onPress: () => deleteUsuario(id, userName) },
                { text: 'Não', onPress: () => ('') },
            ],
            { cancelable: false }
        );
    }

    async function deleteUsuario(id, userName) {
        await fetch('http://10.139.75.26:5251/api/Users/DeleteUser/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset-UTF-8',
            },
        })
            .then(res => res.json())
            .then(json => setResposta(json))
            .catch(err => setError(true))

        if (deleteResposta == true) {
            Alert.alert(
                '',
                'Usuario' + userName + 'excluindo com sucesso',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();
        }

        else {
            Alert.alert(
                '',
                'Usuario' + userName + 'não foi excluido.',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getClients();
        }, [])
    );

    return (
        <View style={style.container}>
            {edicao == false ?
                <FlatList
                    style={style.flat}
                    data={clients}
                    keyExtractor={(item) => item.clienteId}
                    renderItem={({ item }) => (
                        <View style={style.geral}>
                            <Text style={style.text}>
                                {item.clienteName}
                            </Text>
                            <View style={style.botoes}>
                                <TouchableOpacity style={style.btnEdit} onPress={() => { setEdicao(true); getCliente(item.clienteId) }}>
                                    <Text style={style.btnLogintexto}>EDITAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.btnDelete} onPress={() => showAlert(item.clienteId, item.clienteName)}>
                                    <Text style={style.btnLogintexto}>EXCLUIR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                :
                <View style={style.editar}>
                    <TextInput
                        inputMode="text"
                        style={style.input}
                        value={clienteName}
                        onChangeText={(digitado) => setNome(digitado)}
                        placeholder="white"
                    />
                    <TextInput
                        inputMode="email"
                        style={style.input}
                        value={clienteEmail}
                        onChangeText={(digitado) => setEmail(digitado)}
                        placeholder="white"
                    />
                    <TextInput
                        inputMode="text"
                        secureTextEntry={true}
                        style={style.input}
                        value={clienteGenere}
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
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "pink",

    },
    text: {
        color: "black",
        marginTop: 50,
    },
    btntexto: {
        width: "90%",
        height: 30,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    btnEdit: {
        width: 210, // Largura do botão
        height: 30, // Altura do botão
        backgroundColor: "#f6b0f7",
        color: "white",
        padding: 1,
        borderRadius: 50,
        borderRadius: 5, // Borda arredondada
        alignItems: 'center', // Centraliza o texto dentro do botão
    },
    btnDelete: {
        width: 210, // Largura do botão
        height: 30, // Altura do botão
        backgroundColor: "#f6b0f7",
        color: "white",
        padding: 1,
        borderRadius: 50,
        borderRadius: 10, // Borda arredondada
        alignItems: 'center', // Centraliza o texto dentro do botão
    },
    btnCreate: {
        width: 210, // Largura do botão
        height: 45, // Altura do botão
        marginBottom: 10, // Espaçamento inferior
        borderRadius: 10, // Borda arredondada
        justifyContent: 'center', // Centraliza o texto dentro do botão
        alignItems: 'center', // Centraliza o texto dentro do botão
        backgroundColor: '#f6b0f7', // Cor de fundo do botão
        textAlign: 'center',
        fontSize: 90,
        color: 'black',
    },
    input: {
        fontSize: 15,
        alignItems: "center",
        color: 'black',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 20,
        marginTop: 20
    },
    geral: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",

    },
    botoes: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
})