import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import journalService from "../appwrite/journal";

export const fetchUserJournals = createAsyncThunk(
  "journal/fetchUserJournals",
  async (userId) => {
    const journals = await journalService.getUserJournals(userId);
    return journals.documents;
  }
);

export const createJournal = createAsyncThunk(
  "journal/createJournal",
  async (journal) => {
    const newJournal = await journalService.createJournal(journal);
    return newJournal;
  }
);

export const deleteJournal = createAsyncThunk(
  "journal/deleteJournal",
  async (journalId) => {
    await journalService.deleteJournal(journalId);
    return journalId;
  }
);

export const updateJournal = createAsyncThunk(
  "journal/updateJournal",
  async ({ id, updatedJournal }) => {
    await journalService.updateJournal(id, updatedJournal);
    return { journalId: id, journal: updatedJournal };
  }
);

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journals: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserJournals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserJournals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.journals = action.payload;
      })
      .addCase(fetchUserJournals.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createJournal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.journals.push(action.payload);
      })
      .addCase(createJournal.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteJournal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJournal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.journals = state.journals.filter(
          (journal) => journal.$id !== action.payload
        );
      })
      .addCase(deleteJournal.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateJournal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJournal.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { journalId, journal } = action.payload;
        const index = state.journals.findIndex(
          (journal) => journal.$id === journalId
        );
        if (index !== -1) {
          state.journals[index] = journal;
        }
      })
      .addCase(updateJournal.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default journalSlice.reducer;
