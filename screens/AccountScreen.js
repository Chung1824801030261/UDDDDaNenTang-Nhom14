import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth'
import {Button, Card, Paragraph} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
const AccountScreen = () => {
    const [items,setItems] = useState([])
    const [Loading,setLoading] = useState(false)
    const getDetails =async () => {
        const querySnap = await firestore().collection('ads')
        .where('uid','==',auth().currentUser.uid)
        .get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        console.log(result)
        setItems(result)
    }
    useEffect(() => {
        getDetails()
        return () => {
            console.log("Dọn dẹp")
        }
    },[])
    const renderItem = (item) => {
        return(
            <Card style={styles.card}>
                <Card.Title title={item.name}/>
                    <Card.Content>
                        <Paragraph>{item.desc}</Paragraph>
                        <Paragraph>{item.year}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: item.image }} />
                    <Card.Actions>
                        <Button icon="cart">{item.price}</Button>
                    </Card.Actions>
            </Card>
        )
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.view}> 
            <Text style={styles.text}>{auth().currentUser.email}</Text>
            <Button icon="logout" style={{borderRadius:7, width:"90%"}} mode="contained" onPress={() => auth().signOut()}>
                Đăng Xuất
            </Button>
            <Text style={styles.text1}>Sản phẩm của bạn</Text>
            </View>
           
            <FlatList
                data={items}
                keyExtractor={(item) => item.phone}
                renderItem={({item}) => renderItem(item)}
                onRefresh={() => { 
                    setLoading(true)
                    getDetails()
                    setLoading(false)
                }}
                refreshing={Loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:35,
        color:"black",
        fontWeight:"bold"
    },
    text1:{
        fontSize:25,
        color:"black"
    },
    view:{
        alignItems:"center",
        height:"30%",
        justifyContent:"space-evenly",
        backgroundColor:"#fff"
    },
    card:{
        margin:10,
        elevation:2,
        backgroundColor:"skyblue",
        borderRadius:10
    }
})
export default AccountScreen
