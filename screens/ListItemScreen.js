import React,{useEffect, useState} from 'react'
import { View,FlatList, StyleSheet,Linking,Platform } from 'react-native'
import {Button, Card, Paragraph} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
const ListItemScreen = () => {
    const [items,setItems] = useState([])
    const [Loading,setLoading] = useState(false)
    const getDetails = async () => {
        const querySnap = await firestore().collection('ads').get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        console.log(result)
        setItems(result)
    }
    const openDial = (phone) => {
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking,openURL(`telprompt:${phone}`)
        }
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
                        <Button icon="phone" onPress={() => openDial()}>Call seller</Button>
                    </Card.Actions>
            </Card>
        )
    }
    return (
        <View>
            <FlatList
                data={items.reverse()}
                keyExtractor={(item) => item.phone}
                renderItem={({item}) => renderItem(item)}
                onRefresh={() => { 
                    setLoading(true)
                    getDetails()
                    setLoading(false)
                }}
                refreshing={Loading}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2,
        backgroundColor:"skyblue",
        borderRadius:10
    }
});

export default ListItemScreen
