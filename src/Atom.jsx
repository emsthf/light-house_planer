import { atom } from "recoil";

export const goalState = atom({
  key: "goalState",
  default: {
    goalTitle: "",
    period: "",
    startDay: "",
    endDay: "",
    weekCount: "",
    totalCount: "",
    goalDesc: "",
    count: "",
  },
});

export const darkModeState = atom({
  key: "darkmode",
  default: false,
});

export const goalId = atom({
  key: "gId",
  default: 0,
});

export const goalPeriod = atom({
  key: "gPeriod",
  default: [
    {
      startDay: "",
      endDay: "",
    },
  ],
});

export const userState = atom({
  key: "user",
  default: {
    id : 0,
    name : "",
    email : "",
    password : "",
    phoneNum : ""
  }
});

export const challengeId = atom({
  key: "cId",
  default: 0,
});

export const imgUrl = atom({
  key: "imgUrl",
  default: "",
});
