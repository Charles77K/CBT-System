import { createSlice } from "@reduxjs/toolkit";

interface QuestionState {
  questions: string[];
  options: string[];
  duration: string;
  answered: boolean;
}

const initialState: QuestionState = {
  questions: [],
  options: [],
  duration: "",
  answered: false,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestion: (state, action) => {
      state.questions = action.payload;
    },
    getOptions: (state, action) => {
      state.options = action.payload;
    },
    getDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { getQuestion, getOptions, getDuration } = questionSlice.actions;

export default questionSlice.reducer;
