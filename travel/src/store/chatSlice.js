import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../appwrite/chat";

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchMessages",
  async () => {
    const messages = await chatService.fetchMessages();
    // console.log(messages);
    return messages;
  }
);

export const createChatMessage = createAsyncThunk(
  "chat/createMessage",
  async (message) => {
    const newMessage = await chatService.createMessage(message);
    return newMessage;
  }
);

export const deleteChatMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (messageId) => {
    await chatService.deleteMessage(messageId);
    return messageId;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const messageExists = state.messages.some(
        (message) => message.$id === action.payload.$id
      );
      if (!messageExists) {
        state.messages.unshift(action.payload);
      }
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.$id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createChatMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChatMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        const messageExists = state.messages.some(
          (message) => message.$id === action.payload.$id
        );
        if (!messageExists) {
          state.messages.unshift(action.payload);
        }
      })
      .addCase(createChatMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteChatMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteChatMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = state.messages.filter(
          (message) => message.$id !== action.payload
        );
      })
      .addCase(deleteChatMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMessage, removeMessage } = chatSlice.actions;

export default chatSlice.reducer;

export const subscribeToChatMessages = () => (dispatch, getState) => {
  chatService.subscribeToMessages((response) => {
    const state = getState();
    const existingMessages = state.chat.messages;

    if (
      response.events.includes("databases.*.collections.*.documents.*.create")
    ) {
      const newMessage = response.payload;
      const messageExists = existingMessages.some(
        (message) => message.$id === newMessage.$id
      );
      if (!messageExists) {
        dispatch(addMessage(newMessage));
      }
    } else if (
      response.events.includes("databases.*.collections.*.documents.*.delete")
    ) {
      dispatch(removeMessage(response.payload.$id));
    }
  });
};
