import React,{useState} from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const userSignup = async () => {
        if(!email||!password) {
            Alert.alert("Vui lòng điền đầy đủ thông tin")
            return
        }
        try {const result = await auth().createUserWithEmailAndPassword(email,password)
        }catch(err){
            Alert.alert("Đã xảy ra lỗi, vui lòng thử mật khẩu khác")
        }
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Image style={{width:200,height:200}} source={require('../assets/logo.png')}/>
                <Text style={styles.text}>Đăng ký để tiếp tục!</Text>
            </View>
            <View style={styles.box2}>
                <TextInput
                    label="Email"
                    value={email}
                    mode= "outlined"
                    onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                    label="Mật khẩu"
                    value={password}
                    mode= "outlined"
                    secureTextEntry= {true}
                    onChangeText={text => setPassword(text)}
                    />
                <Button style={{marginTop:20}} mode="contained" onPress={() => userSignup()}>
                    Đăng ký
                </Button>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{textAlign:"center", paddingTop:10}}>Đăng Nhập ?</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box1:{
        alignItems: "center",
        paddingVertical:15 
    },
    box2:{
        paddingHorizontal:10
    },
    text:{
        fontSize: 22,
        paddingTop:20,
        color:"#8b0000"
    }
})

export default LoginScreen
