import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchMoreCars, fetchCarById } from "./operations";

const slice = createSlice({
    name: "cars",
    initialState: {
        items: [],
        car: null,
        loading: false,
        error: null,
        totalPages: 1
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, state => {
                state.loading = true;
                state.error = null;
                state.totalPages = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cars;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMoreCars.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoreCars.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(...action.payload.cars);
            })
            .addCase(fetchMoreCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCarById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarById.fulfilled, (state, action) => {
                state.loading = false;
                state.car = action.payload;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default slice.reducer;