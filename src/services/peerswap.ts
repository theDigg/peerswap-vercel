// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import crypto from 'shardus-crypto-web'
// import { buildTx } from '../api/peerswapAPI'

// Define a service using a base URL and expected endpoints
export const peerswapApi = createApi({
  reducerPath: "peerswapApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9001/" }),
  keepUnusedDataFor: 30,
  tagTypes: [
    "Account",
    "Parameters",
    "Issues",
    "Proposals",
    "Swaps",
    "Bids",
    "Tx",
  ],
  endpoints: (build) => ({
    // injectTx: build.mutation({
    //   query: ({ txInfo, user }) => buildTx(txInfo, user).then((tx) => {
    //       return {
    //         url: `inject`,
    //         method: 'POST',
    //         body: tx,
    //       }
    //     })
    //   }),
    //   // Pick out data and prevent nested properties in a hook or selector
    //   //   transformResponse: (response: any) => response,
    //   invalidatesTags: ['Tx'],
    //   // onQueryStarted is useful for optimistic updates
    //   // The 2nd parameter is the destructured `MutationLifecycleApi`
    //   async onQueryStarted(
    //     arg,
    //     { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
    //   ) {},
    //   // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    //   async onCacheEntryAdded(
    //     arg,
    //     {
    //       dispatch,
    //       getState,
    //       extra,
    //       requestId,
    //       cacheEntryRemoved,
    //       cacheDataLoaded,
    //       getCacheEntry,
    //     }
    //   ) {},
    // }),
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),
    getAccountById: build.query({
      query: (id) => `accounts/${id}`,
    }),
    getParameters: build.query({
      query: () => "network/parameters",
    }),
    getLatestIssue: build.query({
      query: () => "issues/latest",
    }),
    getLatestProposals: build.query({
      query: () => "proposals/latest",
    }),
    getAllSwaps: build.query({
      query: () => "swaps",
    }),
    getSwapById: build.query({
      query: (id) => `swaps/single/${id}`,
    }),
    getBidsBySwapId: build.query({
      query: (swapId) => `bids/${swapId}`,
    }),
    getSwapsByAccountId: build.query({
      query: (id) => `accounts/${id}/swaps`,
    }),
    getBidsByAccountId: build.query({
      query: (id) => `accounts/${id}/bids`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  // useInjectTxMutation,
  useGetAccountByIdQuery,
  useGetParametersQuery,
  useGetLatestIssueQuery,
  useGetLatestProposalsQuery,
  useGetAllSwapsQuery,
  useGetSwapByIdQuery,
  useGetBidsBySwapIdQuery,
  useGetSwapsByAccountIdQuery,
  useGetBidsByAccountIdQuery,
} = peerswapApi;

// const { data } = await axios.post(`${host}/inject`, tx) //inject
// const { data } = await axios.get(`${host}/accounts/${id}`) //getAccountData
// const url = `${host}/accounts/address/${crypto.hash(handle)}` //getAccountFromAlias
// const url = `${host}/network/parameters` //getParameters
// const { data } = await axios.get<Accounts.Issue>(`${host}/issues/latest`)
// } = await axios.get(`${host}/issues/count`)
// const { data } = await axios.get(`${host}/proposals`)
// } = await axios.get(`${host}/proposals/latest`)
// } = await axios.get(`${host}/proposals/count`)
// const { data } = await axios.get(`${host}/swaps`)
// const { data } = await axios.get(`${host}/swaps/single/${url.split('/')[2]}`)
// const { data } = await axios.get(`${host}/swaps/single/${swapId}`)
// const res = await axios.get(`${host}/bids/${swapId}`)
// const { data } = await axios.get(`${host}/accounts/${address}/swaps`)
// const { data } = await axios.get(`${host}/accounts/${address}/bids`)
