import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

const sitesAdapter = createEntityAdapter({});

const initialState = sitesAdapter.getInitialState();

export const sitesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query({
      query: () => ({
        url: 'sites',
        ValidityState: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedSites = responseData.map((site) => {
          site.id = site._id;
          return site;
        });
        return sitesAdapter.setAll(initialState, loadedSites);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Site', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Site', id })),
          ];
        } else return [{ type: 'Site', id: 'LIST' }];
      },
    }),
    addNewSite: builder.mutation({
      query: (initialSiteData) => ({
        url: '/sites',
        method: 'POST',
        body: {
          ...initialSiteData,
        },
      }),
      invalidatesTags: [{ type: 'Site', id: 'LIST' }],
    }),
    updateSite: builder.mutation({
      query: (initialSiteData) => ({
        url: 'sites',
        method: 'PATCH',
        body: { ...initialSiteData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Site', id: arg.id }],
    }),
    deleteSite: builder.mutation({
      query: ({ id }) => ({
        url: '/sites',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Site', id: arg.id }],
    }),
  }),
});

export const {
  useGetSitesQuery,
  useAddNewSiteMutation,
  useUpdateSiteMutation,
  useDeleteSiteMutation,
} = sitesApiSlice;

export const selectSitesResult = sitesApiSlice.endpoints.getSites.select();

const selectSitesData = createSelector(
  selectSitesResult,
  (sitesResult) => sitesResult.data
);

export const {
  selectAll: selectAllSites,
  selectById: selectSiteById,
  selectIds: selectSiteIds,
} = sitesAdapter.getSelectors(
  (state) => selectSitesData(state) ?? initialState
);
