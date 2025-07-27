import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/cars");

            return response.data;
        }   catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchMoreCars = createAsyncThunk(
    "cars/fetchMoreCars",
    async (page, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);

            const response = await axios.get(`/cars?${params.toString()}`);

            return response.data;
        }   catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCarById = createAsyncThunk(
    "cars/fetchCarById",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`/cars/${id}`);

            return response.data;
        }   catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);