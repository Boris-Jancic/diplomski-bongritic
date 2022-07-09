import { atom } from 'recoil';
import { Blog } from '../interface/post';

const criticCommentAtom = atom({
    key: 'criticComment',
    //@ts-ignore
    default: JSON.parse(localStorage.getItem('criticComment'))
});

export { criticCommentAtom };