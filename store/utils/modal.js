import {store} from "../store";
import {useSelector} from "react-redux";
import {close, open} from "../features/modal";

export const useModal = () => useSelector(state => state.modal);
export const showModal = () => store.dispatch(open());
export const closeModal = () => store.dispatch(close());