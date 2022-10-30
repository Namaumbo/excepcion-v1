
import { atom } from "recoil";

export const activeTrack = atom({
    key: "activeUrl",
    default:{
      title:"",
      downloadableUrl:""
    },
  });