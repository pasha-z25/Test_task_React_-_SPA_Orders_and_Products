import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { BasicApiState } from '../types';
import type { Order } from '@/utils/types';

export interface OrdersState extends BasicApiState {
  allOrders: Order[] | null;
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  allOrders: null,
  selectedOrder: null,
  error: null,
  loading: false,
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (_, { extra: { client, apiEndpoints } }: { extra: any }) => {
    return await client.get(apiEndpoints.allOrders);
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (
    payload: string | number,
    { extra: { client, apiEndpoints } }: { extra: any }
  ) => {
    return await client.get(apiEndpoints.oneOrder(payload));
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.error = null;
        state.loading = false;
      })
      // .addCase(addOrder.fulfilled, (state, action) => {
      //   console.log('!!! Action addOrder', action);
      //   state.error = null;
      //   state.loading = false;
      // })
      // .addCase(updateOrder.fulfilled, (state, action) => {
      //   console.log('!!! Action updateOrder', action);
      //   // state.selectedOrder = action.payload;
      //   state.error = null;
      //   state.loading = false;
      // })
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;

export const getAllOrders = (state: { orders: OrdersState }) =>
  state.orders.allOrders;

export const getSelectedOrder = (state: { orders: OrdersState }) =>
  state.orders.selectedOrder;

export const getOrdersStatus = (state: { orders: OrdersState }) => ({
  loading: state.orders.loading,
  error: state.orders.error,
});
