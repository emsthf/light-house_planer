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
