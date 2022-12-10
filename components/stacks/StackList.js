import AuthStack from "./AuthStack";
import ChatStack from "./ChatStack";
import {useAuth} from "../../store/utils/user";

export default function StackList() {

    const {user} = useAuth();

    return (
        user !== null ? <ChatStack/> : <AuthStack/>
    )
}