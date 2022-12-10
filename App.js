import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import StackList from "./components/stacks/StackList";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Toast from "react-native-toast-message";

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <StackList/>
                </NavigationContainer>
            </Provider>
            <Toast />
        </SafeAreaProvider>
    );
}
