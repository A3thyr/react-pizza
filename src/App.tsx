import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';

import './scss/app.scss';
import { MainLayout } from './layouts/MainLayout';

const Cart = lazy(() =>
  import(/* webpackChunckName: "Cart" */ './pages/Cart').then(({ Cart }) => ({ default: Cart })),
);
const Fullpizza = lazy(() =>
  import(/* webpackChunckName: "Fullpizza" */ './pages/Fullpizza').then(({ Fullpizza }) => ({
    default: Fullpizza,
  })),
);
const NotFound = lazy(() =>
  import(/* webpackChunckName: "NotFound" */ './pages/NotFound').then(({ NotFound }) => ({
    default: NotFound,
  })),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Fullpizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
