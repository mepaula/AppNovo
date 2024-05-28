import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";


export default function Inserir() {

    const[nome, setNome ] = useState("");
    const[sobrenome, setSobreNome ] = useState("");
    const[ usuario, setUsuario ] = useState("");
    const[email, setEmail ] = useState("");
    const[telefone, setTelefone ] = useState("");
    const[rua, setRua ] = useState("");
    const[cidade, setCidade ] = useState("");
    const[cpf, setCpf ] = useState("");
    const[senha, setSenha ] = useState("");
    const[numero, setNumero ] = useState("");
    const[erro, setErro ] = useState(false);
    const[sucesso, setSucesso ] = useState(false);

    async function Cadastro()
    {
        await fetch('https://fakestoreapi.com/auth/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                username:usuario,
                password:senha,
                name:{
                    firstname: nome,
                    lastname: sobrenome,
                },
                address:{
                    city: cidade,
                    street:rua,
                    number: numero,
                    zipcode: cpf,
                    geolocation:{
                        lat:'-37.3159',
                        long:'81.1496'
                    }
                },
                phone: telefone
            })
        })
        .then(res => (res.ok == true) ? res.json() :false )
        .then(json => console.log( json ) )
        .catch(err => setErro( true ) )
    }

    return(
        <ScrollView contentContainerStyle={style.container}>
            {sucesso ?
                <Text style={style.text}>Obrigado por se cadastrar. Seu cadastro foi realizado com sucesso!</Text>
                :
                <>

                <TextInput 
                    style={style.input}
                    placeholder="Nome"
                    placeholderTextColor="black"
                    TextInput={nome}
                    onChangeText={(digitado) => setNome( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="SobreNome"
                    placeholderTextColor="black"
                    TextInput={sobrenome}
                    onChangeText={(digitado) => setSobreNome( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Usuario"
                    placeholderTextColor="black"
                    TextInput={usuario}
                    onChangeText={(digitado) => setUsuario( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Senha"
                    placeholderTextColor="black"
                    TextInput={senha}
                    onChangeText={(digitado) => setSenha( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Númro"
                    placeholderTextColor="black"
                    TextInput={numero}
                    onChangeText={(digitado) => setNumero( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Email"
                    placeholderTextColor="black"
                    TextInput={email}
                    onChangeText={(digitado) => setEmail( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Rua"
                    placeholderTextColor="black"
                    TextInput={rua}
                    onChangeText={(digitado) => setRua( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Telefone"
                    keyboardType="numeric"
                    placeholderTextColor="black"
                    TextInput={telefone}
                    onChangeText={(digitado) => setTelefone( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="Cidade"
                    placeholderTextColor="black"
                    TextInput={cidade}
                    onChangeText={(digitado) => setCidade( digitado ) }
                />
                <TextInput 
                    style={style.input}
                    placeholder="CPF"
                    placeholderTextColor="black"
                    TextInput={cpf}
                    onChangeText={(digitado) => setCpf( digitado ) }
                />
                <TouchableOpacity style={style.btnCadastrar}>
                    <Text style={style.CadastrarText}>Cadastrar</Text>
                </TouchableOpacity>
                {erro && <Text>Revise cuidadosamente os campos!</Text>}
             </>
            }
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexGrow: 1,
        color: "white",
        justifyContent: "center",
        alignItens: "center",
        padding: 50,
        paddingBottom: 50
    },
    text: {
        color: "black"
    },
    input: {
        fontSize: 15,
        alignItems: "center",
        color: 'black',
        borderWidth: 1,
        height: 60,
        padding: 14,
        borderRadius: 25
    },
    btnCadastrar: {
        alignItems: 'center'
    },
    CadastrarText: {
        width: 220, // Largura do botão
        height: 45, // Altura do botão
        marginBottom: 15, // Espaçamento inferior
        borderRadius: 15, // Borda arredondada
        justifyContent: 'center', // Centraliza o texto dentro do botão
        alignItems: 'center', // Centraliza o texto dentro do botão
        backgroundColor: '#f6b0f7', // Cor de fundo do botão
        textAlign: 'center',
        fontSize: 26,
        color: 'black',
    }
})