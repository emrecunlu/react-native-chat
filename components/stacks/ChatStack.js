import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupScreen from "../../screens/Groups";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RoomScreen from "../../screens/Room";
import {showModal} from "../../store/utils/modal";
import {View} from "react-native";
import {signOut} from 'firebase/auth'
import {auth} from "../../firebase";

export default function ChatStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                title: 'Groups',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff',
                },
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#16a34a',
                },
                headerRight: (props) => (
                    <View className="flex-row items-center gap-x-5">
                        <MaterialIcons
                            name="create"
                            color="#fff"
                            size={18}
                            onPress={() => showModal()}
                        />
                        <MaterialIcons
                            name="logout"
                            color="#fff"
                            size={18}
                            onPress={() => signOut(auth)}
                        />
                    </View>
                )
            }} name="rooms" component={GroupScreen}/>
            <Stack.Screen options={({route}) => {
                return {
                    title: route.params.name.toString(),
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#16a34a',
                    },
                    headerTintColor: '#fff'
                }
            }} name="room" component={RoomScreen}/>
        </Stack.Navigator>
    )
}