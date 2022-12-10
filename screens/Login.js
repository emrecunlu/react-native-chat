import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useState} from "react";
import {auth} from "../firebase";
import {useAuth} from "../store/utils/user";

export default function Login({navigation}) {

    const user = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = () => {
        signInWithEmailAndPassword(auth,email, password)
            .then(userCredentials => {
                console.log(user)
            })
            .catch(err => console.log(err))
    }

    return (
        <SafeAreaView className="px-5 py-10 bg-white flex-1">
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}>
                <View>
                    <Text className="font-semibold text-3xl text-center text-gray-900">Groupie</Text>
                    <Text className="text-gray-400 font-semibold text-center text-sm mt-2">Login now to see what
                        they
                        are
                        talking!</Text>
                </View>
                <Image className="w-full my-10 h-48" source={require('../assets/images/59877.jpg')}/>
                <View>
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

                    <TouchableOpacity
                        onPress={loginHandle}
                        activeOpacity={.75}
                        className="bg-emerald-500 rounded-full h-10 items-center justify-center">
                        <Text className="text-center text-white text-sm">Sign In</Text>
                    </TouchableOpacity>

                    <View className="flex-row mt-4 justify-center">
                        <Text className="text-gray-900 text-sm">
                            Don't have an account?
                        </Text>
                        <Pressable onPress={() => navigation.replace('register')} className="ml-1">
                            <Text className="text-gray-400 underline text-sm">Register now.</Text>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}