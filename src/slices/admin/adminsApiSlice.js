import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const adminsAdapter = createEntityAdapter({});

const initialState = adminsAdapter.getInitialState();

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: 'admins',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAdmins = responseData.map((admin) => {
          admin.id = admin._id;
          return admin;
        });
        return adminsAdapter.setAll(initialState, loadedAdmins);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Admin', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Admin', id })),
          ];
        } else return [{ type: 'Admin', id: 'LIST' }];
      },
    }),
    addNewAdmin: builder.mutation({
      query: (initialAdminData) => ({
        url: '/admins',
        method: 'POST',
        body: {
          ...initialAdminData,
        },
      }),
      invalidatesTags: [{ type: 'Admin', id: 'LIST' }],
    }),
    updateAdmin: builder.mutation({
      query: (initialAdminData) => ({
        url: 'admins',
        method: 'PATCH',
        body: { ...initialAdminData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Admin', id: arg.id }],
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => ({
        url: '/admins',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Admin', id: arg.id }],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddNewAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminsApiSlice;

export const selectAdminsResult = adminsApiSlice.endpoints.getAdmins.select();

const selectAdminsData = createSelector(
  selectAdminsResult,
  (adminsResult) => adminsResult.data
);

export const {
  selectAll: selectAllAdmins,
  selectById: selectAdminById,
  selectIds: selectAdminIds,
} = adminsAdapter.getSelectors(
  (state) => selectAdminsData(state) ?? initialState
);
