// import { getTopProducts } from "../../../backend/controllers/productController";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice"; //parent to productsApiSlice

// inject new product-related endpoitns into the apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({   //destructuring passed pageNumber
                url: PRODUCTS_URL, // /api/products
                params: {
                    keyword,    // e.g. ?keyword=iphone
                    pageNumber, // sends pageNumber as query parameter (e.g. ?pageNumber=3)
                }

            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5, //removes the data from cache after 5secs (keep things fresh)
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`  // /api/products/1
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product']    // refetches to get new data (no stale data)
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                // /api/upload
                url: `${UPLOAD_URL}`,  
                method: 'POST',
                body: data,
            }),
        })

      

    }),
})

// naming conventions for RTK
export const { useGetProductsQuery,
     useGetProductDetailsQuery,
      useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
useUploadProductImageMutation } = productsApiSlice;


