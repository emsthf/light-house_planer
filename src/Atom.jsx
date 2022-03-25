import { atom } from "recoil";

export const goalState = atom({
  key: "goalState",
  default: {
    goalTitle: "",
    totalCount: "",
    startDay: "",
    endDay: "",
    weekCount: "",
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
