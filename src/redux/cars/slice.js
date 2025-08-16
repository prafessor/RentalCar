import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchMoreCars, fetchCarById } from './operations';

const slice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    car: null,
    loading: false,
    error: null,
    totalPages: 1,
    favoriteCars: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const car = state.items.find(car => car.id === action.payload);

      if (state.favoriteCars.includes(action.payload)) {
        state.favoriteCars = state.favoriteCars.filter(
          id => id !== action.payload
        );
        car.favorite = false;
      } else {
        state.favoriteCars.push(action.payload);
        car.favorite = true;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.error = null;
        state.totalPages = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cars.map(car => {
          if (state.favoriteCars.includes(car.id)) {
            car.favorite = true;
          } else {
            car.favorite = false;
          }
          return car;
        });
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
        const newCars = action.payload.cars.map(car => {
          if (state.favoriteCars.includes(car.id)) {
            car.favorite = true;
          } else {
            car.favorite = false;
          }
          return car;
        });
        state.items.push(...newCars);
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
      });
  },
});

export const { toggleFavorite } = slice.actions;
export default slice.reducer;
