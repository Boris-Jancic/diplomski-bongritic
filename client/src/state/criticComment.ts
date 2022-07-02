import { atom } from 'recoil';

const criticCommentAtom = atom({
    key: 'criticComment',
    //@ts-ignore
    default: JSON.parse(localStorage.getItem('criticComment'))
});

export { criticCommentAtom };