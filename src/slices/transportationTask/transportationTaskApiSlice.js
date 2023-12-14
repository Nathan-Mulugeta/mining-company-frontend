import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const transportationTasksAdapter = createEntityAdapter({});

const initialState = transportationTasksAdapter.getInitialState();

export const transportationTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportationTasks: builder.query({
      query: () => ({
        url: 'transportationTasks',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTransportationTasks = responseData.map(
          (transportationTask) => {
            transportationTask.id = transportationTask._id;
            return transportationTask;
          }
        );
        return transportationTasksAdapter.setAll(
          initialState,
          loadedTransportationTasks
        );
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'TransportationTask', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'TransportationTask', id })),
          ];
        } else return [{ type: 'TransportationTask', id: 'LIST' }];
      },
    }),
    addNewTransportationTask: builder.mutation({
      query: (initialTransportationTaskData) => ({
        url: '/transportationTasks',
        method: 'POST',
        body: {
          ...initialTransportationTaskData,
        },
      }),
      invalidatesTags: [{ type: 'TransportationTask', id: 'LIST' }],
    }),
    updateTransportationTask: builder.mutation({
      query: (initialTransportationTaskData) => ({
        url: 'transportationTasks',
        method: 'PATCH',
        body: { ...initialTransportationTaskData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'TransportationTask', id: arg.id },
      ],
    }),
    deleteTransportationTask: builder.mutation({
      query: ({ id }) => ({
        url: '/transportationTasks',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'TransportationTask', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetTransportationTasksQuery,
  useAddNewTransportationTaskMutation,
  useUpdateTransportationTaskMutation,
  useDeleteTransportationTaskMutation,
} = transportationTasksApiSlice;

export const selectTransportationTasksResult =
  transportationTasksApiSlice.endpoints.getTransportationTasks.select();

const selectTransportationTasksData = createSelector(
  selectTransportationTasksResult,
  (transportationTasksResult) => transportationTasksResult.data
);

export const {
  selectAll: selectAllTransportationTasks,
  selectById: selectTransportationTaskById,
  selectIds: selectTransportationTaskIds,
} = transportationTasksAdapter.getSelectors(
  (state) => selectTransportationTasksData(state) ?? initialState
);
