import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.price) params.append('rentalPrice', filters.price);
      if (filters.minMileage) params.append('minMileage', filters.minMileage);
      if (filters.maxMileage) params.append('maxMileage', filters.maxMileage);

      const response = await axios.get(`/cars?${params.toString()}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreCars = createAsyncThunk(
  'cars/fetchMoreCars',
  async ({ page, filters }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.price) params.append('rentalPrice', filters.price);
      if (filters.minMileage) params.append('minMileage', filters.minMileage);
      if (filters.maxMileage) params.append('maxMileage', filters.maxMileage);

      const response = await axios.get(`/cars?${params.toString()}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  'cars/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/brands');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
