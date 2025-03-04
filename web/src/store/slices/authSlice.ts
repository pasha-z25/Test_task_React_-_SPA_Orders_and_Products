import { User } from '@/utils/types';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (
    payload: LoginPayload,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { extra: { client, apiEndpoints } }: { extra: any }
  ) => {
    return await client.post(apiEndpoints.authLogin, JSON.stringify(payload));
  }
);

export const addNewUser = createAsyncThunk(
  'auth/addNewUser',
  async (
    payload: BodyInit,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { extra: { client, apiEndpoints } }: { extra: any }
  ) => {
    return await client.post(apiEndpoints.allUsers, payload);
  }
);

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | undefined | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      Cookies.remove('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.loading = false;
        state.error = null;
        Cookies.set('token', action.payload.accessToken);
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isPending, (state, action) => {
        console.log('!!! Auth Pending', { state, action });
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        (type) => {
          console.log(type);
          return false;
        },
        (state, action) => {
          console.log('!!! Auth Rejected', { state, action });

          // state.authError = action.error.message;
          state.user = null;
          state.token = null;
          state.loading = false;
          Cookies.remove('token');
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const getAuthorizedUser = (state: { auth: AuthState }) =>
  state.auth.user;

export const getAuthState = (state: { auth: AuthState }) => state.auth;
