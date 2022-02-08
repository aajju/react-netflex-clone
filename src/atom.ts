import { atom } from "recoil";

export interface IModalAtom {
  isClicked: Boolean;
  id: number;
  category: string | undefined;
}

export const movieModalAtom = atom<IModalAtom>({
  key: "movieModal",
  default: {
    isClicked: false,
    id: 0,
    category: undefined,
  },
});

export const tvModalAtom = atom<IModalAtom>({
  key: "tvModal",
  default: {
    isClicked: false,
    id: 0,
    category: undefined,
  },
});

export const searchModalAtom = atom<IModalAtom>({
  key: "searchModal",
  default: {
    isClicked: false,
    id: 0,
    category: undefined,
  },
});
