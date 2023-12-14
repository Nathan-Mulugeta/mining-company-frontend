import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const vehiclesAdapter = createEntityAdapter({});

const initialState = vehiclesAdapter.getInitialState();

export const vehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => ({
        url: 'vehicles',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedVehicles = responseData.map((vehicle) => {
          vehicle.id = vehicle._id;
          return vehicle;
        });
        return vehiclesAdapter.setAll(initialState, loadedVehicles);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Vehicle', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Vehicle', id })),
          ];
        } else return [{ type: 'Vehicle', id: 'LIST' }];
      },
    }),
    addNewVehicle: builder.mutation({
      query: (initialVehicleData) => ({
        url: '/vehicles',
        method: 'POST',
        body: {
          ...initialVehicleData,
        },
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    updateVehicle: builder.mutation({
      query: (initialVehicleData) => ({
        url: 'vehicles',
        method: 'PATCH',
        body: { ...initialVehicleData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id },
      ],
    }),
    deleteVehicle: builder.mutation({
      query: ({ id }) => ({
        url: '/vehicles',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Vehicle', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddNewVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehiclesApiSlice;

export const selectVehiclesResult =
  vehiclesApiSlice.endpoints.getVehicles.select();

const selectVehiclesData = createSelector(
  selectVehiclesResult,
  (vehiclesResult) => vehiclesResult.data
);

export const {
  selectAll: selectAllVehicles,
  selectById: selectVehicleById,
  selectIds: selectVehicleIds,
} = vehiclesAdapter.getSelectors(
  (state) => selectVehiclesData(state) ?? initialState
);
