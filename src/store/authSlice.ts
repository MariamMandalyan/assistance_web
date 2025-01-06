// import API,  from "../../services/api";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API } from "../services/API";
import { toast } from "react-toastify";

interface IInitState {
  user: any,
  status: string,
}

const initialState: IInitState = {
  status: '',
  user: undefined
};

export const register = createAsyncThunk(
  "auth/Register",
  async (data: any) => {
    try {
      const response: any = await API.post(`/register`, data.values);
      if(response){
        localStorage.setItem("accessToken", response.data.token);
        if(response.data.message){
          toast.done(response.data.message)
        }
        getMe()
        data?.cb()
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data: any) => {
    try {
      console.log('object');
      toast.done('bbb')

      const response: any = await API.post(`/login`, data.values);
      if(response){
        localStorage.setItem("accessToken", response.data.token);
        data?.cb()
        getMe()
      }
    } catch (error: any) {
      toast.done('aaaa')
      toast.error(error.message)
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
    try {
      const response: any = await API.get(`/api/getme?=`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      if(response){
        return response.data
      }
    } catch (error: any) {
      console.log(error,'err')
      localStorage.clear()
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    // setLogined: (state, action: PayloadAction<any>) => {
    //   // state.isLogined = action.payload;
    // },
  },
  extraReducers(builder: ActionReducerMapBuilder<IInitState>) {
    builder.addCase(
      register.pending,
      (state: any, action: PayloadAction<any>) => {
        state.status = "pending";
      }
    );
    builder.addCase(
      login.pending,
      (state: any, action: PayloadAction<any>) => {
        state.status = "pending";
      }
    );
    builder.addCase(
      login.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.status = "fulfilled";
      }
    );
    builder.addCase(
      getMe.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.user = action.payload
      }
    );
  
  },
});

export const { setUser } = authSlice.actions

export default authSlice.reducer;