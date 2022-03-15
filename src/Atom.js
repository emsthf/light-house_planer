import { atom } from "recoil";

export const goalState = atom({
    key : 'goalState',
    default : {
        goalTitle : '',
        totalCount : '',
        startDay : '',
        endDay : '',
        weekCount : '',
        goalDesc : ''
    }
});