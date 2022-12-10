import {closeModal, useModal} from "../store/utils/modal";
import Modal from "react-native-modal";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {useState} from "react";
import {auth, db} from "../firebase";


export default function GroupModal() {

    const [name, setName] = useState("");

    const {visible} = useModal();

    const pressHandle = async () => {
        const ref = await addDoc(collection(db, 'rooms'), {
            createdBy: auth.currentUser.uid,
            name,
            fullName: auth.currentUser.displayName,
            createdAt: serverTimestamp(),
        });

        closeModal()
    }

    return (
        <Modal onModalHide={() => setName("")} onBackdropPress={() => closeModal()} isVisible={visible}>
            <View className="bg-white p-5">
                <Text className="font-semibold text-lg text-gray-900">Yeni Grup</Text>
                <Text className="text-gray-400 mt-1 text-sm">Yeni bir grup ismi giriniz.</Text>
                <TextInput value={name} onChangeText={setName} className="w-full px-4 border border-gray-400 h-12 mt-4"
                           placeholder="Grup ismi."/>
                <View className="flex-row justify-end gap-x-4 mt-6">
                    <TouchableOpacity onPress={() => closeModal()} className="bg-gray-200 px-4 py-3">
                        <Text className="text-gray-900 text-sm font-semibold">Kapat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pressHandle} className="bg-green-600 px-4 py-3">
                        <Text className="text-gray-900 text-sm text-white font-semibold">Kaydet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}