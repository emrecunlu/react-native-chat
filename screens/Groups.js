import {View, Text, FlatList, TouchableOpacity, Dimensions} from "react-native";
import GroupModal from "../components/GroupModal";
import {useLayoutEffect, useState} from "react";
import {collection, onSnapshot, query, orderBy} from "firebase/firestore";
import {db} from "../firebase";

const GroupCard = ({item, navigation}) => {

    const pressHandle = async (name) => {
        navigation.navigate('room', {
            name: item.name,
            id: item._id
        })
    }

    return (
        <TouchableOpacity onPress={pressHandle} activeOpacity={.75}
                          className="p-5 flex-row gap-x-4 items-center">
            <View className="w-14 h-14 bg-green-600 rounded-full items-center justify-center">
                <Text
                    className="text-white font-semibold text-sm">{item.name.slice(0, 1).toString().toLocaleUpperCase('TR')}</Text>
            </View>
            <View>
                <Text className="font-semibold text-[15px] text-gray-900">{item.name}</Text>
                <Text className="text-gray-400 mt-1 text-sm">{item.fullName} tarafından oluşturuldu.</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Groups({navigation}) {

    const [rooms, setRooms] = useState([]);

    const data = [
        {
            title: 'YeahBoi',
            subtitle: 'Join the conversation as Name Surname',
        },
        {
            title: 'YeahBoi',
            subtitle: 'Join the conversation as Name Surname',
        }
    ]

    useLayoutEffect(() => {
        const ref = collection(db, "rooms");
        const q = query(ref, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, snapshot => {
            const data = snapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            }));

            setRooms(data);
        });

        return () => unsubscribe();
    }, []);

    console.log(rooms)

    return (
        <View className="flex-1 bg-white">
            <FlatList data={rooms} renderItem={({item}) =>
                <GroupCard
                    item={item}
                    navigation={navigation}/>
            }
                      keyExtractor={(item, index) => index.toString()}/>
            <GroupModal/>
        </View>
    )
}