import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; //parent to productsApiSlice

// inject new product-related endpoitns into the apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL, // /api/products
            }),
            keepUnusedDataFor: 5, //removes the data from cache after 5secs (keep things fresh)
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`  // /api/products/1
            }),
            keepUnusedDataFor: 5,
        })
    }),
})

// naming conventions for RTK
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;


