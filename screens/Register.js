import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

export default function Register({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const registerHandle = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async userCredentials => {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });

                navigation.replace('login')
            })
            .catch(err => console.log(err))
    }

    return (
        <SafeAreaView className="px-5 bg-white flex-1">
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}>
                <View>
                    <Text className="font-semibold text-3xl text-center text-gray-900">Groupie</Text>
                    <Text className="text-gray-400 font-semibold text-center text-sm mt-2">Create your account now to
                        chat and explore!</Text>
                </View>
                <Image className="w-full my-10 h-48" source={require('../assets/images/59877.jpg')}/>
                <View>
                    <TextInput placeholderTextColor="#059669"
                               className="border-2 border-emerald-400 rounded-md px-4 h-14"
                               placeholder="Full Name"
                               value={name}
                               onChangeText={setName}
                               textContentType="emailAddress"
                    />

                    <View className="mt-4"></View>

                    <TextInput placeholderTextColor="#059669"
                               className="border-2 border-emerald-400 rounded-md px-4 h-14"
                               placeholder="Email"
                               value={email}
                               onChangeText={setEmail}
                               textContentType="emailAddress"
                    />

                    <View className="my-2"></View>

                    <TextInput placeholderTextColor="#059669"
                               className="border-2 border-emerald-400 rounded-md px-4 h-14"
                               value={password}
                               onChangeText={setPassword}
                               placeholder="Password"
                               secureTextEntry={true}
                    />

                    <View className="mt-6"></View>

                    <TouchableOpacity onPress={registerHandle} activeOpacity={.75}
                                      className="bg-emerald-500 rounded-full h-10 items-center justify-center">
                        <Text className="text-center text-white text-sm">Register</Text>
                    </TouchableOpacity>

                    <View className="flex-row mt-4 justify-center">
                        <Text className="text-gray-900 text-sm">
                            Don't have an account?
                        </Text>
                        <Pressable onPress={() => navigation.replace('login')} className="ml-1">
                            <Text className="text-gray-400 underline text-sm">Login now.</Text>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}