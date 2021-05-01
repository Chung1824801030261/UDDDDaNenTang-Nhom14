import React,{useState} from 'react'
import { View, Text, StyleSheet,Alert } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
const CreateAdScreen = () => {
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [year,setYear] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [image,setImage] = useState("")

    const postData = async () => {
            try {
                await firestore().collection('ads')
                 .add({
                        name,
                        desc,
                        year,
                        price,
                        phone,
                        image,
                        uid:auth().currentUser.uid
                })
            Alert.alert("Đã đăng thành công")
    }catch(err){
        Alert.alert("Gặp lỗi gì đó. Vui lòng thử lại")
    }
    }

    const openCamera = () => {
        launchImageLibrary({quality:0.5},(fileobj) => {
            //console.log(fileobj)
            const uploadTask = storage().ref().child(`/item/${Date.now()}`).putFile(fileobj.uri)
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed', // or 'state_changed'
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("Đã tải ảnh lên thành công")}
            }, 
            (error) => {
            // A full list of error codes is available at
                alert("Đã xảy ra lỗi")
           
            }, 
            () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL)
                setImage(downloadURL)
            });
            }
            );
        })
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text}>Tạo sản phẩm</Text>
            <TextInput
                    label="Tên sản phẩm"
                    value={name}
                    mode= "outlined"
                    onChangeText={text => setName(text)}
                    />
            <TextInput
                    label="Mô tả sản phẩm"
                    value={desc}
                    mode= "outlined"
                    numberOfLines = {5}
                    multiline = {true}
                    onChangeText={text => setDesc(text)}
                    />
            <TextInput
                    label="Năm mua"
                    value={year}
                    mode= "outlined"
                    keyboardType="numeric"
                    onChangeText={text => setYear(text)}
                    />
            <TextInput
                    label="Giá"
                    value={price}
                    mode= "outlined"
                    keyboardType="numeric"
                    onChangeText={text => setPrice(text)}
                    />
            <TextInput
                    label="Số điện thoại"
                    value={phone}
                    mode= "outlined"
                    keyboardType="numeric"
                    onChangeText={text => setPhone(text)}
                    />
            <Button style={{marginTop:20}} icon="camera" mode="contained" onPress={() => openCamera()}>
                    Tải ảnh lên
            </Button>
            <Button icon="upload" style={{marginTop:10}} disabled={image?false:true} mode="contained" onPress={() => postData()}>
                    Đăng bài
            </Button>
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        marginVertical:10
    },
    text:{
        fontSize:30,
        textAlign:"center",
        paddingBottom:10,
        fontWeight:"bold"
    }
});
export default CreateAdScreen
