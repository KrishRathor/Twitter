import { atom } from "recoil";

export const signupData = atom({
    key: 'signupData',
    default: {
        email: '',
        username: '',
        password: ''
    }
});