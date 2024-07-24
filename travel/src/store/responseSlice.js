import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import communityService from "../appwrite/response";
import likeService from "../appwrite/likes";

export const fetchResponses = createAsyncThunk(
  "responses/fetchResponses",
  async () => {
    const responses = await communityService.getResponses();
    return responses.documents;
  }
);

export const createResponse = createAsyncThunk(
  "response/createResponse",
  async (response) => {
    const newResponse = await communityService.createResponse(response);
    return newResponse;
  }
);

export const deleteResponse = createAsyncThunk(
  "response/deleteResponse",
  async (responseId) => {
    await communityService.deleteResponse(responseId);
    return responseId;
  }
);

export const updateResponse = createAsyncThunk(
  "response/updateResponse",
  async ({ id, updatedResponse }) => {
    await communityService.updateResponse(id, updatedResponse);
    return { id, updatedResponse };
  }
);

export const likeResponse = createAsyncThunk(
  "like/likeResponse",
  async ({ responseId, userId }) => {
    await likeService.likeResponse(responseId, userId);
    return { responseId, userId };
  }
);
export const unlikeResponse = createAsyncThunk(
  "unlike/unlikeResponse",
  async ({ responseId, userId }) => {
    await likeService.unlikeResponse(responseId, userId);
    return { responseId, userId };
  }
);

const responseSlice = createSlice({
  name: "response",
  initialState: {
    responses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResponses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responses = action.payload;
        // console.log(state.responses);
      })
      .addCase(fetchResponses.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responses.push(action.payload);
      })
      .addCase(createResponse.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responses = state.responses.filter(
          (response) => response.$id !== action.payload
        );
      })
      .addCase(deleteResponse.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, updatedResponse } = action.payload;
        const index = state.responses.findIndex(
          (response) => response.$id === id
        );
        if (index !== -1) {
          state.responses[index] = updatedResponse;
        }
      })
      .addCase(updateResponse.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likeResponse.fulfilled, (state, action) => {
        const { responseId, userId } = action.payload;
        const response = state.responses.find((r) => r.$id === responseId);
        if (response) {
          response.likes.push(userId);
        }
      })
      .addCase(unlikeResponse.fulfilled, (state, action) => {
        const { responseId, userId } = action.payload;
        const response = state.responses.find((r) => r.$id === responseId);
        if (response) {
          response.likes = response.likes.filter((id) => id !== userId);
        }
      });
  },
});

export default responseSlice.reducer;
