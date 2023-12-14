import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const driversAdapter = createEntityAdapter({});

const initialState = driversAdapter.getInitialState();

export const driversApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query({
      query: () => ({
        url: 'drivers',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDrivers = responseData.map((driver) => {
          driver.id = driver._id;
          return driver;
        });
        return driversAdapter.setAll(initialState, loadedDrivers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Driver', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Driver', id })),
          ];
        } else return [{ type: 'Driver', id: 'LIST' }];
      },
    }),
    addNewDriver: builder.mutation({
      query: (initialDriverData) => ({
        url: '/drivers',
        method: 'POST',
        body: {
          ...initialDriverData,
        },
      }),
      invalidatesTags: [{ type: 'Driver', id: 'LIST' }],
    }),
    updateDriver: builder.mutation({
      query: (initialDriverData) => ({
        url: 'drivers',
        method: 'PATCH',
        body: { ...initialDriverData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Driver', id: arg.id }],
    }),
    deleteDriver: builder.mutation({
      query: ({ id }) => ({
        url: '/drivers',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Driver', id: arg.id }],
    }),
  }),
});

export const {
  useGetDriversQuery,
  useAddNewDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driversApiSlice;

export const selectDriversResult =
  driversApiSlice.endpoints.getDrivers.select();

const selectDriversData = createSelector(
  selectDriversResult,
  (driversResult) => driversResult.data
);

export const {
  selectAll: selectAllDrivers,
  selectById: selectDriverById,
  selectIds: selectDriverIds,
} = driversAdapter.getSelectors(
  (state) => selectDriversData(state) ?? initialState
);
