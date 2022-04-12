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
  key : "user",
  default : 1
});