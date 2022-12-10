import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";

export default function AuthStack() {

    const Stack = createNativeStackNavigator()

    const options = {
        headerShown: false
    }

    return (
        <Stack.Navigator>
            <Stack.Screen options={options} name="login" component={LoginScreen}/>
            <Stack.Screen options={options} name="register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}