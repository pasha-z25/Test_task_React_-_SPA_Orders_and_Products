import { User } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UsersState {
  allUsers: User[] | null;
  selectedUser: User | null;
  error: string | undefined | null;
  loading: boolean;
}

const initialState: UsersState = {
  allUsers: null,
  selectedUser: null,
  error: null,
  loading: false,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (_, { extra: { client, apiEndpoints } }: { extra: any }) => {
    return await client.get(apiEndpoints.allUsers);
  }
);

export const getUser = createAsyncThunk(
  'users/getUser',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: string | number, { extra: { client, apiEndpoints } }: { extra: any }) => {
    return await client.get(apiEndpoints.oneUser(payload));
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: BodyInit, { extra: { client, apiEndpoints } }: { extra: any }) => {
    return await client.post(apiEndpoints.allUsers, payload);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: BodyInit, { extra: { client, apiEndpoints } }: { extra: any }) => {
    return await client.patch(apiEndpoints.allUsers, payload);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.error = null;
      state.loading = false;
    });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;

export const getAllUsers = (state: { users: UsersState }) => state.users.allUsers;

export const getSelectedUser = (state: { users: UsersState }) => state.users.selectedUser;

export const getUsersStatus = (state: { users: UsersState }) => ({
  loading: state.users.loading,
  error: state.users.error,
});
