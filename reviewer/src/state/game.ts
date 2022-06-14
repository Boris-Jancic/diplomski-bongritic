import { atom } from 'recoil';

const gameAtom = atom({
  key: 'game',
  default: [{
        id: 0,
        data: '',
        seo_title: 'string',
        name: '',
        background_image: '',
        background_image_additional: '',
        description: '',
        description_raw: ''
  }],
});

export { gameAtom };