import React,{useState} from 'react'
import { View, Text, Image, StyleSheet,KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth'
const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const userLogin = async () => {
        if(!email||!password) {
            Alert.alert("Vui lòng điền đầy đủ thông tin")
            return
        }
        try {
            const result = await auth().signInWithEmailAndPassword(email,password)
            console.log(result.user)
        }catch(err){
            Alert.alert("Đã xảy ra lỗi, vui lòng thử mật khẩu khác")
        }
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Image style={{width:200,height:200}} source={require('../assets/logo.png')}/>
                <Text style={styles.text}>Đăng nhập để tiếp tục !</Text>
            </View>
            <View style={styles.box2}>
                <TextInput
                    label="Email"
                    value={email}
                    mode= "outlined"
                    onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                    label="Password"
                    value={password}
                    mode= "outlined"
                    secureTextEntry= {true}
                    onChangeText={text => setPassword(text)}
                    />
                <Button icon="login" style={{marginTop:20}} mode="contained" onPress={() => userLogin()}>
                    Đăng nhập
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <Text style={{textAlign:"center", paddingTop:10}}>Không có tài khoản ?</Text>
                </TouchableOpacity>
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
