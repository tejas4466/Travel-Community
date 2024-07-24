import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import journalSlice from "./journalSlice";
import responseSlice from "./responseSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    journal: journalSlice,
    response: responseSlice,
  },
});

export default store;
