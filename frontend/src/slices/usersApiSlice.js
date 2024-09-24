import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; //parent to usersApiSlice

// defines user related API endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({ //mutation is for action like creating, updating, or deleting
            query: (data) => ({
                url: `${USERS_URL}/auth`, //`${USERS_URL}/auth`
                method: 'POST',
                body: 'data',
            }),
        })
    })
})

// add prefix "use" and suffix "mutation"
export const { useLoginMutation } = usersApiSlice;