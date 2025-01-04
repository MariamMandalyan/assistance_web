import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CHATAPI } from "../services/API";
import { toast } from "react-toastify";

interface IInitState {
  messages: any[],
  status: string,

}

const initialState: IInitState = {
  messages: [],
  status: ''
};

export const sendMessage = createAsyncThunk(
  "chat/SendMessage",
  async (data: any) => {
    try {
      const response: any = await CHATAPI.post(`/api/predict`, data);
      if (response) {
        return { ...response.data.answer, type: data.type };
      }
    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addLocalMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, ...action?.payload];
    },
  },
  extraReducers(builder: ActionReducerMapBuilder<IInitState>) {
    builder.addCase(
      sendMessage.pending,
      (state: any, action: PayloadAction<any>) => {
        state.status = "pending";
      }
    );
    builder.addCase(
      sendMessage.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.status = "fulfilled";
        state.messages = [...state.messages, action?.payload];
        localStorage.setItem('MESSAGES_STORAGE_KEY', JSON.stringify(state.messages))
      }
    );
    builder.addCase(
      sendMessage.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.status = "rejected";
      }
    );
  },
});

export const { addLocalMessage, setMessages } = chatSlice.actions

export default chatSlice.reducer;
