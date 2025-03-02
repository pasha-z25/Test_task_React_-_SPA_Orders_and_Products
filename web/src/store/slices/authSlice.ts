import { User } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (
    payload: LoginPayload,
    { extra: { client, apiEndpoints } }: { extra: any }
  ) => {
    return await client.post(apiEndpoints.authLogin, JSON.stringify(payload));
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
      Cookies.remove('token');
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      Cookies.set('token', action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.user = null;
      state.token = null;
      state.loading = false;
      Cookies.remove('token');
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const getAuthorizedUser = (state: { auth: AuthState }) =>
  state.auth.user;

export const getAuthState = (state: { auth: AuthState }) => state.auth;
