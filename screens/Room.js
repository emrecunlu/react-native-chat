import {FlatList, Keyboard, Pressable, Text, TextInput, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useLayoutEffect, useState} from "react";
import {addDoc, collection, query, serverTimestamp, where, orderBy, onSnapshot} from "firebase/firestore";
import {db, auth} from "../firebase";

const Message = ({item}) => {
    return (
        <View
            className={`w-9/12 p-4 rounded-tl-lg rounded-tr-lg ${item.sendBy === auth.currentUser.uid ? 'bg-green-600 rounded-bl-lg ml-auto' : 'bg-gray-700 rounded-br-lg'} `}>
            <Text className="font-semibold text-white font-semibold">{item.fullName}</Text>
            <Text className="text-white text-gray-100 mt-2">{item.message}</Text>
        </View>
    )
}

const Divider = () => {
    return (
        <View className="h-4">

        </View>
    )
}

export default function Room({navigation, route}) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const {id} = route.params

    const submitHandle = async () => {
        const ref = collection(db, 'messages');
        const doc = await addDoc(ref, {
            message,
            sendBy: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            fullName: auth.currentUser.displayName,
            room: id
        });


        Keyboard.dismiss();
        setMessage("")
    }

    useLayoutEffect(() => {
        const ref = collection(db, 'messages')
        const q = query(ref, orderBy('createdAt', 'asc'), where('room', '==', id));

        const unsubscribe = onSnapshot(q, snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setMessages(data)
        });

        return () => unsubscribe();
    }, []);

    return (
        <View className="flex-1 bg-white justify-between p-4">
            <View className="bg-white flex-1 py-5">
                <FlatList data={messages} renderItem={Message} keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={Divider}/>
            </View>
            <View className="h-16 bg-gray-700 flex-row items-center justify-between px-5 rounded-3xl">
                <TextInput onSubmitEditing={submitHandle} className="h-full flex-1 text-white text-[13px]"
                           value={message}
                           onChangeText={setMessage}
                           placeholderTextColor="#ccc"
                           placeholder="Send a message..."/>
                <Pressable onPress={submitHandle}
                           className="items-center justify-center h-10 w-10 rounded-full bg-green-600">
                    <MaterialIcons color="#fff" name="send"/>
                </Pressable>
            </View>
        </View>
    )
}