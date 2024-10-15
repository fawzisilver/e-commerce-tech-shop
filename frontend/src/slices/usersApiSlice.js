import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; //parent to usersApiSlice

// defines user related API endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({ //mutation is for action like creating, updating, or deleting
            query: (data) => ({
                url: `${USERS_URL}/auth`, //`${USERS_URL}/auth`
                method: 'POST',
                body: data, //'data'
            }),
        }),

        // sends a POST request to /api/users create a new user on the server with the body (data).
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        })

    })
})

// add prefix "use" and suffix "mutation"
export const { 
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation } = usersApiSlice;

