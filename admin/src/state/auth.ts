import { atom } from 'recoil';

const authAtom = atom({
    key: 'user',
    // get initial state from local storage to enable user to stay logged in
    //@ts-ignore
    default: JSON.parse(localStorage.getItem('user'))
});

export { authAtom };