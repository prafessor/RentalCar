import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import CarsPage from '../../pages/CarsPage/CarsPage';
import DetailsCarPage from '../../pages/DetailsCarPage/DetailsCarPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import css from './App.module.css';

export default function App() {

  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CarsPage />} />
          <Route path='/catalog/:id' element={<DetailsCarPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
