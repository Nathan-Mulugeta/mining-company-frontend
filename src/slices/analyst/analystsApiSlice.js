import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const analystsAdapter = createEntityAdapter({});

const initialState = analystsAdapter.getInitialState();

export const analystsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalysts: builder.query({
      query: () => ({
        url: 'analysts',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAnalysts = responseData.map((analyst) => {
          analyst.id = analyst._id;
          return analyst;
        });
        return analystsAdapter.setAll(initialState, loadedAnalysts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Analyst', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Analyst', id })),
          ];
        } else return [{ type: 'Analyst', id: 'LIST' }];
      },
    }),
    addNewAnalyst: builder.mutation({
      query: (initialAnalystData) => ({
        url: '/analysts',
        method: 'POST',
        body: {
          ...initialAnalystData,
        },
      }),
      invalidatesTags: [{ type: 'Analyst', id: 'LIST' }],
    }),
    updateAnalyst: builder.mutation({
      query: (initialAnalystData) => ({
        url: 'analysts',
        method: 'PATCH',
        body: { ...initialAnalystData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Analyst', id: arg.id },
      ],
    }),
    deleteAnalyst: builder.mutation({
      query: ({ id }) => ({
        url: '/analysts',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Analyst', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAnalystsQuery,
  useAddNewAnalystMutation,
  useUpdateAnalystMutation,
  useDeleteAnalystMutation,
} = analystsApiSlice;

export const selectAnalystsResult =
  analystsApiSlice.endpoints.getAnalysts.select();

const selectAnalystsData = createSelector(
  selectAnalystsResult,
  (analystsResult) => analystsResult.data
);

export const {
  selectAll: selectAllAnalysts,
  selectById: selectAnalystById,
  selectIds: selectAnalystIds,
} = analystsAdapter.getSelectors(
  (state) => selectAnalystsData(state) ?? initialState
);
